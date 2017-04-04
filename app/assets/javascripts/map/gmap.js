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
      //Allows single and double finger drag
      gestureHandling: 'greedy'
  };
  map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);
  //Builds the content for the marker's info window
  var infoWindowContent=[];
  $.each(spots, function(index) { 
    htmlString = '';
    var name = spots[index]['name'];
    var type = spots[index]['park_type'];
    var descrip = spots[index]['description'];
    var address = spots[index]['address'];
    if (descrip == null)
      htmlString = ['<div class="info_content" >' +
    '<p><b>'+ name +'</b></p>'+
    '<p><b>Type</b>: '+ type +'</p>' +
    '<p><b>Address</b>: '+ address +'</p>' +       
     '</div>'];
    else
      htmlString = ['<div class="info_content" >' +
    '<p><b>'+ name +'</b></p>'+
    '<p><b>Type</b>: '+ type +'</p>' +
    '<p><b>Description</b>: '+ descrip +'</p>' +       
     '</div>'];
    markers_array.push([spots[index]['name'], spots[index]['latitude'],spots[index]['longitude']]);
    infoWindowContent.push(htmlString);
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
    //Removing this for now.
    // google.maps.event.addListener(marker, 'mouseover', (function (marker, i) {
    //     return function () {
    //         infowindow.setContent(markers_array[i][0]);
    //         infowindow.open(map, marker);
    //     }
    // })(marker, i));

    //Zooms in on click
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

//Not used at the moment, might re-implement again
function triggerClick(i) {
  google.maps.event.trigger(markers[i], "click");
}

//Adding google API script tag
function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp' +
    '&key=AIzaSyDSR95TnB4HazUhCXzmZ_5EMeK2MYe_gxg'+
    '&libraries=drawing'+
    '&callback=initialize';
  document.body.appendChild(script);
}
