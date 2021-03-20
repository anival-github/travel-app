import React from 'react';

type PropsType = {
  dataString: string,
};

const Time: React.FC<PropsType> = ({ dataString }:PropsType) => (
  <div>
    <div>
      {dataString}
    </div>
  </div>
);

export default Time;
