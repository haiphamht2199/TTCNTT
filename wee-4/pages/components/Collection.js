import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { Combobox, Icon, Listbox, Stack, Tag, TextContainer, TextField, Button, Autocomplete } from '@shopify/polaris';
import { gql, useQuery } from '@apollo/client';
import store from 'store-js';
import { SearchMinor } from '@shopify/polaris-icons';
import { isAssetError } from 'next/dist/client/route-loader';
export default function Collection() {

  const [collects, setCollects] = useState([]);
  const collection = [];
  const collection1 = []
  const products = [];
  //query
  const GET_PRODUCTS = gql`
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
  const GET_PRODUCT_BY_COLLECTION = gql`
query getProducts($_ids: [ID!]!) {
  nodes(ids: $_ids) {
    ... on Collection {
      title
      handle
      id
      descriptionHtml
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
}`
  //Lấy dữ liệu
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  useEffect(() => {
    for (var i = 0; i < collects.length; i++) {
      const dataCollection = {};
      dataCollection["value"] = collects[i].node.title;
      dataCollection["label"] = collects[i].node.title;
      dataCollection["id"] = collects[i].node.id;
      collection.push(dataCollection);
    }
  })



  useEffect(() => {
    if (data) {
      setCollects(data.collections.edges);


    }
  }, [data]);


  //combobox
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState(collection);
  const updateText = (value) => {
    setInputValue(value);
    if (value === '') {
      setOptions(collection);
      return;
    }

    const filterRegex = new RegExp(value, 'i');
    const resultOptions = collection.filter((option) =>
      option.label.match(filterRegex),
    );
    setOptions(resultOptions);
  };


  const updateSelection = useCallback(
    (selected) => {
      if (selectedOptions.includes(selected)) {
        setSelectedOptions(
          selectedOptions.filter((option) => option !== selected),
        );

      } else {
        setSelectedOptions([...selectedOptions, selected]);
      }

      const matchedOption = options.find((option) => {
        return option.value.match(selected);
      });
      setInputValue((matchedOption && matchedOption.label) || '');
    },
    [options, selectedOptions],
  );

  const removeTag = useCallback(
    (tag) => () => {
      const options = [...selectedOptions];
      options.splice(options.indexOf(tag), 1);
      setSelectedOptions(options);
    },
    [selectedOptions],
  );

  const tagsMarkup = selectedOptions.map((option) => {
    let tagLabel = '';
    tagLabel = option.replace('_', ' ');
    tagLabel = titleCase(tagLabel);
    return (
      <Tag key={`option${option}`} onRemove={removeTag(option)}>
        {tagLabel}
      </Tag>
    );
  });
  const optionsMarkup =
    (options.length > 0)
      ? options.map((option, index) => {
        const { label, value } = option;
        return (
          <Listbox.Option
            key={`${index}`}
            value={value}
            selected={selectedOptions.includes(value)}
            accessibilityLabel={label}
          >
            {label}
          </Listbox.Option>
        );
      })
      : "";
  const showTags = () => {
    setOptions(collection)
  }



  return (
    <div style={{ height: '75px' }}>
      <Combobox
        allowMultiple
        activator={
          <Combobox.TextField
            prefix={<Icon source={SearchMinor} color="inkLighter" />}
            onFocus={showTags}
            onChange={updateText}
            label="Vintage,cotton,summer"
            labelHidden
            value={inputValue}
            placeholder="Vintage,cotton,summer"

          />
        }
      >
        {optionsMarkup ? (
          <Listbox onSelect={updateSelection}>{optionsMarkup}</Listbox>
        ) : null}
      </Combobox>
      <TextContainer>
        <Stack>{tagsMarkup}</Stack>
      </TextContainer>
    </div>
  );

  function titleCase(string) {
    return string
      .toLowerCase()
      .split(' ')
      .map((word) => word.replace(word[0], word[0].toUpperCase()))
      .join('');
  }

}