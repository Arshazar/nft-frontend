import { Item } from './commonTypes';

export interface SearchBarProps {
  text: string;
  setText: (text: string) => void;
}
export interface ListProps {
  data: Item[] | [];
  hasNextPage: boolean;
  isLoading: boolean;
  loadNextPage: () => void;
}
