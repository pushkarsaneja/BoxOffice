import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import apiGet from '../misc/Config';

const Home = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);
  const onInputChange = e => {
    setInput(e.target.value);
  };
  const onSearch = () => {
    apiGet(`/search/shows?q=${input}`).then(result => {
      setResults(result);
    });
  };
  const onKeyDown = e => {
    if (e.keyCode === 13) {
      onSearch();
    }
  };

  const renderResults = () => {
    if (results && results.length === 0) {
      return <div>No Result Found</div>;
    }

    if (results && results.length > 0) {
      return results.map(element => {
        return <div key={element.show.id}>{element.show.name}</div>;
      });
    }

    return null;
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
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
