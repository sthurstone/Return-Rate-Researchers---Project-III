<!DOCTYPE html>
<html>
<head>
    <title>Hotel Maps</title>
    
  <!-- D3 library -->
  <script src="https://d3js.org/d3.v5.min.js"></script>

  <!-- Leaflet JavaScript code -->
  <script src="https://unpkg.com/leaflet@1.3.3/dist/leaflet.js"
  integrity="sha512-tAGcCfR4Sc5ZP5ZoVz0quoZDYX5aCtEm/eu1KhSLj2c9eFrylXZknQYmxUssFaVJKvvc0dJQixhGjG2yXWiV9Q=="
  crossorigin=""></script>

  <!-- Leaflet CSS -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.3/dist/leaflet.css"
  integrity="sha512-Rksm5RenBEKSKFjgI3a41vrjkw4EVPlJ3+OiI65vTjIdo9brlAacEuKOiQ5OFh7cOI1bkDwLqdLw3Zg0cRJAAQ=="
  crossorigin=""/>

      <!-- Our JavaScript file -->
    <script src='smaller hotel.js'></script>
    
  <!-- Our CSS -->
  <link rel="stylesheet" type="text/css" href="style.css">
</head>

<body>


    <div id="map"></div>

    <script type="text/javascript">
    

    // SET UP THE BACKGROUND MAP
    
    // create the Leaflet map container
    var map = L.map('map');
    
    //add tile layer basemap to the map
    basemapUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    basemapAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    basemapProperties = {minZoom: 3, maxZoom: 16, continuousWorld: false, noWrap: true, attribution: basemapAttribution};
    var basemap = L.tileLayer(basemapUrl, basemapProperties);
    map.addLayer(basemap);

  
    // 1. CREATE OVERLAY 
    
    var overlayStylesOpen = {
        radius: 3,
        fillColor: '#005ec9', fillOpacity: 0.8, // fill styles
        color: 'black', opacity: 0.5, weight: 1 // border styles
    };
    
    // specify how to load the individual features 
    var overlayOptions = { 
        onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.Name + '<br />' + 
                            feature.properties.Address + '<br />' + 
                            feature.properties.City + '<br />' + 
                            feature.properties.State + '<br />' + 
                            feature.properties["Postal Code"] + '<br />' + 
                            feature.properties["Review Rating"] + '<br />' + 
                            feature.properties.websites);
                        },
        pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, overlayStylesOpen);
        }
    };
    
    // create the layer and add to map
    var overlay = L.geoJson(dataset, overlayOptions); 
    map.addLayer(overlay);
    
    // fit the map window to the data points
    map.fitBounds(overlay.getBounds());

    </script>
</body>
</html>