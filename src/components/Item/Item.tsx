import { ListChildComponentProps } from 'react-window';

import s from './Item.module.css';
import { Item } from '@/types/commonTypes';
import { Image } from '..';

const Item = ({
  item: { title, img, price },
  style
}: {
  item: Item;
  style: ListChildComponentProps['style'];
}) => {
  return (
    <div className={s['item']} style={style}>
      <Image className={s['item-img']} src={img} alt={title} />
      <div className={s['item-downbar']}>
        <span>{title}</span>
        <span>{price}$</span>
      </div>
    </div>
  );
};

export { Item };
