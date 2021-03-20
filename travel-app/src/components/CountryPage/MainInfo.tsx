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
  <div className="main-info">
    <span>{name}</span>
    <span>{capital}</span>
    <span>{description}</span>
    <span>{imgUrl}</span>
  </div>
);

export default MainInfo;
