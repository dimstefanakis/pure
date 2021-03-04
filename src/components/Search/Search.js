import React, {useState} from 'react';
import { navigate } from "gatsby"  
import Input from 'antd/es/input';
import AutoComplete from 'antd/es/auto-complete';
import './search.css';

function Search({products}){
  const [options, setOptions] = useState([]);
  console.log(products);

  function handleResultClick(handle){
    navigate(`/product/${handle}`)
  }

  const searchResult = (query) => {
    return products.filter((p, idx)=>
      p.node.title.toUpperCase().includes(query.toUpperCase()) 
    )
      .map((p, idx) => {
        const category = `${p.node.title}`;
        return {
          value: p.node.handle,
          label: (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                height: 100,
                alignItems:'center'
              }}
            >
              <span>{category}</span>
              <img src={p.node.images[0].originalSrc} className="search-result-image" />
            </div>
          ),
        };
      });
  };
  

  const handleSearch = (value) => {
    setOptions(value ? searchResult(value) : []);
  };

  const onSelect = (value) => {
    console.log('onSelect', value);
    handleResultClick(value);
  };
  return(
    <div className="search-input">
      <AutoComplete
        dropdownMatchSelectWidth={252}
        options={options}
        onSelect={onSelect}
        onSearch={handleSearch}
      >
        <Input.Search size="large" placeholder="Search products" enterButton />
      </AutoComplete>
    </div>
  )
}

export default Search;
