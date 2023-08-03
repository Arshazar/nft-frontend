import { useState } from 'react';
import { AxiosResponse } from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';

import { SearchBar, List } from './components';
import { api } from './utils';
import { Item } from './types/commonTypes';

function App() {
  const [text, setText] = useState<string>('');

  const fetchItems = async ({ pageParam = 0 }) => {
    const res: AxiosResponse['data'] = await api.get('/idxv2/getListedNftsByCollectionSymbol?collectionSymbol=okay_bears', { limit: 20, offset: pageParam });
    return res.results;
  };

  const { data, error, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery<
    Item[] | [],
    Error
  >(['nftItems'], fetchItems, {
    getNextPageParam: (_lastPage, pages) => pages.length * 20
  });

  const filteredData = (txt: string) => {
    if (!data) return [];
    const flatData = data?.pages.flat();
    if (txt.trim().length === 0) return flatData;
    const filteredData =
      Array.isArray(flatData) &&
      flatData.filter((item) => item.title.toLowerCase().includes(txt.toLowerCase()));
    return filteredData;
  };

  return (
    <div className="app">
      <div className="container">
        <h1>A cool NFT shop website</h1>
        <SearchBar setText={setText} text={text} />
        <h3>{error instanceof Error}</h3>
        <List
          data={filteredData(text) as Item[] | []}
          loadNextPage={fetchNextPage}
          isLoading={isLoading}
          disableFetch={text.length > 0}
          hasNextPage={hasNextPage as boolean}
        />
      </div>
    </div>
  );
}

export default App;
