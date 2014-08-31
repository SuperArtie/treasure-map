/* global google:true */
/* jshint camelcase:false */
(function(){
  'use strict';
  var map,
      directionsDisplay = new window.google.maps.DirectionsRenderer(),
      directionsService = new google.maps.DirectionsService();
  $(document).ready(function(){
    debugger;
    initMap(0, 0, 2);
    var positions = getPositions();
    positions.forEach(function(pos){
      addMarker(pos.lat, pos.lng, pos.name);
    });
    calcRoute(positions, directionsService, directionsDisplay);
    google.maps.event.addDomListener(window, 'load', initMap);
  });
  function getPositions(){
    var positions = $('table tbody tr').toArray().map(function(tr){
      var name = $(tr).attr('data-name'),
          lat  = $(tr).attr('data-lat'),
          lng  = $(tr).attr('data-lng'),
          pos  = {name:name, lat:parseFloat(lat), lng:parseFloat(lng)};
      return pos;
    });
    return positions;
  }
  function initMap(lat, lng, zoom){
    var styles      = [{'featureType':'water','stylers':[{'color':'#46bcec'},{'visibility':'on'}]},{'featureType':'landscape','stylers':[{'color':'#f2f2f2'}]},{'featureType':'road','stylers':[{'saturation':-100},{'lightness':45}]},{'featureType':'road.highway','stylers':[{'visibility':'simplified'}]},{'featureType':'road.arterial','elementType':'labels.icon','stylers':[{'visibility':'off'}]},{'featureType':'administrative','elementType':'labels.text.fill','stylers':[{'color':'#444444'}]},{'featureType':'transit','stylers':[{'visibility':'off'}]},{'featureType':'poi','stylers':[{'visibility':'off'}]}],
         mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP, styles:styles};
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    directionsDisplay.setMap(map);
  }
  function addMarker(lat, lng, name){
      var latLng = new google.maps.LatLng(lat, lng);
      new google.maps.Marker({map: map, position: latLng, title: name, animation: google.maps.Animation.DROP, icon: 'http://cdn.iconsmash.com/Content/icons/Simpsons-Springfield-V09/iconpreviews/32/Older%20Homer.png'});
  }
  function calcRoute(positions, directionsService, directionsDisplay){
    var waypts = [];
    for(var i = 0; i < positions.length; i++){
      waypts.push( { 
        location: new window.google.maps.LatLng(positions[i].lat, positions[i].lng),
        stopover: true
      } );
    }
    var start = waypts[0].location,
        end   = waypts[waypts.length-1].location;
    waypts.splice(0, 1);
    waypts.splice(waypts.length - 1, 1);
    var request = {
      origin: start,
      destination: end,
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        var route = response.routes[0];
        var summaryPanel = document.getElementById('directions_panel');
        summaryPanel.innerHTML = '';
        // For each route, display summary information.
        for (var i = 0; i < route.legs.length; i++) {
          var routeSegment = i + 1;
          summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment + '</b><br>';
          summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
          summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
          summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
        }
      }
    });
  }
})();
