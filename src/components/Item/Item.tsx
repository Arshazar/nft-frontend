import s from './Item.module.css';
import { Item } from '../../types/commonTypes';
import { useEffect, useRef } from 'react';

const Item = ({ item: { title, img, price } }: { item: Item }) => {
  const itemRef = useRef<HTMLDivElement | null>(null);
  const downbarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const itemElement = itemRef.current;
    const downbarElement = downbarRef.current;

    if (itemElement && downbarElement) {
      const enterHandler = () => {
        downbarElement.classList.add(s['item-downbar-active']);
      };
      const leaveHandler = () => {
        downbarElement.classList.remove(s['item-downbar-active']);
      };
      itemElement.addEventListener('mouseenter', enterHandler);
      itemElement.addEventListener('mouseleave', leaveHandler);

      return () => {
        itemElement.removeEventListener('mouseenter', enterHandler);
        itemElement.removeEventListener('mouseleave', leaveHandler);
      };
    }
  }, [itemRef, downbarRef]);

  return (
    <div className={s['item']} ref={itemRef}>
      <img className={s['item-img']} src={img} />
      <div className={s['item-downbar']} ref={downbarRef}>
        <span>{title}</span>
        <span>{price}$</span>
      </div>
    </div>
  );
};

export { Item };
