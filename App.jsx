import React, { useState, useEffect } from 'react';
import DeckGL from '@deck.gl/react';
import { H3HexagonLayer } from '@deck.gl/geo-layers';
import { StaticMap } from 'react-map-gl';
import * as h3 from 'h3-js';
import Papa from 'papaparse';

const MAPTILER_API_KEY = "m7EKYvhvEURm9c412L9d";

const INITIAL_VIEW_STATE = {
  longitude: 76.9558,
  latitude: 11.0168,
  zoom: 12,
  pitch: 0,
  bearing: 0
};


const COLOR_MAP_PARENT = {
  high: [200, 0, 0],
  medium: [255, 140, 0],
  low: [0, 150, 0],
};

const COLOR_MAP_CHILD = {
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
          .flatMap((row) => {
            const lat = parseFloat(row.latitude);
            const lng = parseFloat(row.longitude);
            if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
              return [];
            }
            const parentHex = h3.latLngToCell(lat, lng, 6); 
            const parentData = {
              hex: parentHex,
              isParent: true,
              count: parseInt(row.count, 10),
              level: row.congestion,
              coordinates: h3.cellToBoundary(parentHex, true),
              lat,
              lng,
            };
            
            const childHexagons = h3.cellToChildren(parentHex, 8);
            
            const childrenData = childHexagons.map((hex) => ({
              hex,
              isParent: false,
              count: parseInt(row.count, 10),
              level: row.congestion,
              coordinates: h3.cellToBoundary(hex, true),
              lat,
              lng,
            }));
          
              return [parentData, ...childrenData];
          });
        setHexagons(data);
      },
    });
  }, []);

  const layers = [
    new H3HexagonLayer({
      id: 'h3-hexagon-layer',
      data: hexagons,
      pickable: true,
      filled: false, 
      stroked: true, 
      extruded: false,
      getHexagon: (d) => d.hex,
      getLineColor: (d) => d.isParent ? (COLOR_MAP_PARENT[d.level] || [200, 90, 150]) : (COLOR_MAP_CHILD[d.level] || [100, 100, 100]),
      lineWidthMinPixels: 2,
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
    <DeckGL initialViewState={INITIAL_VIEW_STATE}
     controller={true} layers={layers}>
      <StaticMap mapStyle={`https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_API_KEY}`} />
      
      {tooltip && (
        <div style={{
          position: 'absolute',
          left: tooltip.x,
          top: tooltip.y,
          backgroundColor: 'black',
          color:'white',
          padding: '8px',
          borderRadius: '4px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
          pointerEvents: 'none',
          transform: 'translate(-50%, -100%)',
        }}>
          <div><strong>Location:</strong> {tooltip.lat}, {tooltip.lng}</div>
          <div><strong>Count:</strong> {tooltip.count}</div>
          <div><strong>Congestion Level:</strong> {tooltip.level}</div>
        </div>
      )}
      
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        backgroundColor: 'white',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px',
        color: '#333',
      }}>
        <strong style={{ fontSize: '16px', marginBottom: '10px', display: 'block' }}>Congestion Levels</strong>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{
            backgroundColor: 'red',
            width: '20px',
            height: '20px',
            display: 'inline-block',
            borderRadius: '50%',
            marginRight: '10px'
          }}></span>
          High 
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{
            backgroundColor: 'orange',
            width: '20px',
            height: '20px',
            display: 'inline-block',
            borderRadius: '50%',
            marginRight: '10px'
          }}></span>
          Medium 
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{
            backgroundColor: 'green',
            width: '20px',
            height: '20px',
            display: 'inline-block',
            borderRadius: '50%',
            marginRight: '10px'
          }}></span>
          Low 
        </div>
      </div>
    </DeckGL>
  );
}

export default App;
