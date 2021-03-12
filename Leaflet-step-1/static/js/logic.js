// creating base map from
var myMap = L.map("map", {
    center: [ 37.09, -95.71],
      zoom: 5,
    //   layers: [streetmap, earthquakes]
   
});
                                                                                                                                                                                                                                        
// Adding tile layer to the map
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// query url 
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"



d3.json(url,function(data) {
  createFeatures(data.features);
    console.log(data.features);
    createFeatures(data.features);
});

function createFeatures(earthquakeData) {

//       // Define a function we want to run once for each feature in the features array
//       // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>") +"<p> Magnitude:" + feature.properties.mag + "</p>"};

  }
  function markersize(magnitude) {
    return magnitude *2000;
  }

  function markerColor(magnitude) {
    if (magnitude<= 1) {
        return "#00ccbc";
    } 
    else if (magnitude <= 2) {
        return "#90eb9d";
    } 
    else if (magnitude <= 3) {
        return "#FFFF00";
    } 
    else if (magnitude <= 4) {
        return "#ffd700";
    } 
    else if (magnitude <= 5) {
        return "#FFA500";
    } 
    else {
        return "#f29e2e";
    };
  }

  var earthquakes = L.geoJson(earthquakeData, {
    pointToLayer: function(earthquakeData, latlng) {
        return new L.circle(latlng, {
          radius: markerSize(feature.properties.magnitude),
          fillColor: markerColor(feature.properties.magnitude),
          fillOpacity:1,
          stroke: false,

   });
    },
    onEachfeature: onEachFeature
  });
    createMap(earthquakes);
    

    
// // Loop through data
//   var earthquakes = data.features
//   for (var i = 0; i < earthquakes.length; i++) {
    
//   // Set the data location property to a variable
//   // var location = data[i].location;
//   var quake = earthquakes[i]
//   var magnitude= quake.properties.mag
//   var Coordinates=quake.geometry.coordinates
//   var place = quake.properties.place
//   var time = quake.properties.time
// }

//   }
// };