import React from 'react';

interface ItemProps {
  imgUrl: string
  itemDescription: string
  itemRating: number
  fullScrrenHandler(): void
}

const SlideItem:React.FC<ItemProps> = ({
  imgUrl, itemDescription, itemRating, fullScrrenHandler,
}: ItemProps) => (
  <div className="slide-wrapper">
    <img
      onClick={fullScrrenHandler}
      onKeyPress={fullScrrenHandler}
      role="presentation"
      className="photo-gallery"
      src={imgUrl}
      alt="img"
    />
    <div className="item-description">{itemDescription}</div>
    <div className="item-rating">{itemRating}</div>
  </div>
);
export default SlideItem;
