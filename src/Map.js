import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; 


import customMarkerIcon from './custom-marker-icon.png';

const Map = ({ events }) => {

  const defaultCenter = [45.5283308, -122.6634712];
  const defaultZoom = 13;


  const customIcon = L.icon({
    iconUrl: customMarkerIcon,
    iconSize: [32, 32],
    iconAnchor: [16, 32], 
    popupAnchor: [0, -32] 
  });

  return (
    <div className="h-auto w-full">
      <MapContainer center={defaultCenter} zoom={defaultZoom} scrollWheelZoom={false} className="h-96 w-4/5 mx-auto justify-center items-center">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {events.map((event, index) => {
          
          const coordinates = event['_venue_coordinates'] || event['_host_coordinates'];
          const latitude = coordinates?.latitude;
          const longitude = coordinates?.longitude;

          if (latitude !== undefined && longitude !== undefined) {
            return (
              <Marker key={index} position={[latitude, longitude]} icon={customIcon}>
                <Popup>
                  {event.title.rendered}<br />
                  {event.date}
                </Popup>
              </Marker>
            );
          } else {
            return null; 
          }
        })}
      </MapContainer>
    </div>
  );
};

export default Map;
