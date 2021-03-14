/* eslint-disable max-len */
import React from 'react';
import L from 'leaflet';
import {
  MapContainer, TileLayer, Marker, Popup, Polyline,
} from 'react-leaflet';
import '../../../node_modules/leaflet-fullscreen/dist/leaflet.fullscreen.css';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen';
import marker from '../../assets/icons/marker.png';
import getPolygon from './Polygons';

interface MapComponentProps {
  countryAbr: string
  coordinates: any
}

const MapComponent:React.FC<MapComponentProps> = ({ coordinates, countryAbr }: MapComponentProps) => {
  const mapMarker = L.icon({
    iconUrl: marker,
    iconSize: [35, 40],
    iconAnchor: [17, 40],
  });

  let popup = '';
  switch (countryAbr) {
    case 'BLR':
      popup = 'Минск, столица Беларуси';
      break;
    case 'POL':
      popup = 'Варшава, столица Польши';
      break;
    default:
      popup = 'Столица страны';
  }

  const coord = getPolygon(countryAbr).features[0].geometry.coordinates[0];

  const newC: [number, number][] = coord.map((item) => [item[1], item[0]]);

  return (
    <MapContainer fullscreenControl className="map-container" center={coordinates} zoom={5}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker icon={mapMarker} position={[53.90899450883923, 27.549398216118476]}>
        <Polyline pathOptions={{ color: 'red' }} positions={newC} />
        <Popup>
          {popup}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
