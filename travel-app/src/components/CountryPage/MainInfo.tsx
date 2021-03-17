import React from 'react';

type PropsType = {
  imgUrl:string | null,
  name:string | null,
  capital:string | null,
  description:string | null,
};

const MainInfo:React.FC<PropsType> = ({
  imgUrl, name, capital, description,
}: PropsType) => (
  <div>
    {name}
    {capital}
    {description}
    {imgUrl}
  </div>
);

export default MainInfo;
