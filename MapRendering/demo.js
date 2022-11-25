/**
 * Calculates and displays the address details of 200 S Mathilda Ave, Sunnyvale, CA
 * based on a free-form text
 *
 *
 * A full list of available request parameters can be found in the Geocoder API documentation.
 * see: http://developer.here.com/rest-apis/documentation/geocoder/topics/resource-geocode.html
 *
 * @param   {H.service.Platform} platform    A stub class to access HERE services
 */

 function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    console.log("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  const lat= position.coords.latitude; const lon= position.coords.longitude;
  let value=''
  //console.log(position.coords.latitude, position.coords.longitude);
  fetch('https://revgeocode.search.hereapi.com/v1/revgeocode?at='+lat+','+lon+'&lang=en-US&apiKey=SzzUhV7G1Ir3KuY01HwSptDxR6oY_urxQ5PsztU4FLI')
  .then((response) => response.json())
  .then((data) => {
    geocode(platform,data.items[0].title)

    console.log("data",data.items[0].title)
  });
  
}

 document.getElementById("myBtn").addEventListener("click", function() {
    let input = document.getElementById("Hello")
    let value = input.value
    geocode(platform,value)
  });
  document.getElementById("myBtn1").addEventListener("click", function() {
    console.log("Clicked");
    // geocode(platform,"Pune");
    getLocation();
    
  });
  const API="SzzUhV7G1Ir3KuY01HwSptDxR6oY_urxQ5PsztU4FLI"
 function geocode(platform,value) {
    
    var geocoder = platform.getSearchService(),
        geocodingParameters = {
          q: value
          
        };
  
    geocoder.geocode(
      geocodingParameters,
      onSuccess,
      onError
    );
  }
  /**
   * This function will be called once the Geocoder REST API provides a response
   * @param  {Object} result          A JSONP object representing the  location(s) found.
   *
   * see: http://developer.here.com/rest-apis/documentation/geocoder/topics/resource-type-response-geocode.html
   */
  function onSuccess(result) {
    var locations = result.items;
   /*
    * The styling of the geocoding response on the map is entirely under the developer's control.
    * A representitive styling can be found the full JS + HTML code of this example
    * in the functions below:
    */
    addLocationsToMap(locations);
    addLocationsToPanel(locations);
    // ... etc.
  }
  
  /**
   * This function will be called if a communication error occurs during the JSON-P request
   * @param  {Object} error  The error message received.
   */
  function onError(error) {
    alert('Can\'t reach the remote server');
  }
  
  /**
   * Boilerplate map initialization code starts below:
   */
  
  //Step 1: initialize communication with the platform
  // In your own code, replace variable window.apikey with your own apikey
  var platform = new H.service.Platform({
    apikey: API
  });
  var defaultLayers = platform.createDefaultLayers();
  
  //Step 2: initialize a map - this map is centered over California
  var map = new H.Map(document.getElementById('map'),
    defaultLayers.vector.normal.map,{
    center: {lat:52, lng:13},
    zoom: 15,
    pixelRatio: window.devicePixelRatio || 1
  });

  var svgMarkupH = '<svg width="24" height="24" ' +
    'xmlns="http://www.w3.org/2000/svg">' +
    '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
    'height="22" /><text x="12" y="18" font-size="12pt" ' +
    'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
    'fill="white">H</text></svg>';
    var svgMarkup = '<svg width="24" height="24" ' +
    'xmlns="http://www.w3.org/2000/svg">' +
    '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
    'height="22" /><text x="12" y="18" font-size="12pt" ' +
    'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
    'fill="white">H</text></svg>';
  // add a resize listener to make sure that the map occupies the whole container
  window.addEventListener('resize', () => map.getViewPort().resize());
  
  var locationsContainer = document.getElementById('panel');
  
  //Step 3: make the map interactive
  // MapEvents enables the event system
  // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
  var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
  
  // Create the default UI components
  var ui = H.ui.UI.createDefault(map, defaultLayers);
  
  // Hold a reference to any infobubble opened
  var bubble;
  
  /**
   * Opens/Closes a infobubble
   * @param  {H.geo.Point} position     The location on the map.
   * @param  {String} text              The contents of the infobubble.
   */
  function openBubble(position, text){
   if(!bubble){
      bubble =  new H.ui.InfoBubble(
        position,
        {content: text});
      ui.addBubble(bubble);
    } else {
      bubble.setPosition(position);
      bubble.setContent(text);
      bubble.open();
    }
  }
  
  
  /**
   * Creates a series of list items for each location found, and adds it to the panel.
   * @param {Object[]} locations An array of locations as received from the
   *                             H.service.GeocodingService
   */
  function addLocationsToPanel(locations){
  
    var nodeOL = document.createElement('ul'),
        i;
  
    nodeOL.style.fontSize = 'small';
    nodeOL.style.marginLeft ='5%';
    nodeOL.style.marginRight ='5%';
  
  
     for (i = 0;  i < 1; i += 1) {
       let location = locations[i];
       var li = document.createElement('li'),
            divLabel = document.createElement('div'),
            address = location.address,
            content =  '<strong style="font-size: large;">' + address.label  + '</strong></br>';
            position = location.position;
  
        content += '<strong>houseNumber:</strong> ' + address.houseNumber + '<br/>';
        content += '<strong>street:</strong> '  + address.street + '<br/>';
        content += '<strong>district:</strong> '  + address.district + '<br/>';
        content += '<strong>city:</strong> ' + address.city + '<br/>';
        content += '<strong>postalCode:</strong> ' + address.postalCode + '<br/>';
        content += '<strong>county:</strong> ' + address.county + '<br/>';
        content += '<strong>country:</strong> ' + address.countryName + '<br/>';
        content += '<strong>position:</strong> ' +
          Math.abs(position.lat.toFixed(4)) + ((position.lat > 0) ? 'N' : 'S') +
          ' ' + Math.abs(position.lng.toFixed(4)) + ((position.lng > 0) ? 'E' : 'W') + '<br/>';
  
        divLabel.innerHTML = content;
        li.appendChild(divLabel);
  
        nodeOL.appendChild(li);
    }
    locationsContainer.innerHTML=''
    locationsContainer.appendChild(nodeOL);
  }
  
  
  /**
   * Creates a series of H.map.Markers for each location found, and adds it to the map.
   * @param {Object[]} locations An array of locations as received from the
   *                             H.service.GeocodingService
   */
  function addLocationsToMap(locations){
    var group = new  H.map.Group(),
        position,
        i;
  
    // Add a marker for each location found
    for (i = 0;  i < 1; i += 1) {
      let location = locations[i];
      let params = {
        // "param1": "value1",
        // "param2": "value2"
        // "in":location.mapView.west.toString()+"%2C"+location.mapView.south.toString()+"%2C"+location.mapView.east.toString()+"%2C"+location.mapView.north.toString(),
        "apiKey":API
        
      };
      // console.log(location.mapView.west.toString()+"%2C"+location.mapView.south.toString()+"%2C"+location.mapView.east.toString()+"%2C"+location.mapView.north.toString())
      
      let query = Object.keys(params)
                   .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                   .join('&');
      
      let url = 'https://places.ls.hereapi.com/places/v1/discover/explore?cat=hospital-health-care-facility&in='+location.mapView.west.toString()+"%2C"+location.mapView.south.toString()+"%2C"+location.mapView.east.toString()+"%2C"+location.mapView.north.toString()+ "&"+query;
      // // let url='https://places.ls.hereapi.com/places/v1/discover/here?at='+location.position.lat+'%2C'+location.position.lng+'&'+query;
      // console.log(location.position)
      // var X=""
      fetch(url)
        .then(data => data.text())
        .then((text) => {
          // const L=JSON.stringify(text)
      const X=JSON.parse(text)
          // console.log('request succeeded with JSON response',X.results.items)
          // if(X.results && X.results.items>0){
            if(X && X.results && X.results.items){
              console.log("X",X);
          var Arr=X.results.items;
        for(j=0;j<Arr.length;j+=1){
          group.addEventListener('tap', function (evt) {
            map.setCenter(evt.target.getGeometry());
            openBubble(
               evt.target.getGeometry(), evt.target.label);
          }, false);
        
          // Add the locations group to the map
          map.addObject(group);
          // map.setCenter(group.getBoundingBox().getCenter());
          var icon = new H.map.Icon(svgMarkupH),
          coords = {lat: Arr[j].position[0], lng: Arr[j].position[1]},
          marker = new H.map.Marker(coords, {icon: icon});
          group.addObject(marker);
      
      // // Add the marker to the map and center the map at the location of the marker:
        // map.addObject(marker);}
        }
        }
        map.addObject(group);
          marker = new H.map.Marker(location.position);
      console.log(location.mapView);
      marker.label = location.address.label;
      group.addObject(marker);
  map.addObject(group);
  map.setCenter(location.position);
  console.log("Bounding box",group.getBoundingBox().getCenter());
  console.log("Marker",location.position)
      }).catch(function (error) {
          console.log('request failed', error)
        });
      //   marker = new H.map.Marker(location.position);
      // console.log(location.mapView);
      // marker.label = location.address.label;
      // group.addObject(marker);
        
      // var query=''
      // console.log(request);
      // console.log(query)
      
    }
  
    
  // map.setCenter(coords);  
  // map.addObject(group);
  // map.setCenter(group.getBoundingBox().getCenter());
  }
  
  // Now use the map as required...

  // function getLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(showPosition);
  //   } else { 
  //     x.innerHTML = "Geolocation is not supported by this browser.";
  //   }
  // }

  // function showPosition(position) {
  //  var lat=position.coords.latitude;
  //   var lng=position.coords.longitude;
  //   let params = {
  //     // "param1": "value1",
  //     // "param2": "value2"
  //     // "in":location.mapView.west.toString()+"%2C"+location.mapView.south.toString()+"%2C"+location.mapView.east.toString()+"%2C"+location.mapView.north.toString(),
  //     "apiKey":API
      
  //   };
  //   // console.log(location.mapView.west.toString()+"%2C"+location.mapView.south.toString()+"%2C"+location.mapView.east.toString()+"%2C"+location.mapView.north.toString())
    
  //   let query = Object.keys(params)
  //                .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
  //                .join('&');
    
  //   let url1 = 'https://revgeocode.search.hereapi.com/v1/revgeocode?at='+lat+"%2C"+lng+'&lang=en-US&apiKey='+API;
  //   // let url='https://places.ls.hereapi.com/places/v1/discover/here?at='+location.position.lat+'%2C'+location.position.lng+'&'+query;
  //   console.log(location.position)
  //   // var X=""
  //   fetch(url1)
  //     .then(data => data.text())
  //     .then((text) => {
  //       // const L=JSON.stringify(text)
  //   const X=JSON.parse(text)
  //       // console.log('request succeeded with JSON response',X.results.items)
  //       // if(X.results && X.results.items>0){
  //         console.log(text);
          
  //     }).catch(function (error) {
  //       console.log('request failed', error)
  //     });
  //     geocode(platform,"Pune");
  // }
  // // geoLocation();
  geocode(platform,"Pune");