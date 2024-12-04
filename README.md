## TRAFFIC CONGESTION VISUALIZATION USING H3-SPATIAL INDEXING

## DESCRIPTION

This project is an interactive traffic congestion visualization system designed for **Coimbatore**, India, utilizing advanced geospatial tools such as **H3 Spatial indexing**, **Deck.gl** , **MapTiler**, and **React**. The application displays traffic congestion levels through a web-based map interface, offering users insights a traffic data.The visualization process begins by parsing **CSV** data containing traffic congestion information, including latitude, longitude, count and congestion levels. This data is then transformed into H3 hexagonal grid cells using the H3 spatial indexing system, allowing the traffic data to be displayed in a granular, hexagonal format. 

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

Step 1:Set up the project with React, Deck.gl, React-Map-GL, and other required libraries (geo-layers ,react-map-gl, h3-js, papaparse ).

Step 2:Get an API key from **MapTiler** and Store the API key in a variable **MAPTILER_API_KEY**.

Step 3:Set color-coded for visulaize the congestion levels (red for high, orange for medium, and green for low) to provide intuitive indicators on the map.

Step 4:Set up a functional component with state variables hexagons (traffic data) and tooltip (for hover info).

Step 5:Prepare a CSV file (hexagons.csv) with traffic data (columns have: latitude, longitude, congestion, count).

Step 6:Use **Papa.parse** in **useEffect** to load and parse (hexagons.csv) data's.

Step 7:Convert each row’s latitude and longitude to an H3 hexagon ID, validate coordinates, and calculate the hex cell boundaries.

Step 8:Remove any null or invalid rows from parsed data before setting it in state with setHexagons.

Step 9:Set up the **Deck.gl** H3HexagonLayer using hexagons data, configuring fill, elevation, color, and hover events.

Step 10:In the onHover event, update tooltip state with details like latitude,longitude, count, and level if a hexagon is hovered over.

Step 11:Wrap DeckGL with initial view state and StaticMap using MapTiler styling URL.

Step 12:To Render a tooltip box on hover, showing traffic details over the hovered hexagon.

Step 13:Export the App component as the default export.


## OUTPUT

![image](https://github.com/user-attachments/assets/d210b26e-7a19-4c5d-adc4-bcb80a4c97bb)



<img width="960" alt="image" src="https://github.com/user-attachments/assets/0d18c48c-b890-4a29-8c0a-c48ef6233144">















  
  

