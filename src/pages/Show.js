/* eslint-disable no-underscore-dangle */
import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import Cast from '../components/show/Cast';
import Details from '../components/show/Details';
import Seasons from '../components/show/Seasons';
import ShowMainData from '../components/show/ShowMainData';
import apiGet from '../misc/Config';
import { ShowPageWrapper, InfoBlock } from './Show.styled';

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

  if (isLoading) return <div>Data is loading.............</div>;

  if (error) return <div>{`Error occured: ${error}`}</div>;

  return (
    <ShowPageWrapper>
      <ShowMainData
        image={show.image}
        name={show.name}
        rating={show.rating}
        summary={show.summary}
        tags={show.genres}
      />

      <InfoBlock>
        <h2>Details</h2>
        <Details
          status={show.status}
          netowrk={show.network}
          premiered={show.premiered}
        />
      </InfoBlock>

      <InfoBlock>
        <h2>Seasons</h2>
        <Seasons seasons={show._embedded.seasons} />
      </InfoBlock>

      <InfoBlock>
        <h2>Cast</h2>
        <Cast cast={show._embedded.cast} />
      </InfoBlock>
    </ShowPageWrapper>
  );
};

export default Show;
