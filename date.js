//parse the JSON Data we get from the NYC API URL
var jsonData;

//initiate array to contain all the collisionDates
var collisionDateArray = [];
var minCollisionDate = "min";
var maxCollisionDate = "max";

var rawData = $.getJSON('https://data.cityofnewyork.us/resource/h9gi-nx95.json', function(data) {
		jsonData = data;

		//iterate through each line of JSON data and draw dots 
		for (var i=0; i< jsonData.length; i++) {
			if(jsonData[i].borough == "MANHATTAN" &&
				jsonData[i].borough == "QUEENS" &&
				jsonData[i].borough == "BROOKLYN" &&
				jsonData[i].borough == "BRONX"
				) {
				var collisionDate = jsonData[i].date.slice(0,jsonData[i].date.indexOf("T"));

					//Draw that particular circle with diameter determined by numberInjured
				collisionDateArray.push(
			}

		}
});