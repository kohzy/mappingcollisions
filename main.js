// //Variables for p5 sound speech recognition
// var myRec = new p5.SpeechRec(); // new P5.SpeechRec object
// myRec.continuous = true; // do continuous recognition
// myRec.interimResults = true; // allow partial recognition (faster, less accurate)


//create a new Leaflet map and set the initial view when the map loads and the initial zoom
var nycmap = L.map('map').setView([40.722045, -73.945328],13);

//Set the choice of map style 
var actualTileLayer = L.tileLayer.provider('Hydda.Base').addTo(nycmap);

//parse the JSON Data we get from the NYC API URL
var jsonData;
var manhattanArray = [];
var queensArray = [];
var bronxArray = [];
var brooklynArray = [];
var rawData = $.getJSON('https://data.cityofnewyork.us/resource/h9gi-nx95.json', function(data) {
		jsonData = data;

		//iterate through each line of JSON data and draw dots 
		for (var i=0; i< jsonData.length; i++) {
			if(jsonData[i].borough == "MANHATTAN") {
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
					manhattanArray.push(L.circle([ latitude,longitude],30*(numberInjured+1),{
						color: 	dotColor,
						weight: 1,
						opacity: 0.7,
						fillColor: dotColor,
						fillOpacity: 0.7,
						className: "manhattan-array"
					}).addTo(nycmap)
					    .bindPopup("<b>Reason:  </b>" + jsonData[i].contributing_factor_vehicle_1 + "<br> <b># of Injuries: </b>" + numberInjured + "<br> <b>Collision between </b>" + firstvehicle + " and " + secondvehicle + "<br> <b>Date: </b>" + jsonData[i].date + "<br> <b>Time: </b>" + collisionTime)
					    );	
					} else {			
					}
			}
			else if (jsonData[i].borough == "QUEENS") {
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
					queensArray.push(L.circle([ latitude,longitude],30*(numberInjured+1),{
						color: 	dotColor,
						stroke: true,
						weight: 1,
						opacity: 0.7,
						fillColor: dotColor,
						fillOpacity: 0.7,
						className: "queens-array"
					}).addTo(nycmap)
					    .bindPopup("<b>Reason:  </b>" + jsonData[i].contributing_factor_vehicle_1 + "<br> <b># of Injuries: </b>" + numberInjured + "<br> <b>Collision between </b>" + firstvehicle + " and " + secondvehicle + "<br> <b>Date: </b>" + jsonData[i].date + "<br> <b>Time: </b>" + collisionTime)
					    );	
					} else {			
					}
			}
			else if(jsonData[i].borough == "BROOKLYN") {
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
					brooklynArray.push(L.circle([ latitude,longitude],30*(numberInjured+1),{
						color: 	dotColor,
						stroke: true,
						weight: 1,
						opacity: 0.7,
						fillColor: dotColor,
						fillOpacity: 0.7,
						className: "brooklyn-array"
					}).addTo(nycmap)
					    .bindPopup("<b>Reason:  </b>" + jsonData[i].contributing_factor_vehicle_1 + "<br> <b># of Injuries: </b>" + numberInjured + "<br> <b>Collision between </b>" + firstvehicle + " and " + secondvehicle + "<br> <b>Date: </b>" + jsonData[i].date + "<br> <b>Time: </b>" + collisionTime)
					    );	
					} else {			
					}
			}				
			else if(jsonData[i].borough == "BRONX") {
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
					bronxArray.push(L.circle([ latitude,longitude],30*(numberInjured+1),{
						color: 	dotColor,
						stroke: true,
						weight: 1,
						opacity: 0.7,
						fillColor: dotColor,
						fillOpacity: 0.7,
						className: "bronx-array"
					}).addTo(nycmap)
					    .bindPopup("<b>Reason:  </b>" + jsonData[i].contributing_factor_vehicle_1 + "<br> <b># of Injuries: </b>" + numberInjured + "<br> <b>Collision between </b>" + firstvehicle + " and " + secondvehicle + "<br> <b>Date: </b>" + jsonData[i].date + "<br> <b>Time: </b>" + collisionTime)
					    );	
					} else {			
					}
			}
		}
});


// function setup() {
// 	// instructions:
 
//   // myRec.onResult = parseResult; // recognition callback
//   // myRec.start(); // start engine
// }


