/**
* @file
* Javascript for Field Example.
*/
(function ($) {
  // var geocoder;
  Drupal.behaviors.geolocationLeafletMap = {
    attach: function(context, settings) {
      // Work on each map
      // console.info(JSON.stringify(Drupal.settings.geolocation));

      var fields = settings.geolocation.formatters;
      // console.info("Fields:"+JSON.stringify(fields));
      var maps = {};
      var markers = {};
      var common_map_id = "geolocation-map-";

      // Work on each map
      $.each(fields, function(instance, data) {
        var instanceSettings = data.settings;

        $.each(data.deltas, function(d, delta) {

          id = instance + "-" + d;


          $("div#" + common_map_id + id  ,context).height(instanceSettings.map_height);
          $("div#" + common_map_id + id  ,context).width(instanceSettings.map_width);

          // Only make this once ;)
          // $("#geolocation-map-" + id).once('geolocationLeaflet', function() {
          $("div#" + common_map_id + id, context).once().each( function() {

            var map_type;
            var mapOptions;

            var lat = delta.lat;
            var lng = delta.lng;

            var latlng = [lat,lng];

            mapOptions = {
              zoom : parseInt(instanceSettings.map_zoomlevel),
              center : latlng,
              scrollwheel : instanceSettings.map_scrollwheel
            };

            // Create map
            var map = L.map(common_map_id + id).setView(latlng, mapOptions.zoom);
            L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 19,
              attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);

            map.dragging.disable();
            map.touchZoom.disable();
            map.doubleClickZoom.disable();
            map.scrollWheelZoom.disable();
            map.boxZoom.disable();
            maps[id]=map;

            var marker = new L.marker(latlng,{ draggable: false});
            marker.addTo(map);
            markers[id] = marker;

          });// fin once
        });
      });


    } //atach
  }; //drupal behaviors
})(jQuery);
