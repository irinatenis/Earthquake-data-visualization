# leaflet-challenge
## Goal
To vizualize the earthquake dataset for the past day from the [United States Geological Survey](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php).
## Tools
JavaScript,HTML,Leaflet
## Steps
- Used D3.js to connect to geojson API.
- Used Leaflet to create a map that plots all the earthquakes from the dataset based on their longitude and latitude.
- Customized the markers color based on the *depth* attribute.
- Customized the markers size (radius) based on the *magnitude* attribute.
- Included pop-ups that provide coordinates, depth and magnitude informatio when its associated marker is clicked.
- Created a legend that provides context for the colors on the map.
