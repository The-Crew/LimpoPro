/*jslint sloppy:true, browser:true, devel:true, white:true, vars:true, eqeq:true, nomen:true, unparam:true */
/*global intel, google, Marker, device 

var _map = null;
var _seconds = 30;
var _llbounds = null;
var myLatLng;
var oldLatLng = "";
var boolTripTrack = true; */
//Create the google Maps and LatLng object 

/*function drawMap() {
    //Creates a new google maps object
    var latlng = new google.maps.LatLng(currentLatitude, currentLongitude);
    myLatLng = latlng;
    var mapOptions = {
        center: latlng,
        zoom: 5,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL,
            position: google.maps.ControlPosition.LEFT_TOP
        }
    };
    if (boolTripTrack === true) {
        if(google.maps){
            _map = new google.maps.Map(document.getElementById("map"), mapOptions);
        }
        
        else {
            alert("Unable to display map.");
        }
    }
} 
//40.7655,-73.97204 = NYC
var currentLatitude = "-8.1048084";
var currentLongitude = "-35.0221423";
var options = {
    timeout: 10000,
    maximumAge: 11000,
    enableHighAccuracy: true
};
//Success callback
var suc = function(p) {
        console.log("geolocation success", 4);
        //Draws the map initially
        if (_map === null) {
            currentLatitude = p.coords.latitude;
            currentLongitude = p.coords.longitude;
            drawMap();
        } else {
            myLatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
        }
        //Creates a new google maps marker object for using with the pins
        if ((myLatLng.toString().localeCompare(oldLatLng.toString())) !== 0) {
            //Create a new map marker
            var Marker = new google.maps.Marker({
                position: myLatLng,
                map: _map
            });
            if (_llbounds === null) {
                //Create the rectangle in geographical coordinates
                _llbounds = new google.maps.LatLngBounds(new google.maps.LatLng(p.coords.latitude, p.coords.longitude)); //original
            } else {
                //Extends geographical coordinates rectangle to cover current position
                _llbounds.extend(myLatLng);
            }
            //Sets the viewport to contain the given bounds & triggers the "zoom_changed" event
            _map.fitBounds(_llbounds);
        }
        oldLatLng = myLatLng;
    };
var fail = function() {
        console.log("Geolocation failed. \nPlease enable GPS in Settings.", 1);
    };
var getLocation = function() {
        console.log("in getLocation", 4);
    };
    //Execute when the DOM loads  
    */

    /*
 var onSuccess = function(position) {
        alert('Latitude: '          + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n' +
              'Altitude: '          + position.coords.altitude          + '\n' +
              'Accuracy: '          + position.coords.accuracy          + '\n' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
              'Heading: '           + position.coords.heading           + '\n' +
              'Speed: '             + position.coords.speed             + '\n' +
              'Timestamp: '         + position.timestamp                + '\n');
    };
 
    // onError Callback receives a PositionError object 
    // 
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }
 
    Navegador.Geolocalização.GetCurrentPosition (onSuccess, onError); */

    //document.addEventListener("deviceready", onDeviceReady, false);
var map;
 
 //--------------------------------------------------------------------------------------------
function onDeviceReady() {
    try {
        if (navigator.geolocation !== null) {
            document.getElementById("map").style.height = screen.height + "px";
            watchMapPosition();
        }
        else {
            alert("navigator.geolocation == null")
        }
    } catch (e) {
        alert(e.message);
    }

    try {
        //hide splash screen
        navigator.splashscreen.hide(); 
    } catch (e) {}
}

document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        console.log("navigator.geolocation works well");
    }

function ativarGps(){
    view.popup({
            titulo:'Limpo', 
            texto:'<div class="container-fluid"><h3>Ative os Serviços de localização</h3><blockquote><p>Ativar GPS</p><footer>Ao continuar, você permite que este app e o google utilizem suas informações de acordo com os respectivos termos de serviço e políticas de  privacidade</footer></blockquote></div>'
            },'confirm', ()=>{getMapLocation()})
}
  
var Latitude = undefined;
var Longitude = undefined;
//  Obter coordenadas geográficas 
function getMapLocation() {
    
   navigator.geolocation.getCurrentPosition(onMapSuccess, onMapError, {enableHighAccuracy: true});
}
//  retorno de Success callback para obter coordenadas geográficas 
var onMapSuccess = function (position) {
 
    console.log("Chamando onMapSucess");

    Latitude = position.coords.latitude;
    Longitude = position.coords.longitude;
    // Latitude = -8.162509585392284;
    // Longitude = -34.9159402525394;  
    getMap(Latitude, Longitude);
}
 
//  Obter mapa usando coordenadas 
var directionsService ;
var directionsDisplay;
var latLong;

function getMap(latitude, longitude) {
    
        directionsService = new google.maps.DirectionsService;
        directionsDisplay = new google.maps.DirectionsRenderer;

        var marker = new google.maps.Marker({ position: latLong });
        latLong = new google.maps.LatLng(latitude, longitude);

        var map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(latitude, longitude),
        zoom: 10,
        //mapTypeId: google.maps.MapTypeId.ROADMAP
        mapTypeControl: true,
        mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.ROADMAP
        },
        zoomControl: true,
        zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_TOP
        },
        scaleControl: true,
        streetViewControl: false,
        fullscreenControl: true,
        });

        directionsDisplay.setMap(map);

        var marker = new google.maps.Marker({
        position: latLong
        });
        marker.setMap(map);
        map.setZoom(15);
        map.setCenter(marker.getPosition());
/*
    var mapOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 10,
        //mapTypeId: google.maps.MapTypeId.ROADMAP
        mapTypeControl: true,
        mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.ROADMAP
        },
        zoomControl: true,
        zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_TOP
        },
        scaleControl: true,
        streetViewControl: false,
        fullscreenControl: true
    };
        map = new google.maps.Map (document.getElementById("map"), mapOptions);
        */       
}                  
function criarRota (latitude, longitude){

    var latLong2 = new google.maps.LatLng(latitude, longitude);
        
    function calculateAndDisplayRoute(directionsService, directionsDisplay) {
            console.log(latLong);
          directionsService.route({origin: latLong,
                                    destination: latLong2,
                                    travelMode: 'DRIVING' },
        function(response, status) {
                if (status === 'OK') {
                directionsDisplay.setDirections(response);
            } else {
                console.log(response.request);
                window.alert('Directions request failed due to ' + status);
            }
            console.log(latLong);
        });  
    }
}
 
//  retorno de retorno de sucesso para assistir sua mudança de posição 
 
var onMapWatchSuccess = function (position) {
 
    var updatedLatitude = position.coords.latitude;
    var updatedLongitude = position.coords.longitude;
 
    if (updatedLatitude != Latitude && updatedLongitude != Longitude) {
 
        Latitude = updatedLatitude;
        Longitude = updatedLongitude;
 
        getMap(updatedLatitude, updatedLongitude);
    }
}
 
//  retorno de chamada de erro 
 
function onMapError(error) {
    console.log('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}
 
// Watch your changing position 
 
function watchMapPosition() {
     return navigator.geolocation.watchPosition(onMapWatchSuccess, onMapError, {enableHighAccuracy:true});
}

/*function getWeatherLocation() { 
 
    Navegador.Geolocalização.GetCurrentPosition ( OnWeatherSuccess,  onWeatherError, { enableHighAccuracy:true});
} */

//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------