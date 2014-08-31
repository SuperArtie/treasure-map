/* global google:true */
/* jshint camelcase:false */
(function(){
  'use strict';
  $(document).ready(function(){
    $('#hButton').click(addHint);
    $('form').submit(addTreasure);
  });
  function addHint(){
    var $hint = $('<input id="hint" name="hints" type="text">');
    $('#hints').append($hint);
  }
  function addTreasure(e){
    var lat = $('#lat').val();
    if(!lat){
      var name = $('#loc').val();
      geocode(name);
      e.preventDefault();
    }
  }
  function geocode(address){
      var geocoder = new google.maps.Geocoder();
   
      geocoder.geocode({address:address}, function(results, status){
        var loc  = results[0].formatted_address,
            lat  = results[0].geometry.location.lat(),
            lng  = results[0].geometry.location.lng();
        $('#loc').val(loc);
        $('#lat').val(lat);
        $('#lng').val(lng);
        $('#form').submit();
      });
  }
})();
