/* eslint-disable max-len */
import React from 'react';
import L from 'leaflet';
import {
  MapContainer, TileLayer, Marker, Popup, Polygon,
} from 'react-leaflet';
import '../../../node_modules/leaflet-fullscreen/dist/leaflet.fullscreen.css';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen';
import marker from '../../assets/icons/marker.png';
import getPolygon from './Polygons';

interface MapComponentProps {
  countryAbr: string
  coordinates: any
  capital: string
}

const MapComponent:React.FC<MapComponentProps> = ({ capital, coordinates, countryAbr }: MapComponentProps) => {
  const mapMarker = L.icon({
    iconUrl: marker,
    iconSize: [35, 40],
    iconAnchor: [17, 40],
  });

  const coord: any = getPolygon(countryAbr).features[0].geometry.coordinates;
  console.log(coord);
  const cord = getPolygon(countryAbr).features[0].geometry;
  console.log(cord);
  const newC: any = coord.map((item: any) => [item.map((i: any) => (i.length > 2 ? [i.map((it: any) => [it[1], it[0]])] : [i[1], i[0]]))]);

  return (
    <MapContainer fullscreenControl className="map-container" center={coordinates} zoom={5}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker icon={mapMarker} position={coordinates}>
        <Polygon pathOptions={{ color: 'red' }} positions={newC} />
        <Popup>
          {capital}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
