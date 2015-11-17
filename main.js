//Variables for p5 sound speech recognition
var myRec = new p5.SpeechRec(); // new P5.SpeechRec object
myRec.continuous = true; // do continuous recognition
myRec.interimResults = true; // allow partial recognition (faster, less accurate)


//create a new Leaflet map and set the initial view when the map loads and the initial zoom
var map = L.map('map').setView([40.742045, -73.995328],13);

//Set the choice of map style 
var actualTileLayer = L.tileLayer.provider('Hydda.Base').addTo(map);

//parse the JSON Data we get from the NYC API URL
var jsonData;
var rawData = $.getJSON('https://data.cityofnewyork.us/resource/h9gi-nx95.json', function(data) {
		jsonData = data;

		//iterate through each line of JSON data and draw dots 
		for (var i=0; i< jsonData.length; i++) {
			var dotColor = 'red';
			var numberInjured = parseInt(jsonData[i].number_of_persons_injured);
			var collisionTime = parseFloat(jsonData[i].time);
			var firstvehicle = jsonData[i].vehicle_type_code1;
			var secondvehicle;
			if(jsonData[i].vehicle_type_code2 != null) {
				secondvehicle = jsonData[i].vehicle_type_code2;} 
				else { secondvehicle = "UNKNOWN VEHICLE"};
			if( numberInjured >= 2) {
				dotColor = 'red';
				} else if (numberInjured  == 1) {
				dotColor = '#ff7800';
				} else if (numberInjured  == 0) {
				dotColor = 'yellow';
				}

			//if data point has location data (because some data points don't have location data), load the long and lat of that entry
			if (jsonData[i].location) {
				var latitude = parseFloat(jsonData[i].location.latitude);
				var longitude = parseFloat(jsonData[i].location.longitude);

				//Draw that particular circle with diameter determined by numberInjured
				L.circle([ latitude,longitude],30*(numberInjured+1),{
					color: 	dotColor,
					weight: 1,
					opacity: 0.7,
					fillColor: dotColor,
					fillOpacity: 0.7,
				}).addTo(map)
				    .bindPopup("<b>Reason:  </b>" + jsonData[i].contributing_factor_vehicle_1 + "<br> <b># of Injuries: </b>" + numberInjured + "<br> <b>Collision between </b>" + firstvehicle + " and " + secondvehicle + "<br> <b>Date: </b>" + jsonData[i].date + "<br> <b>Time: </b>" + collisionTime);	
				} else {			
				}
		}
});

function setup() {
	// instructions:
 
  myRec.onResult = parseResult; // recognition callback
  myRec.start(); // start engine
}


//Jquery Map Animations
// $( "#map").mouseenter(function() {
// 	actualTileLayer.setOpacity(0.3);
// 	$(".leaflet-clickable").toggle("display");
// 	$(this).mouseleave(function() {
// 		actualTileLayer.setOpacity(1);
// 		$(".leaflet-clickable").toggle("display");
// 	})
// })


function parseResult()
{
  // recognition system will often append words into phrases.
  // so hack here is to only use the last word:
  var mostrecentword = myRec.resultString.split(' ').pop();
  if(mostrecentword.indexOf("map")!==-1) {
		actualTileLayer.setOpacity(0.3);
		if($(".leaflet-clickable").css("display") == "none") {
			$(".leaflet-clickable").toggle("display");
		}
	}
  else if(mostrecentword.indexOf("clear")!==-1) {
  		actualTileLayer.setOpacity(1);
		if($(".leaflet-clickable").css("display") != "none") {
			$(".leaflet-clickable").toggle("display");
		}
	}
  else if(mostrecentword.indexOf("up")!==-1) { dx=0;dy=-1; }
  else if(mostrecentword.indexOf("down")!==-1) { dx=0;dy=1; }
  else if(mostrecentword.indexOf("stop")!==-1) {dx=0;dy=0; }
  console.log(mostrecentword);
 if(mostrecentword.indexOf("cash")!==-1) {dx=1;dy=1; }
  console.log(mostrecentword); if(mostrecentword.indexOf("jump")!==-1) {dx=1;dy=-1; }
  console.log(mostrecentword);
 if(mostrecentword.indexOf("duck")!==-1) {dx=-1;dy=1; }
  console.log(mostrecentword);
  if(mostrecentword.indexOf("pop")!==-1) {dx=-1;dy=-1; }
  console.log(mostrecentword);
}




