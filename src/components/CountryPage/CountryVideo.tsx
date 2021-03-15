import React from 'react';
import YouTube from 'react-youtube';

interface CountryVideoProps {
  videoUrl: string
}

const CountryVideo:React.FC<CountryVideoProps> = ({ videoUrl } : CountryVideoProps) => {
  const opts = {
    height: '300',
    width: '320',
  };
  return (
    <div className="country-video">
      <YouTube opts={opts} videoId={videoUrl} />
    </div>
  );
};

export default CountryVideo;
