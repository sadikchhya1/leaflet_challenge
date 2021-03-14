// // Storing  url 
// var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// // Perform a GET request to the query URL

// d3.json(queryUrl, function(data) {
//   // console.log(data)
//   createFeatures(data.features);
// });

// function createFeatures(earthquakeData) {
//   console.log(earthquakeData)
// }

// // Define a function we want to run once for each feature in the features array
//   // Give each feature a popup describing the place and time of the earthquake
//   function onEachFeature(feature, layer) {
//     layer.bindPopup("<h3>location:" + feature.properties.place +
//       "</h3><hr><p>Date: " + new Date(feature.properties.time) + "</p><hr><p>Magnitude: " + feature.properties.mag + "</p>");
      
// // creating tile layer 
// var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//     tileSize: 512,
//     maxZoom: 18,
//     zoomOffset: -1,
//     id: "mapbox/streets-v11",
//     accessToken: API_KEY
//   });

//     // Create our map, giving it the streetmap and earthquakes layers to display on load
//   var myMap = L.map("map", {
//     center: [
//       37.09, -95.71
//     ],
//     zoom: 5,
//   });

//   streetmap.addTo(myMap);

// function markerSiza(mag){
//   return mag * 4
// };
  
//   }

// // // Create a GeoJSON layer containing the features array on the earthquakeData object
  
// var earthquakes = L.geoJSON(data, {
//   pointToLayer: function(feature, latlng) {
//     return new L.circleMarker(latlng, {
//       fillOpacity: 0.75,
//       radius: markerSize(feature.properties.mag)
//     })

//     // define map layers 

//   //   var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   //   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//   //   maxZoom: 18,
//   //   id: "dark-v10",
//   //   accessToken: API_KEY
//   // });

//   //   var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   //   attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//   //   tileSize: 512,
//   //   maxZoom: 18,
//   //   zoomOffset: -1,
//   //   id: "mapbox/streets-v11",
//   //   accessToken: API_KEY
//   // });

//   // // Define a baseMaps object to hold our base layers
//   // var baseMaps = {
//   // "Street Map": streetmap,
//   // "Dark Map": darkmap

//   // Create overlay object to hold our overlay layer
//   // var overlayMaps = {
//   //   Earthquakes: earthquakes
//   // };
//   // Create our map, giving it the streetmap and earthquakes layers to display on load
//   //   var myMap = L.map("map", {
//   //     center: [
//   //     37.09, -95.71
//   //   ],
//   //   zoom: 5,
//   //   layers: [streetmap, earthquakes]
//   // });

// // }

// // adding legends
// //   }
// // }

// }

// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

function markerSize(mag) {
  return mag * 4

};

function createFeatures(earthquakeData) {
 console.log(earthquakeData)
  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>Date: " + new Date(feature.properties.time) + "</p><hr><p>Magnitude: " + feature.properties.mag + "</p>");
  }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  });

  function markerColor(mag) {
    if (mag<= 1) {
        return "#00ccbc";
    } 
    else if (mag<= 2) {
        return "#90eb9d";
    } 
    else if (mag <= 3) {
        return "#FFFF00";
    } 
    else if (mag <= 4) {
        return "#ffd700";
    } 
    else if (mag<= 5) {
        return "#FFA500";
    } 
    else {
        return "#f29e2e";
    };
  }

  function getRadius(mag) {
    if (mag === 0){
      return 1;
    
    }
    return mag *4;
  }


  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}
