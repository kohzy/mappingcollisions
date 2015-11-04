var map = L.map('map').setView([40.742045, -73.995328],13);
var actualTileLayer = L.tileLayer.provider('Hydda.Base').addTo(map);

//parse the JSON Data
var jsonData;
var rawData = $.getJSON('https://data.cityofnewyork.us/resource/h9gi-nx95.json', function(data) {
	jsonData = data;

	//iterature through JSON data and draw dots 
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

		if (jsonData[i].location && jsonData[i].location) {
			var latitude = parseFloat(jsonData[i].location.latitude);
			var longitude = parseFloat(jsonData[i].location.longitude);

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

//Jquery Map Animations
$( "#map").mouseenter(function() {
	actualTileLayer.setOpacity(0.3);
	$(".leaflet-clickable").toggle("display");
	$(this).mouseleave(function() {
		actualTileLayer.setOpacity(1);
		$(".leaflet-clickable").toggle("display");
	})
})