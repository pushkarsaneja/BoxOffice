import { useReducer, useEffect, useState } from 'react';

const showsReducer = (prevState, action) => {
  switch (action.type) {
    case 'ADD':
      return [...prevState, action.showId];
    case 'REMOVE':
      return prevState.filter(showId => showId !== action.showId);
    default:
      return prevState;
  }
};

const usePersistedReducer = (reducer, initialState, key) => {
  const [state, dispatch] = useReducer(reducer, initialState, initial => {
    const persisted = localStorage.getItem(key);

    return persisted ? JSON.parse(persisted) : initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, dispatch];
};

export const useShows = (key = 'shows') => {
  return usePersistedReducer(showsReducer, [], key);
};

export const useLastQuery = (key = 'lastQuery') => {
  const [input, setInput] = useState(() => {
    const persisted = sessionStorage.getItem(key);

    return persisted ? JSON.parse(persisted) : '';
  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(input));
  }, [input, key]);

  return [input, setInput];
};
