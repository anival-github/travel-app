import React from 'react';

interface ImageProps {
  url: string
  classes: string
  handler(): void
}

const ImageContainer:React.FC<ImageProps> = ({ url, classes, handler }: ImageProps) => (
//   <div style={{ position: 'absolute' }}>
  <img
    onClick={handler}
    onKeyPress={handler}
    role="presentation"
    className={classes}
    src={url}
    alt="image1"
  />
//   </div>
);

export default ImageContainer;
