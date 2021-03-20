import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppStateType } from '../../../../redux/store';
import Time from './Time';

type MapStateToPropsType = {
  currentLanguage: string,
  currentCountryData: any,
};

type PropsType = MapStateToPropsType;

const TimeContainer: React.FC<PropsType> = ({
  currentLanguage, currentCountryData,
}: PropsType) => {
  const [date, setDate] = useState(new Date());

  const { timeZone, ISOCode } = currentCountryData;

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

  let dataString = date.toLocaleString(currentLanguage, dataOptions);

  if (ISOCode === 'BLR') {
    dataString = dataString.replace('Москва', 'Минск');
    dataString = dataString.replace('Moscow', 'Minsk');
    dataString = dataString.replace('Moskauer', 'Minsk');
  }

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
    <div className="widget">
      <Time dataString={dataString} />
    </div>
  );
};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  currentLanguage: state.localisation.currentLanguage,
  currentCountryData: state.countries.currentCountryData,
});

export default connect(mapStateToProps, {})(TimeContainer);
