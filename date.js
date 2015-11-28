//parse the JSON Data we get from the NYC API URL
var jsonData1;

//monthNames for naming max and min collision dates
var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

//initiate array to contain all the collisionDates
var collisionDateArray = [];
var minCollisionDate = {};
var minCollisionDateTime = 0;
var maxCollisionDate = {};
var maxCollisionDateTime = 0;

var rawData1 = $.ajax({
		url: 'https://data.cityofnewyork.us/resource/h9gi-nx95.json', 
		async: false,
		dataType: 'json',
		success: function(data) {
			jsonData1 = data;

			//iterate through each line of JSON data and draw dots 
			for (var i=0; i< jsonData1.length; i++) {
				var collisionDate = new Date(jsonData1[i].date);

				if(jsonData1[i].borough == "MANHATTAN" ||
					jsonData1[i].borough == "QUEENS" ||
					jsonData1[i].borough == "BROOKLYN" ||
					jsonData1[i].borough == "BRONX"
					) {
						if (collisionDate.getTime() > maxCollisionDateTime) {
							maxCollisionDateTime = parseInt(collisionDate.getTime());
							maxCollisionDate = collisionDate;
						}

						if (minCollisionDateTime == 0) {
							minCollisionDateTime = parseInt(collisionDate.getTime());
						} else if (collisionDate.getTime() < minCollisionDateTime) {
							minCollisionDateTime = parseInt(collisionDate.getTime());
							minCollisionDate = collisionDate
						}
				}
			}
		}
	});

var minCollisionMonth = monthNames[minCollisionDate.getMonth()];
var maxCollisionMonth = monthNames[maxCollisionDate.getMonth()];

// for (var i=0; i <collisionDateArray.length; i++) {
// 	if (collisionDateArray[i].getTime() > maxCollisionDate.getTime()) {
// 		maxCollisionDate = collisionDateArray[i];
// 	}
// 	if (collisionDateArray[i].getTime() < maxCollisionDate.getTime()) {
// 		minCollisionDate = collisionDateArray[i];
// 	}
// }