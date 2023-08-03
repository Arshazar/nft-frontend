import { useRef } from 'react';
import { FixedSizeGrid as Grid, GridChildComponentProps } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSizer from 'react-virtualized-auto-sizer';

import s from './List.module.css';
import { Item } from '..';
import { ListProps } from '@/types/componentsTypes';
import { useMediaQuery } from '@/hooks';

const gutter = 16;

const List = ({ data, hasNextPage, isLoading, loadNextPage, disableFetch }: ListProps) => {
  const loadMoreItems = isLoading || disableFetch ? () => {} : loadNextPage;
  const isItemLoaded = (index: number) => !hasNextPage || index < data.length;
  const grid = useRef(5);
  const cols = {
    1: useMediaQuery('screen and (max-width:480px)'),
    2: useMediaQuery('screen and (max-width:680px)'),
    3: useMediaQuery('screen and (max-width:992px)'),
    4: useMediaQuery('screen and (max-width:1280px)')
  };

  if (cols[1]) grid.current = 1;
  else if (cols[2]) grid.current = 2;
  else if (cols[3]) grid.current = 3;
  else if (cols[4]) grid.current = 4;

  const Cell = ({ columnIndex, rowIndex, style }: GridChildComponentProps) => {
    const index = rowIndex * grid.current + columnIndex;
    if (isItemLoaded(index)) {
      const item = data[index];
      return (
        <Item
          style={{
            ...style,
            width: (style.width as number) - gutter,
            height: (style.height as number) - gutter
          }}
          item={item}
          key={`item-${index}`}
        />
      );
    }
  };

  return (
    <div className={s['list-wrapper']}>
      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={10000}
            loadMoreItems={loadMoreItems}>
            {({ onItemsRendered, ref }) => (
              <Grid
                columnCount={grid.current}
                columnWidth={width / grid.current}
                height={height}
                overscanRowCount={4}
                onItemsRendered={({
                  visibleRowStartIndex,
                  overscanRowStopIndex,
                  overscanRowStartIndex,
                  visibleRowStopIndex
                }) => {
                  onItemsRendered({
                    overscanStartIndex: overscanRowStartIndex * grid.current,
                    overscanStopIndex: overscanRowStopIndex * grid.current + (grid.current - 1),
                    visibleStartIndex: visibleRowStartIndex * grid.current,
                    visibleStopIndex: visibleRowStopIndex * grid.current + (grid.current - 1)
                  });
                }}
                ref={ref}
                rowCount={Math.floor(data.length / grid.current)}
                rowHeight={width / grid.current}
                width={width + gutter}>
                {Cell}
              </Grid>
            )}
          </InfiniteLoader>
        )}
      </AutoSizer>
    </div>
  );
};

export { List };
