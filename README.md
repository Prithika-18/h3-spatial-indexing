## TRAFFIC CONGESTION VISUALIZATION USING H3-SPATIAL INDEXING

## DESCRIPTION

This project is an interactive traffic congestion visualization system designed for **Coimbatore**, India, utilizing advanced geospatial tools such as **H3 hexagonal grids**, **Deck.gl** , **MapTiler**, and **React**. The application displays traffic congestion levels through a web-based map interface, offering users insights a traffic data.The visualization process begins by parsing **CSV** data containing traffic congestion information, including latitude, longitude, count and congestion levels. This data is then transformed into H3 hexagonal grid cells using the H3 spatial indexing system, allowing the traffic data to be displayed in a granular, hexagonal format. 

The congestion levels are color-coded to provide intuitive visual representation on the map.The map is rendered using **React** , **Deck.gl** , and StaticMap components. Deck.gl is responsible for rendering the H3HexagonLayer, which visually represents the hexagonal grid and its associated congestion levels, with elevation and color variations. Users can **hover** over any hexagon on the map to view detailed information, including latitude, longitude, congestion count, and the congestion level.This project offers a detailed, interactive view of traffic congestion in Coimbatore, helping to monitor traffic density, analyze trends, and inform urban planning decisions for improved mobility.


## FEATURES

- H3 Hexagonal grid
- Interactive Traffic Visualization
- Color-Coded Congestion Levels
- Detailed Information on Hover
- Data Parsing from CSV

## GETTING STARTED

## LIBRARIES AND TOOLS

- React
- Deck.gl
- H3-js
- MapTiler
- React-Map-GL
- PapaParse

## DATASET 

FILE: hexagons.csv

Data is extract from the external source Kaggle and then converted to CSV format.

## IMPLEMENTATION

Step 1:Create a new React app and install required libraries ( @deck.gl/react @deck.gl/geo-layers react-map-gl h3-js papaparse )

Step 2:Get an API key from **MapTiler** and Save the API key in a variable **MAPTILER_API_KEY**.

Step 3:Prepare a CSV file (hexagons.csv) with traffic data (columns: latitude, longitude, congestion, count).

Step 4:Set up state and hooks to manage hexagons and tooltip data.

Step 5:Set the maps initial longitude, latitude (for Coimbatore), zoom, pitch, and bearing in **INITIAL_VIEW_STATE**.

Step 6:Set color-coded for visulaize the congestion levels (red for high, orange for medium, and green for low) to provide intuitive indicators on the map.

Step 7:Use **Papa.parse** to load and parse CSV data.

Step 8:Convert coordinates to H3 hexagons using **h3.latLngToCell**.



Step 8:Use H3HexagonLayer from **Deck.gl** to display the hexagonal grid and set the properties.

Step 9:Configure the map with StaticMap and your MapTiler API key.

Step 11:Implement **hover** functionality to **show tooltips** with detailed data.



  
  

