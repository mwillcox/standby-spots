$(window).load(function() {
  loadScript();
});

var map;
var markers = new Array();
var markers_array=[];

function initialize() { 
  var bounds = new google.maps.LatLngBounds();
  var mapOptions = {
      mapTypeId: google.maps.MapTypeId.NORMAL,
      center: new google.maps.LatLng(37.773972, -122.431297),
      zoom:12,
      mapTypeControl: false,
      streetViewControl: false,
      panControl: false,
      zoomControlOptions: {
          position: google.maps.ControlPosition.LEFT_BOTTOM
      }
      
  };
  map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);

  var infoWindowContent=[];
  $.each(spots, function(index) { 
    markers_array.push([spots[index]['name'], spots[index]['latitude'],spots[index]['longitude']]);
    infoWindowContent.push(['<div class="info_content" >' +
    '<h3>'+spots[index]['name']+'</h3>'+
    '<p>'+spots[index]['description']+'</p>' +       
     '</div>']);
  });   

  // Display multiple markers on a map
  var infowindow = new google.maps.InfoWindow({maxWidth: 160}), marker, i;       
  // Loop through our array of markers & place each one on the map  
  for( i = 0; i < markers_array.length; i++ ) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(markers_array[i][1], markers_array[i][2]),
      map: map,
      title: markers_array[i][0]
    });

    markers.push(marker);

    google.maps.event.addListener(marker, 'mouseover', (function (marker, i) {

        return function () {
            infowindow.setContent(markers_array[i][0]);
            infowindow.open(map, marker);
            //map.setZoom(9);
            //map.setCenter(marker.getPosition());  
        }
    })(marker, i));

    google.maps.event.addListener(marker, 'click', (function (marker, i) {

        return function () {
            infowindow.setContent(infoWindowContent[i][0]);
            infowindow.open(map, marker);
            map.setZoom(16);
            map.setCenter(marker.getPosition());
        }
    })(marker, i));
  }
};

function triggerClick(i) {
  console.log('i: ' + i + " markers: " + markers[i]);
  google.maps.event.trigger(markers[i], "click");
}

function loadScript() {
  console.log("map loading ...");
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp' +
    '&key=AIzaSyDSR95TnB4HazUhCXzmZ_5EMeK2MYe_gxg'+
    '&libraries=drawing'+
    '&callback=initialize';
  document.body.appendChild(script);
}
