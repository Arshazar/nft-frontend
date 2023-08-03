import { useEffect, useState } from 'react';

import { SearchBar, List } from './components';
import { api } from './utils';
import { Item } from './types/commonTypes';
import { AxiosResponse } from 'axios';

function App() {
  const [text, setText] = useState<string>('');
  const [limit] = useState<number>(20);
  const [offset, setOffset] = useState<number>(0);
  const [data, setData] = useState<Item[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    handleGetData();
  }, []);

  const handleGetData = async (add = false) => {
    api
      .get('', { limit, offset })
      .then((res: AxiosResponse['data']) => {
        const { results } = res;
        setData((prevData) => {
          setIsLoading(false);
          return add ? [...prevData, ...results] : results;
        });
        setError(undefined);
      })
      .catch((err) => {
        setError(err);
        if (attempt < 3) {
          // Retry after 1 second
          setTimeout(() => handleGetData(add), 1000);
          setAttempt(attempt + 1);
        } else {
          setIsLoading(false);
        }
      });
  };

  const handleFilter = (txt: string) => {
    if (txt.length === 0) return data;
    const filteredData = data.filter((item) =>
      item.title.toLowerCase().includes(txt.toLowerCase())
    );
    return filteredData;
  };

  const _loadNextPage = () => {
    console.log('shit');
    setIsLoading(true);
    setOffset((prevOffset) => prevOffset + 20);
    handleGetData(true);
  };

  return (
    <div className="app">
      <div className="container">
        <h1>A cool NFT shop website</h1>
        <SearchBar setText={setText} text={text} />
        <h3>{error}</h3>
        <List
          data={handleFilter(text)}
          loadNextPage={_loadNextPage}
          isLoading={isLoading}
          hasNextPage={true}
        />
      </div>
    </div>
  );
}

export default App;
