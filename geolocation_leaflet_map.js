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
        // console.info("settings:"+JSON.stringify(instanceSettings));

        $.each(data.deltas, function(d, delta) {

          id = instance + "-" + d;
          console.info("delta!:"+JSON.stringify(delta));


          $("div#" + common_map_id + id  ,context).height(instanceSettings.map_height);
          $("div#" + common_map_id + id  ,context).width(instanceSettings.map_width);

          // Only make this once ;)
          // $("#geolocation-map-" + id).once('geolocationLeaflet', function() {
          console.log("Atach to: " + common_map_id + id);
          $("div#" + common_map_id + id, context).once().each( function() {

            var map_type;
            var mapOptions;

            var lat = delta.lat;
            var lng = delta.lng;

            var latlng = [lat,lng];
            // var latLng = new google.maps.LatLng(lat, lng);

            mapOptions = {
              zoom : parseInt(instanceSettings.map_zoomlevel),
              center : latlng,
              scrollwheel : instanceSettings.map_scrollwheel
            };
            console.log("lat:" + lat + " lng:" + lng + " latlng:" + latlng);

            // Create map
            // Drupal.geolocationGooglemaps.maps[id] = new google.maps.Map(this, mapOptions);
            var map = L.map(common_map_id + id).setView(latlng, mapOptions.zoom);
            L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
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

      // var map = L.map("geolocation-map-" + id).setView(latlng, 6);
      // L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      //   maxZoom: 19,
      //   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      // }).addTo(map);

      // map.dragging.disable();
      // map.touchZoom.disable();
      // map.doubleClickZoom.disable();
      // map.scrollWheelZoom.disable();
      // map.boxZoom.disable();
      // var new_event_marker = new L.marker(latlng,{ draggable: false});
      // new_event_marker.addTo(map);

    } //atach
  }; //drupal behaviors
})(jQuery);


// /**
//  * Provides a farbtastic colorpicker for the fancier widget.
//  */
// (function ($) {
//   Drupal.behaviors.field_example_colorpicker = {
//     attach: function(context) {
//       $(".edit-field-example-colorpicker").live("focus", function(event) {
//         var edit_field = this;
//         var picker = $(this).closest('div').parent().find(".field-example-colorpicker");
//
//         // Hide all color pickers except this one.
//         $(".field-example-colorpicker").hide();
//         $(picker).show();
//         $.farbtastic(picker, function(color) {
//           edit_field.value = color;
//         }).setColor(edit_field.value);
//       });
//     }
//   }
// })(jQuery);
