import React, { useState, useContext } from 'react';
import CartContext from '../../context/CartContext';
import './Search.css'
function Search() {
  let { itemsList, setSearchList } = useContext(CartContext);
  let [input, setInput] = useState('');
  let handleSearch = (e) => {
    setInput(e.target.value);
    let filteredData = itemsList.filter((each) => {
      return each.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase());
    });
    setSearchList(filteredData);
  };

  return (
    <div className='search-container'>
      <input
        type="text"
        value={input}
        onChange={handleSearch}
        placeholder="Search products..."
        className='search-bar'
      />
    </div>
  );
}

export default Search;
