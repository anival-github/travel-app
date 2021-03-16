import React, { useEffect, useState } from 'react';
import TimeWidget from './TimeWidget';

type PropsType = {
  languageCode: string,
  timeZone: string,
};

const TimeWidgetContainer: React.FC<PropsType> = ({ languageCode, timeZone }:PropsType) => {
  const [date, setDate] = useState(new Date());

  const dataOptions = {
    timeZone,
    timeZoneName: 'long' as 'long',
    day: 'numeric' as 'numeric',
    month: 'long' as 'long',
    weekday: 'long' as 'long',
    hour: '2-digit' as '2-digit',
    minute: '2-digit' as '2-digit',
    second: '2-digit' as '2-digit',
  };

  const dataString = date.toLocaleString(languageCode, dataOptions);

  useEffect(() => {
    const timerId = setInterval(
      () => setDate(new Date()),
      1000,
    );
    return () => {
      clearInterval(timerId);
    };
  }, [timeZone]);

  return (
    <TimeWidget dataString={dataString} />
  );
};

export default TimeWidgetContainer;
