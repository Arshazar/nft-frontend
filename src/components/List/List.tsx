import { FixedSizeGrid as Grid, GridChildComponentProps } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSizer from 'react-virtualized-auto-sizer';

import s from './List.module.css';
import { Item } from '..';
import { ListProps } from '@/types/componentsTypes';
import { useViewport } from '@/hooks';

const gutter = 16;

const List = ({ data, hasNextPage, isLoading, loadNextPage }: ListProps) => {
  const viewportSize = useViewport();
  const loadMoreItems = isLoading ? () => {} : loadNextPage;
  const isItemLoaded = (index: number) => !hasNextPage || index < data.length;

  const Cell = ({ columnIndex, rowIndex, style }: GridChildComponentProps) => {
    const index = rowIndex * 5 + columnIndex;
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
        />
      );
    }
  };

  const handleColCount = () => {
    const width = viewportSize.width;
    if (width >= 1280) {
      return 5;
    }
    if (width >= 992 && width < 1280) {
      return 4;
    } else if (width < 991 && width >= 680) {
      return 3;
    } else if (width <= 679 && width > 479) {
      return 2;
    } else {
      return 1;
    }
  };

  return (
    <div className={s['list-wrapper']}>
      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={1000}
            loadMoreItems={loadMoreItems}>
            {({ onItemsRendered, ref }) => (
              <Grid
                className={s['list']}
                columnCount={handleColCount()}
                columnWidth={width / handleColCount()}
                height={height}
                onItemsRendered={(gridProps) => {
                  onItemsRendered({
                    overscanStartIndex: gridProps.overscanRowStartIndex * handleColCount(),
                    overscanStopIndex: gridProps.overscanRowStopIndex * handleColCount(),
                    visibleStartIndex: gridProps.visibleRowStartIndex * handleColCount(),
                    visibleStopIndex: gridProps.visibleRowStopIndex * handleColCount()
                  });
                }}
                ref={ref}
                rowCount={data.length}
                rowHeight={width / handleColCount()}
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
