function createMap (a) {
  // Create the tile layer that will be the background of our map.
  var Esri_OceanBasemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Create a baseMaps object to hold the world map layer.
  let baseMaps = {
  "World Map": Esri_OceanBasemap
};

  // Create an overlayMaps object to hold the bikeStations layer.
  let overlayMaps = {
    "Earthquakes": a
  }
// Create the map object with options.
  let map = L.map("map", {
    center: [40.73, -74.0059],
    zoom: 1,
    layers: [Esri_OceanBasemap, a]
});
// Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(map);
}
function createMarkers(response) {
// Pull the "features" property from response.data.
  let features = response.features;
// Initialize an array to hold earthquake  markers.
  let earthquakeMarkers = [];
//Loop through the features data
  for (let index = 0; index < features.length; index++) {
    let feature = features[index];
  //   console.log(feature.geometry["coordinates"]
  // [1]);
 // For each station, create a marker, and bind a popup with the station's name.   
    let earthquakeMarker = L.marker([feature.geometry["coordinates"][1],
    feature.geometry["coordinates"][0]]);
  
    
 // Add the marker to the bikeMarkers array.
  earthquakeMarkers.push(earthquakeMarker);
}
// Create a layer group that's made from the bike markers array, and pass it to the createMap function.
createMap(L.layerGroup(earthquakeMarkers));
}

// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson").then(createMarkers);
   

// let importedData=data;
//     console.log(importedData);
//     createMarkers (importedData);
//     // console.log(importedData.features[0].geometry.coordinates[0]);   
// })
// function createMap (a) {
//  // Create the tile layer that will be the background of our map.
//  let Esri_WorldTopoMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
// 	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
// })
// // Create a baseMaps object to hold the streetmap layer.
// let baseMaps = {
//     "World Map": Esri_WorldTopoMap
// };
//   // Create an overlayMaps object to hold the bikeStations layer.
// let overlayMaps = {
//     "Earthquakes": a
//   }
//   // Create the map object with options.
// let map = L.map("map", {
//     center: [40.73, -74.0059],
//     zoom: 1,
//     layers: [Esri_WorldTopoMap, a]
//   });
//   // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
//   L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
//   }).addTo(map);
// }
// function createMarkers(importedData) {
//     //Pull the "earthquakes" geography from data.
//     // let earthquakes = importedData.features;
//     // console.log(earthquakes);
   
//     // Initialize an array to hold earthquake  markers.
//     let earthquakeMarkers = []
//   //Loop through the data
//         for (let index = 0; index < importedData.length; index++) {
//             console.log(index);
//             // let earthquakesMagnitude = importedData.features[index].properties["mag"];
//             // console.log(earthquakesMagnitude);
//             // let iconOptions = {
//             //     iconSize:earthquakesMagnitude,
//             //     // fillColor = ~colorBin('RdBu',WATER_LAND_RATIO)
//             // };
//             // //Creating a custon icon
//             // var customIcon = L.icon(iconOptions);
        
//             // let markerOptions={
//             //     clickable: true,
//             //     draggable: true,
//             //     icon:customIcon
//             // };
    
//             let earthquakeMarker = L.marker([importedData.features[index].geometry.coordinates[0],
//                 importedData.features[index].geometry.coordinates[0]])
//         // .bindPopup("<h3>" + station.name + "<h3><h3>Capacity: " + station.capacity + "</h3>");
//         ;
//          // Add the marker to the bikeMarkers array.
//             earthquakeMarkers.push(earthquakeMarker);
// }
//     // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
//   createMap(L.layerGroup(earthquakeMarkers));
// }
//     //  // Initialize an array to hold earthquake markers.
//     // let earthquakeMarkers = [];
//     // //Loop through earthquake array
//     // for (let index = 0; index < importedData.length; index++) {
//     //     let earthquakesG = importedData.features[index]["geometry"];
      
// //     // Add the marker to the bikeMarkers array.
// //     bikeMarkers.push(bikeMarker);
// //     }

