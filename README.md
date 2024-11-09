## TRAFFIC CONGESTION VISUALIZATION USING H3-SPATIAL INDEXING

## DESCRIPTION

This project is an interactive traffic congestion visualization system designed for **Coimbatore**, India, utilizing advanced geospatial tools such as **H3 hexagonal grids**, **Deck.gl** , **MapTiler**, and **React**. The application displays traffic congestion levels through a web-based map interface, offering users insights a traffic data.The visualization process begins by parsing **CSV** data containing traffic congestion information, including latitude, longitude, count and congestion levels. This data is then transformed into H3 hexagonal grid cells using the H3 spatial indexing system, allowing the traffic data to be displayed in a granular, hexagonal format. 

The congestion levels are color-coded to provide intuitive visual representation on the map.The map is rendered using **React** , **Deck.gl** , and StaticMap components. Deck.gl is responsible for rendering the H3HexagonLayer, which visually represents the hexagonal grid and its associated congestion levels, with elevation and color variations. Users can **hover** over any hexagon on the map to view detailed information, including latitude, longitude, congestion count, and the congestion level.This project offers a detailed, interactive view of traffic congestion in Coimbatore, helping to monitor traffic density, analyze trends, and inform urban planning decisions for improved mobility.

## FEATURES