//Jquery Map Animations
$("#manhattanButton").click(function() {
	this.style.backgroundColor = this.style.backgroundColor == "white" ? "black" : "white";
	this.style.color = this.style.color == "black" ? "white" : "black";
	if ($(".manhattan-array").css("display") == "none"
		&& $(".brooklyn-array").css("display") == "none"
		&& $(".queens-array").css("display") == "none"
		&& $(".bronx-array").css("display") == "none"
		) {
		actualTileLayer.setOpacity(0.8);
	}
	else if ($(".manhattan-array").css("display") !== "none"
		&& $(".brooklyn-array").css("display") == "none"
		&& $(".queens-array").css("display") == "none"
		&& $(".bronx-array").css("display") == "none"
		) {	 
		actualTileLayer.setOpacity(1);
	}
	$(".manhattan-array").toggle("display");
})
$("#brooklynButton").click(function() {
	this.style.backgroundColor = this.style.backgroundColor == "white" ? "black" : "white";
	this.style.color = this.style.color == "black" ? "white" : "black";
	if ($(".manhattan-array").css("display") == "none"
		&& $(".brooklyn-array").css("display") == "none"
		&& $(".queens-array").css("display") == "none"
		&& $(".bronx-array").css("display") == "none"
		) {
		actualTileLayer.setOpacity(0.8);
	}
	else if ($(".manhattan-array").css("display") == "none"
		&& $(".brooklyn-array").css("display") !== "none"
		&& $(".queens-array").css("display") == "none"
		&& $(".bronx-array").css("display") == "none"
		) {	 
		actualTileLayer.setOpacity(1);
	}
	$(".brooklyn-array").toggle("display");
})
$("#bronxButton").click(function() {
	this.style.backgroundColor = this.style.backgroundColor == "white" ? "black" : "white";
	this.style.color = this.style.color == "black" ? "white" : "black";
	if ($(".manhattan-array").css("display") == "none"
		&& $(".brooklyn-array").css("display") == "none"
		&& $(".queens-array").css("display") == "none"
		&& $(".bronx-array").css("display") == "none"
		) {
		actualTileLayer.setOpacity(0.8);
	}
	else if ($(".manhattan-array").css("display") == "none"
		&& $(".brooklyn-array").css("display") == "none"
		&& $(".queens-array").css("display") == "none"
		&& $(".bronx-array").css("display") !== "none"
		) {	 
		actualTileLayer.setOpacity(1);
	}
	$(".bronx-array").toggle("display");
})
$("#queensButton").click(function() {
	this.style.backgroundColor = this.style.backgroundColor == "white" ? "black" : "white";
	this.style.color = this.style.color == "black" ? "white" : "black";
	if ($(".manhattan-array").css("display") == "none"
		&& $(".brooklyn-array").css("display") == "none"
		&& $(".queens-array").css("display") == "none"
		&& $(".bronx-array").css("display") == "none"
		) {
		actualTileLayer.setOpacity(0.8);
	}
	else if ($(".manhattan-array").css("display") == "none"
		&& $(".brooklyn-array").css("display") == "none"
		&& $(".queens-array").css("display") !== "none"
		&& $(".bronx-array").css("display") == "none"
		) {	 
		actualTileLayer.setOpacity(1);
	}
	$(".queens-array").toggle("display");
})

// function parseResult()
// {
//   // recognition system will often append words into phrases.
//   // so hack here is to only use the last word:
//   var mostrecentword = myRec.resultString.split(' ').pop();
//   if(mostrecentword.indexOf("Manhattan")!==-1) {
// 		actualTileLayer.setOpacity(0.3);
// 		if($(".manhattan-array").css("display") == "none") {
// 			$(".manhattan-array").toggle("display");
// 		}
// 	}
//   else if(mostrecentword.indexOf("Queens")!==-1) {
// 		actualTileLayer.setOpacity(0.3);
// 		if($(".queens-array").css("display") == "none") {
// 			$(".queens-array").toggle("display");
// 		}
// 	}
//   else if(mostrecentword.indexOf("Bronx")!==-1) {
// 		actualTileLayer.setOpacity(0.3);
// 		if($(".bronx-array").css("display") == "none") {
// 			$(".bronx-array").toggle("display");
// 		}
// 	}
//   else if(mostrecentword.indexOf("Brooklyn")!==-1) {
// 		actualTileLayer.setOpacity(0.3);
// 		if($(".brooklyn-array").css("display") == "none") {
// 			$(".brooklyn-array").toggle("display");
// 		}
// 	}
//   else if(mostrecentword.indexOf("clear")!==-1) {
//   		actualTileLayer.setOpacity(1);
//  		if($(".leaflet-clickable").css("display") != "none") {
// 			$(".leaflet-clickable").toggle("display");
// 		}
// 	}
//   console.log(mostrecentword);
// }




