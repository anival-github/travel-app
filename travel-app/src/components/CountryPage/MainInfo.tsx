import React from 'react';

type PropsType = {
  imgUrl:string,
  name:string,
  capital:string | null,
  description:string | null,
};

const MainInfo:React.FC<PropsType> = ({
  imgUrl, name, capital, description,
}: PropsType) => (
  <div className="main-info">
    <div className="main-info-img">
      <img src={imgUrl} alt={name} />
    </div>
    <div className="main-info-description">
      <h1>{name}</h1>
      <h3>
        {capital}
      </h3>
      <span>{description}</span>
    </div>

  </div>
);

export default MainInfo;
