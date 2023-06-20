//Create FUNCTION "createMap"
function createMap (a) {
  // Create the tile layer that will be the background of our map.
    var OpenStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  // Create a baseMaps object to hold the world map layer.
    let baseMaps = {
      "World Map": OpenStreetMap
  };

  // Create an overlayMaps object to hold the earthquakes layer.
    let overlayMaps = {
      "Earthquakes": a
  };

  // Create the map object with options.
    let map = L.map("map", {
      center: [39.0522, -110.2437],
      zoom: 3,
      layers: [OpenStreetMap, a]
  });
  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
      }).addTo(map);createLegend(map)
};
//Create FUNCTION "createMarkers"
  function createMarkers(response) {
  // Pull the "features" property from response.data.
    let features = response.features;
  
  // Initialize an array to hold earthquake  markers.
    let earthquakeMarkers = [];
  //Loop through the features data
    for (let index = 0; index < features.length; index++) {
      let feature = features[index];

  //For each earthquake, create a marker colored by earthquake depth.
      let earthquakeMarker =L.circle([feature.geometry["coordinates"][1],
      feature.geometry["coordinates"][0]],{
        color: "black",
        weight:0.1,
        fillColor: chooseColor(feature.geometry["coordinates"][2]),
        fillOpacity: 1,
        radius: circleSize(feature.properties.mag)
        }).bindPopup("<p <h3> Longitude: </h3>" + feature.geometry["coordinates"][0] + "<br><p <h3> Latitude: </h3>"+ feature.geometry["coordinates"][1]+
        "<br><p <h3>Magnitude: </h3>" + feature.properties.mag + "<br><p <h3>Depth: </h3>" + feature.geometry["coordinates"][2],{
          maxWidth:500
        });
    
  // Add the marker to the earthquakes array.
    earthquakeMarkers.push(earthquakeMarker)
    }

  //Create a FUNCTION to assign colors to ranges of earthquake depth.
    function chooseColor (depth) {
        if (depth >= 90) return "#FF5F65";
        else if (depth >= 70 && depth<= 90) return "#FCA35D";
        else if (depth >= 50 && depth<= 70) return "#fdb72a";
        else if (depth >= 30 && depth<= 50) return "#F7DB11";
        else if (depth >= 10 && depth<= 30) return "#DCF400";
        else if (depth >= -10 && depth<= 10) return "#A4F600";
    }
  //Create a FUNCTION to determine cirlce size.
    function circleSize(mag) {
      return mag * 50000;
    };

  // Create a layer group that's made from the earthquake markers array, and pass it to the createMap function.
    createMap(L.layerGroup(earthquakeMarkers));
    };
// Perform an API call  to get the earthquake information. Call createMarkers when it completes.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson").then(createMarkers);

//Create legend
function createLegend (map) {
  // Set up the legend.
    let legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
      let div = L.DomUtil.create("div", "info legend");
      let limits = ["-10-10", "10-30", "30-50", "50-70", "70-90", "90+"];
      let colors = ["#A3F600", "#DCF400", "#F7DB11", "#fdb72a", "#FCA35D","#FF5F65"] ;
      let labels = [];

    // Create label for each range of earthquake depth.
    limits.forEach(function(limit, index) {
      labels.push("<tr><td style='width:5px;height:5px;background-color: " + colors[index] + "'></td><td><div style='font-size:8px'>"+limit+"</td></tr>");
    });

    div.innerHTML += "<table style='width: 100%;height:100px'>" + labels.join("") + "</table>";
    return div;
  };

  // Adding the legend to the map
  legend.addTo(map);
};

