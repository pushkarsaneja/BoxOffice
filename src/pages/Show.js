import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import apiGet from '../misc/Config';

const initialState = {
  show: null,
  isLoading: true,
  error: null,
};

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'fetch_success': {
      return { isLoading: false, show: action.show, error: null };
    }

    case 'fetch_failed': {
      return { isLoading: false, show: null, error: action.error };
    }

    default: {
      return prevState;
    }
  }
};

const Show = () => {
  const { id } = useParams();
  //   const [show, setShow] = useState(null);
  //   const [isLoading, setIsLoading] = useState(true);
  //   const [error, setError] = useState(null);

  const [{ show, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(() => {
    let isMounted = true;

    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(results => {
        if (isMounted) {
          dispatch({ type: 'fetch_success', show: results });
        }
      })
      .catch(err => {
        if (isMounted) {
          dispatch({ type: 'fetch_failed', error: err.message });
        }

        return () => {
          isMounted = false;
        };
      });
  }, [id]);

  console.log('show:', show);
  if (isLoading) return <div>Data is loading.............</div>;

  if (error) return <div>{`Error occured: ${error}`}</div>;

  return <div>This is show id page.</div>;
};

export default Show;
