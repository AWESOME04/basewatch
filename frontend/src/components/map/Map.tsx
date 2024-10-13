import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { pollutionZones, mapCenter, defaultZoom } from '../../data/map';

const Map: React.FC = () => {
  useEffect(() => {
    const map = L.map('map', {
      center: mapCenter,
      zoom: defaultZoom,
      zoomControl: false
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    L.control.zoom({
      position: 'topright'
    }).addTo(map);

    pollutionZones.forEach(zone => {
      L.circle(zone.center, {
        color: zone.color,
        fillColor: zone.color,
        fillOpacity: 0.35,
        radius: zone.radius
      }).addTo(map);
    });

    setTimeout(() => {
      map.invalidateSize();
    }, 100);

    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" style={{ width: '100%', height: '100%' }} />;
};

export default Map;