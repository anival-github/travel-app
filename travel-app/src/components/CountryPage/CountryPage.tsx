import React from 'react';
import CountryVideo from './CountryVideo';
import MainInfo from './MainInfo';
import MapComponent from './MapComponent';
import Photos from './Photos';
import { Currencies, TimeWidget, WeatherWidget } from './vidgets';

const CountryPage:React.FC = () => {
    return (
        <div>
            <MainInfo />
            <Photos />
            <CountryVideo />
            <MapComponent />
            <Currencies />
            <WeatherWidget />
            <TimeWidget />
        </div>
    );
};

export default CountryPage;
