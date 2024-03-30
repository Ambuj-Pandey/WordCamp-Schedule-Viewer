import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Map = ({ events }) => {
  // Define the default center and zoom level for the map
  const defaultCenter = [45.5283308, -122.6634712];
  const defaultZoom = 13;

  return (
    <div className="h-screen w-full">
      <MapContainer center={defaultCenter} zoom={defaultZoom} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {events.map((event, index) => {
          // Check if latitude and longitude are defined for the event
          const coordinates = event['_venue_coordinates'] || event['_host_coordinates'];
          const latitude = coordinates?.latitude;
          const longitude = coordinates?.longitude;

          if (latitude !== undefined && longitude !== undefined) {
            return (
              <Marker key={index} position={[latitude, longitude]}>
                <Popup>
                  {event.title.rendered}<br />
                  {event.date}
                </Popup>
              </Marker>
            );
          } else {
            return null; // Skip rendering the marker if latitude or longitude is undefined
          }
        })}
      </MapContainer>
    </div>
  );
};

export default Map;
