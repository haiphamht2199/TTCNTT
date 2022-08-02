import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { Combobox, Icon, Listbox, Stack, Tag, TextContainer, TextField, Autocomplete } from '@shopify/polaris';
import { SearchMinor } from '@shopify/polaris-icons';
import { gql, useQuery } from '@apollo/client';
export default function ProductTags() {
  const [pTags, SetPTags] = useState([]);
  const ProductTags = [];
  //query grapql
  const GET_PRODUCTS = gql`
  query{
    products(first:10){
      edges{
        node{
          id
          title
          tags
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
  //Lâys dữ liệu
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  useEffect(() => {
    if (data) {
      SetPTags(data.products.edges);

    }
  }, [data]);

  const ProductTagsTmp = [];
  const check = (tags, arrTags) => {
    for (var i = 0; i < arrTags.length; i++) {
      const exit = false
      if (tags === arrTags[i]) {
        exit = true;
        break;
      }

    }
    return exit;
  }
  for (var i = 0; i < pTags.length; i++) {
    if (pTags[i].node.tags.length) {
      for (var j = 0; j < pTags[i].node.tags.length; j++) {
        if (!check(pTags[i].node.tags[j], ProductTagsTmp)) {
          ProductTagsTmp.push(pTags[i].node.tags[j])
        }
      }
    }

  }

  for (var i = 0; i < ProductTagsTmp.length; i++) {
    const dataProductTags = {};
    dataProductTags["value"] = ProductTagsTmp[i];
    dataProductTags["label"] = ProductTagsTmp[i];
    ProductTags.push(dataProductTags);
  }
  //combobox
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState(ProductTags);

  const updateText =
    (value) => {
      setInputValue(value);
      if (value === '') {

        setOptions(ProductTags);
        return;
      }

      const filterRegex = new RegExp(value, 'i');
      const resultOptions = ProductTags.filter((option) =>
        option.label.match(filterRegex),
      );
      setOptions(resultOptions);
    }
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
    setOptions(ProductTags)
  }
  return (
    <div style={{ height: '75px' }}>
      <Combobox
        allowMultiple
        activator={
          <Combobox.TextField
            prefix={<Icon source={SearchMinor} color="inkLighter" />}
            onChange={updateText}
            label="Vintage,cotton,summer"
            labelHidden
            onFocus={showTags}
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
