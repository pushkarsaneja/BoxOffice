import React, { useState } from 'react';
// import React from 'react';
import MainPageLayout from '../components/MainPageLayout';

const Home = () => {
  const [input, setInput] = useState('');

  const onInputChange = e => {
    setInput(e.target.value);
  };
  const onSearch = () => {
    fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
      .then(r => r.json())
      .then(result => {
        console.log(result);
      });
  };
  const onKeyDown = e => {
    if (e.keyCode === 13) {
      onSearch();
    }
  };

  return (
    <MainPageLayout>
      <input
        type="text"
        onChange={onInputChange}
        value={input}
        onKeyDown={onKeyDown}
      />
      <button type="button" onClick={onSearch}>
        Search
      </button>
    </MainPageLayout>
  );
};

export default Home;
