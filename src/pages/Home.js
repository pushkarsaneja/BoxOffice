import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import apiGet from '../misc/Config';

const Home = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');
  const isShowsSearch = searchOption === 'shows';

  const onInputChange = e => {
    setInput(e.target.value);
  };

  const onRadioChange = e => {
    setSearchOption(e.target.value);
  };

  const onSearch = () => {
    apiGet(`/search/${searchOption}?q=${input}`).then(result => {
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
        if (element.show) {
          return <div key={element.show.id}>{element.show.name}</div>;
        }
        return <div key={element.person.id}>{element.person.name}</div>;
      });
    }

    return null;
  };

  return (
    <MainPageLayout>
      <input
        type="text"
        placeholder="Search for something"
        onChange={onInputChange}
        value={input}
        onKeyDown={onKeyDown}
      />

      <div>
        <label htmlFor="shows-search">
          Shows
          <input
            id="shows-search"
            type="radio"
            onChange={onRadioChange}
            value="shows"
            checked={isShowsSearch}
          />
        </label>

        <label htmlFor="actors-search">
          Actors
          <input
            id="actors-search"
            type="radio"
            onChange={onRadioChange}
            value="people"
            checked={!isShowsSearch}
          />
        </label>
      </div>

      <button type="button" onClick={onSearch}>
        Search
      </button>
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
