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
          mapOptions = {
            zoom: 2,
          }
          lat = $('#geolocation-lat-' + i + ' input').attr('value') == false ? mapDefaults.lat : $('#geolocation-lat-' + i + ' input').attr('value');
          lng = $('#geolocation-lng-' + i + ' input').attr('value') == false ? mapDefaults.lng : $('#geolocation-lng-' + i + ' input').attr('value');
          latlng = [lat, lng];

          console.log("mapDefaults.lat:"+ mapDefaults.lat);
          console.log("lat:"+ lat);
          console.log("latlng:"+ latlng);

          $("#geolocation-map-" + i).height(200);
          var map = L.map("geolocation-map-" + i).setView(latlng, mapOptions.zoom);
          L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
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
                $('#geolocation-lat-' + i + '  input').val(e.latlng.lat);
                $('#geolocation-lng-' + i + '  input').val(e.latlng.lng);
                console.debug($('#geolocation-lat-' + i + ' input').val(), e.latlng);
              // }
            });//map.on.click

        // })
      }); // fin each
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
