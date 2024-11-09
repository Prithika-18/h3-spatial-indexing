import React, { useState, useEffect } from 'react';
import { DeckGL } from '@deck.gl/react';
import { H3HexagonLayer } from '@deck.gl/geo-layers';
import { StaticMap } from 'react-map-gl';
import * as h3 from 'h3-js';
import Papa from 'papaparse';

const MAPTILER_API_KEY = "m7EKYvhvEURm9c412L9d";

const INITIAL_VIEW_STATE = {
  longitude: 76.9558,
  latitude: 11.0168,
  zoom: 12,
  pitch: 30,
  bearing: 0,
};

const COLOR_MAP = {
  high: [255, 0, 0],   
  medium: [255, 165, 0],  
  low: [0, 255, 0],   
};

function App() {
  const [hexagons, setHexagons] = useState([]);
  const [tooltip, setTooltip] = useState(null);

  useEffect(() => {
    
    Papa.parse('/hexagons.csv', {
      download: true,
      header: true,
      complete: (result) => {
        const data = result.data
          .map((row) => {
            const lat = parseFloat(row.latitude);
            const lng = parseFloat(row.longitude);
            const level = row.congestion;
            
            if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
              console.error("Invalid latitude or longitude:", lat, lng);
              return null; 
            }

            const hex = h3.latLngToCell(lat, lng, 8);

            return {
              hex,
              count: parseInt(row.count, 10),
              level: row.congestion,
              coordinates: h3.cellToBoundary(hex, true),
              lat,
              lng,
            };
          })
          .filter(Boolean); 

        setHexagons(data);
      },
    });
  }, []);

  const layers = [
    new H3HexagonLayer({
      id: 'h3-hexagon-layer',
      data: hexagons,
      pickable: true,
      filled: true,
      extruded: true,
      getHexagon: (d) => d.hex,
      getFillColor: (d) => COLOR_MAP[d.level] || [200, 90, 150],
      getElevation: (d) => d.count * 100,
      onHover: ({ x, y, object }) => {
        if (object) {
          setTooltip({
            x,
            y,
            lat: object.lat.toFixed(5),
            lng: object.lng.toFixed(5),
            count: object.count,
            level: object.level,
          });
        } else {
          setTooltip(null);
        }
      },
    }),
  ];

  return (
    <DeckGL
         initialViewState={INITIAL_VIEW_STATE} 
         controller={true} 
         layers={layers}>
    <StaticMap
            mapStyle={`https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_API_KEY}`}
    />
      
      {tooltip && (
        <div
          style={{
            position: 'absolute',
            left: tooltip.x,
            top: tooltip.y,
            backgroundColor: 'black',
            color: 'white',
            padding: '8px',
            borderRadius: '4px',
            pointerEvents: 'none',
            zIndex: 1000,
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
            fontSize: '14px',
          }}
        >
          <div><strong>Latitude:</strong> {tooltip.lat}</div>
          <div><strong>Longitude:</strong> {tooltip.lng}</div>
          <div><strong>Congestion Count:</strong> {tooltip.count}</div>
          <div><strong>Level:</strong> {tooltip.level}</div>
        </div>
      )}
    </DeckGL>
  );
}

export default App;
