import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiGet from '../misc/Config';

const Show = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(results => {
        if (isMounted) {
          setTimeout(() => {
            setShow(results);
            setIsLoading(false);
          }, 2000);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err.mssage);
          setIsLoading(false);
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
