
import React, { useState, useEffect } from 'react';

function withDataFetch(WrappedComponent, fetchUrl) {
  return function DataFetchingComponent(props) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(fetchUrl);
          if (!response.ok) throw new Error(`Error: ${response.status}`);
          const jsonData = await response.json();
          setData(jsonData.data); // because fakerapi returns { data: [...] }
        } catch (err) {
          setError(err);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }, [fetchUrl]);

    return (
      <WrappedComponent
        {...props}
        fetchedData={data} 
        isLoading={isLoading}
        error={error}
      />
    );
  };
}

export default withDataFetch;