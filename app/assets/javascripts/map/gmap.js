$(window).load(function() {
  loadScript();
});

var map;

function initialize() {
        
  var mapOptions = {
    center: new google.maps.LatLng(37.773972, -122.431297),
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.NORMAL,
    panControl: true,
    scaleControl: false,
    streetViewControl: true,
    overviewMapControl: true
  };
  // initializing map
  map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);
  
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
