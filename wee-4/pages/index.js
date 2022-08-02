import { Page, Layout, Card, FormLayout, TextField, ChoiceList, Select, Button, Icon, Image, DataTable, ResourceList, Avatar, ResourceItem, TextStyle } from "@shopify/polaris";
import { Provider, ResourcePicker } from '@shopify/app-bridge-react';
import { CancelSmallMinor } from "@shopify/polaris-icons";
import { useState, useCallback, React, useEffect } from 'react';
import store from 'store-js';
import { gql, useQuery } from '@apollo/client';
import Collection from "./components/Collection";
import ProductTags from "./components/ProductTags";
export default function Index() {
  const [loading, setLoading] = useState(false)
  const [loading1, setLoading1] = useState(false);
  const [products, setProducts] = useState([]);
  const [products1, setProducts1] = useState([]);
  const [products2, setProducts2] = useState([]);
  const [selected, setSelected] = useState('1');
  const [selected1, setSelected1] = useState('a');
  const [selected2, setSelected2] = useState('today');
  const [name, setName] = useState(0);
  const [priority, setPriority] = useState("0");
  const [amount, setAmount] = useState("0");
  const [open, setOpen] = useState(false);
  const productCollections = []
  const [id, setId] = useState([]);
  const product = []
  const productsShow = [];
  if (store.get('ids')) {
    store.get('ids').map((item) => {
      const pr1 = {};
      pr1['id'] = item;
      product.push(pr1)
    })
  }
  //show table
  if (products) {

    for (var i = 0; i < products.length; i++) {
      const product = [];
      product.push(products[i].node.title)
      product.push(products[i].node.variants.edges[0].node.price)
      productsShow.push(product)
    }
  }
  if (products1) {
    for (var i = 0; i < products1.length; i++) {
      const product = [];

      product.push(products1[i].title)
      product.push(products1[i].variants.edges[0].node.price)
      productsShow.push(product)
    }
  }
  const options = [
    { label: 'enable', value: 'enable' },
    { label: 'disable', value: 'disble' },

  ];
  //handleChange
  const handleChange = useCallback((value) => {
    setSelected(value);
  }, []);
  const handleSelectChange = useCallback((value) => setSelected2(value), []);
  const handleChange1 = useCallback((value) => {
    setSelected1(value)
  }, []);

  const handleOnchange = useCallback((value) => setName(value), [])
  const handleOnchange1 = useCallback((value) => {
    setPriority(value);
    if (parseInt(value) <= 0 || parseInt(value) >= 100) {
      setLoading(true);

    } else {
      setLoading(false)
    }
  }, [])
  const handleOnchange2 = useCallback((value) => {
    setAmount(value)
    if (parseInt(value) <= 0 || parseInt(value) > 100 || value == '') {
      setLoading1(true);
      // setAmount("0")

    } else {
      setLoading1(false);
      setAmount(value)
    }
  }, [])
  const handleSelection = (resources) => {
    const idsFromResources = resources.selection.map((product) => product.id);
    setOpen(false)
    store.set('ids', idsFromResources);
  };
  /** Query grapQl */
  const GET_PRODUCTS_BY_ID = gql`
  query getProducts($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Product {
        title
        handle
        id
        descriptionHtml
        images(first: 1) {
          edges {
            node {
              id
              altText
              originalSrc
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              price
              id 
            }
          }
        } 
      }
    }
  }
`;
  const GET_PRODUCTS = gql`
  query{
    products(first: 10) {
          edges {
            node {
              id
              title
              images(first: 1) {
                edges {
                  node {
                    originalSrc
                  }
                }
              }
              variants(first: 1) {
                edges {
                  node {
                    price
                  }
                }
              }
            }
          }
        }
      
  }

`;
  const GET_PRODUCTS_COLLECTION = gql`
  query{
    collections(first:5){
      edges{
        node{
          id
          title
          description
         products(first: 1) {
          edges {
            node {
              id
              title
              variants(first: 1) {
                edges {
                  node {
                    price
                  }
                }
              }
            }
          }
        }
        }
      }
    }
  }
`;

  //get prosucts
  const { data } = useQuery(GET_PRODUCTS_BY_ID, {
    variables: { ids: store.get('ids') }
  }
  );
  const data1 = useQuery(GET_PRODUCTS);
  const data2 = useQuery(GET_PRODUCTS_COLLECTION);

  if (data2.data) {
    for (var i = 0; i < data2.data.collections.edges.length; i++) {
      if (data2.data.collections.edges[i].node.products.edges.length) {
        const Pr = []
        Pr.push(data2.data.collections.edges[i].node.products.edges[0].node.title);
        Pr.push(data2.data.collections.edges[i].node.products.edges[0].node.variants.edges[0].node.price);
        productCollections.push(Pr)
      }
    }

  }
  useEffect(() => {
    if (data) {
      setId(data.nodes);
    }
  }, [data]);

  const handleRemovePro = useCallback(
    (_id) => {
      setId(id.filter((x) => x.id != _id));
    },
    [id]
  );


  // eslint-disable-next-line react-hooks/exhaustive-deps
  const showResourcePicker = useCallback(() => {
    setOpen(true);
  });


  // eslint-disable-next-line react-hooks/exhaustive-deps
  const renderChildren = useCallback((isSelected) => {
    if (isSelected) {
      if (selected == '1') {

        setProducts2("")
        setProducts1("");
        if (data1.data) {
          setProducts(data1.data.products.edges);
        }

      }
      if (selected == '2') {

        setProducts2("")
        setProducts("");
        if (data) {
          setProducts1(data.nodes);
        }


        return (
          <div>
            <TextField
              placeholder="Search Product"
              onFocus={showResourcePicker}
            />
            {id &&
              id.map((item, index) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 10,
                    background: "rgb(241 237 237)",
                    padding: "13px",
                    borderRadius: "5px",
                  }}
                  id={item.id}
                  key={index}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Image
                      src={item.images.edges[0].node.originalSrc}
                      alt=""
                      style={{
                        height: 60,
                        width: 60,
                        marginRight: 15,
                      }}
                    />
                    <span>{item.title}</span>
                  </div>
                  <div>
                    <Button
                      plain
                      color="#ccc"
                      onClick={() => handleRemovePro(item.id)}
                    >
                      <Icon source={CancelSmallMinor} />
                    </Button>
                  </div>
                </div>
              ))}
          </div>

        )
      }
      if (selected == '3') {
        setProducts1("");
        setProducts("");
        setProducts2("");
        return (
          <div>

            <Collection />
          </div>

        )
      }
      if (selected == '4') {
        setProducts2("")
        setProducts1("");
        if (data1.data) {
          setProducts(data1.data.products.edges);
        }
        return (
          <div>
            <ProductTags />

          </div>
        )
      }
    }
  });

  //custom price

  if (selected1 == 'a') {
    if (parseInt(amount) > 0 && parseInt(amount) <= 100) {
      if (productsShow.length) {
        for (var i = 0; i < productsShow.length; i++) {
          for (var j = 0; j < productsShow[i].length; j++) {
            productsShow[i][1] = parseInt(amount);
            break;
          }
        }
      } else {
        for (var i = 0; i < productCollections.length; i++) {
          for (var j = 0; j < productCollections[i].length; j++) {
            productCollections[i][1] = parseInt(amount);
            break;
          }
        }
      }
    }

  }

  if (selected1 == 'b') {
    if (parseInt(amount) > 0 && parseInt(amount) <= 100) {
      if (productsShow.length) {
        for (var i = 0; i < productsShow.length; i++) {
          for (var j = 0; j < productsShow[i].length; j++) {
            productsShow[i][1] = productsShow[i][1] - parseInt(amount);
            break;
          }
        }
      } else {
        for (var i = 0; i < productCollections.length; i++) {
          for (var j = 0; j < productCollections[i].length; j++) {
            productCollections[i][1] = productCollections[i][1] - parseInt(amount);
            break;
          }
        }
      }
    }
  }
  if (selected1 == 'c') {
    if (parseInt(amount) > 0 && parseInt(amount) <= 100) {
      if (productsShow.length) {
        for (var i = 0; i < productsShow.length; i++) {
          for (var j = 0; j < productsShow[i].length; j++) {
            productsShow[i][1] = productsShow[i][1] * (1 - parseInt(amount) / 100);
            break;
          }
        }
      } else {
        for (var i = 0; i < productCollections.length; i++) {
          for (var j = 0; j < productCollections[i].length; j++) {
            productCollections[i][1] = productCollections[i][1] * (1 - parseInt(amount) / 100);
            break;
          }
        }
      }
    }
  }


  return <div style={{ display: "flex" }}>
    <div style={{ flex: "3" }}>
      <Page title="New Pricing Rule">
        <Layout>
          <Layout.Section >
            <Card title="Generral Infamation" sectioned>
              <FormLayout>
                <TextField value={name} label="Name" onChange={handleOnchange} />
                <TextField
                  type="number"
                  label="Priority"
                  value={priority}
                  onChange={handleOnchange1}

                />
                {loading ? <p style={{ color: "red" }}>please enter an integer from 0 to 99.0 is highest priority</p> : ""}
                <Select
                  label="Status"
                  options={options}
                  onChange={handleSelectChange}
                  value={selected2}
                />
              </FormLayout>
            </Card>
          </Layout.Section>
          <Layout.Section style={{ height: "200px" }}>
            <Card title="Apply to Products" sectioned>
              <FormLayout>
                <ChoiceList
                  choices={[
                    { label: 'All Products', value: '1', renderChildren },
                    {
                      label: 'Specific products', value: '2',
                      renderChildren
                    },
                    { label: 'Product Collection', value: '3', renderChildren },
                    { label: 'Product Tags', value: '4', renderChildren },
                  ]}
                  selected={selected}
                  onChange={handleChange}
                />
              </FormLayout>
            </Card>
          </Layout.Section>
          <Layout.Section>
            <Card title="Custom Prices" sectioned>
              <FormLayout>
                <ChoiceList
                  choices={[
                    { label: 'Apply a price to selected products', value: "a", },
                    { label: 'Decrease a fixed amount of the original prices of selected products', value: 'b', },
                    { label: 'Decrease the original prices  of selected products by a percentage(%)', value: 'c', },
                  ]}
                  selected={selected1}
                  onChange={handleChange1}
                />
                <div>
                  <TextField label="Amount"
                    type="number"
                    value={amount}
                    onChange={handleOnchange2} />
                  {loading1 ? <p style={{ color: "red" }}>please enter an integer from 0 to 100 is highest amount</p> : ""}
                </div>
              </FormLayout>
            </Card>
          </Layout.Section>
        </Layout>
        <ResourcePicker
          resourceType='Product'
          open={open}
          onCancel={() => setOpen(false)}
          onSelection={(resources) => handleSelection(resources)}
          actionVerb="select"
          showVariants={false}
          showArchived={true}
          initialSelectionIds={product}
          showHidden={true}
          showArchivedBadge={true}
          showDraftBadge={true}

        />
      </Page>
    </div>
    <div style={{ flex: "1" }}>
      <Page title="Show product pricing detail">
        <Card>
          <DataTable
            columnContentTypes={[
              'text',
              'numeric',
            ]}
            headings={[
              'Title',
              'Price',
            ]}
            rows={productsShow.length > 0 ? productsShow : productCollections}
          />
        </Card>
      </Page>
    </div>
  </div>
}

