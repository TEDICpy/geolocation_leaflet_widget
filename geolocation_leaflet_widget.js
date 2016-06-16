/**
* @file
* Javascript for Field Example.
*/
(function ($) {
  // var geocoder;
  var lat, lng, latlng;
  Drupal.behaviors.geolocationLeaflet = {
    attach: function(context, settings) {
      // Work on each map

      $.each(Drupal.settings.geolocation.defaults, function(i, mapDefaults) {
        // $("#geolocation-map-" + i).once('defaults', function(){
          // Set map options
          mapOptions = Drupal.settings.geolocation.settings;
          lat = $('#geolocation-lat-' + i + ' input', context).attr('value') == false ? mapDefaults.lat : $('#geolocation-lat-' + i + ' input').attr('value');
          lng = $('#geolocation-lng-' + i + ' input', context).attr('value') == false ? mapDefaults.lng : $('#geolocation-lng-' + i + ' input').attr('value');
          latlng = [lat, lng];


          $("#geolocation-map-" + i, context).height(mapOptions.map_height);
          var map = L.map("geolocation-map-" + i).setView(latlng, mapOptions.zoom);
		var southWest = L.latLng(-25.36698451622012, -57.676849365234375),
            	northEast = L.latLng(-25.224820176765036, -57.51960754394531);
map.setMaxBounds([southWest, northEast]);

          L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          }).addTo(map);

            var marker;
            marker = new L.marker(latlng,{ draggable: true});
            marker.addTo(map);
            map.on('click', function(e) {
              // if(typeof(new_event_marker)==='undefined'){
              //   // new_event_marker = new L.marker(e.latlng,{ draggable: true});
              // }
              // else {
                // console.debug('cambiando el marker para' + e.latlng);
                // console.debug('#geolocation-lat-' + i + '  input');
                // console.debug('#geolocation-lat-' + i + ' > input');
                marker.setLatLng(e.latlng);
                $('#geolocation-lat-' + i + '  input', context).val(e.latlng.lat);
                $('#geolocation-lng-' + i + '  input', context).val(e.latlng.lng);
                // console.debug($('#geolocation-lat-' + i + ' input').val(), e.latlng);
              // }
            });//map.on.click

        // })
      }); // fin each
    } //atach
  }; //drupal behaviors
})(jQuery);
