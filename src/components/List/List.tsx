import { FixedSizeList, ListChildComponentProps } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

import s from './List.module.css';
import { Item } from '..';
import { ListProps } from '../../types/componentsTypes';

const List = ({ data, hasNextPage, isLoading, loadNextPage }: ListProps) => {
  const loadMoreItems = isLoading ? () => {} : loadNextPage;
  const isItemLoaded = (index: number) => !hasNextPage || index < data.length;

  const Row = ({ index }: ListChildComponentProps) => {
    if (!isItemLoaded(index)) {
      return <p>Loading...</p>;
    } else {
      const item = data[index];
      return <Item item={item} />;
    }
  };

  return (
    <div className={s['list-wrapper']}>
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={data.length}
        loadMoreItems={loadMoreItems}>
        {({ onItemsRendered, ref }) => (
          <FixedSizeList
            className={s['list']}
            itemCount={data.length}
            onItemsRendered={onItemsRendered}
            ref={ref}
            itemSize={20}
            width={'auto'}
            height={500}>
            {Row}
          </FixedSizeList>
        )}
      </InfiniteLoader>
    </div>
  );
};

export { List };
