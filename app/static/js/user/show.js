/* jshint camelcase: false */
/* global google:true */
(function(){
  'use strict';
  var map;
  $(document).ready(function(){
    var lat  = $('#id').attr('data-lat'),
        lng  = $('#id').attr('data-lng'),
        name = $('#id').attr('data-name');
    console.log(lat, lng, name);
    initMap(lat, lng, 9);
    addMarker(lat, lng, name);
  });
  function initMap(lat, lng, zoom){
    var styles      = [{'featureType':'water','stylers':[{'color':'#46bcec'},{'visibility':'on'}]},{'featureType':'landscape','stylers':[{'color':'#f2f2f2'}]},{'featureType':'road','stylers':[{'saturation':-100},{'lightness':45}]},{'featureType':'road.highway','stylers':[{'visibility':'simplified'}]},{'featureType':'road.arterial','elementType':'labels.icon','stylers':[{'visibility':'off'}]},{'featureType':'administrative','elementType':'labels.text.fill','stylers':[{'color':'#444444'}]},{'featureType':'transit','stylers':[{'visibility':'off'}]},{'featureType':'poi','stylers':[{'visibility':'off'}]}],
        mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP, styles:styles};
    map = new google.maps.Map(document.getElementById('map2'), mapOptions);
  }
  function addMarker(lat, lng, name){
      var latLng = new google.maps.LatLng(lat, lng);
      new google.maps.Marker({map: map, position: latLng, title: name, animation: google.maps.Animation.DROP, icon: 'http://cdn.iconsmash.com/Content/icons/Simpsons-Springfield-V09/iconpreviews/32/Older%20Homer.png'});
  }
})();
