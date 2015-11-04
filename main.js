var map = L.map('map').setView([40.742045, -73.995328],13);

var actualTileLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var cities = [];
var citiesOverlay = L.d3SvgOverlay(function(sel,proj){
	
  var minLogPop = Math.log2(d3.min(cities,function(d){return d.population;}));
  var citiesUpd = sel.selectAll('circle').data(cities);
  citiesUpd.enter()
    .append('circle')
    .attr('r',function(d){return Math.log2(d.population) - minLogPop + 2;})
    .attr('cx',function(d){return proj.latLngToLayerPoint(d.latLng).x;})
    .attr('cy',function(d){return proj.latLngToLayerPoint(d.latLng).y;})
    .attr('stroke','black')
    .attr('stroke-width',1)
    .attr('fill',function(d){return (d.place == 'city') ? "red" : "blue";})
    .attr('class', 'circleHover');
});

// d3.csv("swiss-cities.csv",function(data){
//   cities = data.map(function(d){
//     d.latLng = [+d.lat,+d.lng];
//     d.population = (d.population == '') ? 2000 : +d.population; //NAs
//     return d;
//   });
//   citiesOverlay.addTo(map);
// });

var jsonData;
var rawData = $.getJSON('https://data.cityofnewyork.us/resource/h9gi-nx95.json', function(data) {
	jsonData = data;

	for (var i=0; i< jsonData.length; i++) {
		if (jsonData[i].location && jsonData[i].location) { 			
			L.circle([parseFloat(jsonData[i].location.latitude),parseFloat(jsonData[i].location.longitude)],40,{
				color: 	
				function() {
						if(parseInt(jsonData[i].number_of_persons_killed) == 0) {
							return 'red';
						} else {
							return 'red';
						}
					},
				weight: 1,
				opacity: 0.7,
				fillColor: 'red',
				// function() {
				// 		if(parseInt(jsonData[i].number_of_persons_killed) == 0) {
				// 			return 'red';
				// 		} else {
				// 			return 'red';
				// 		}
				// 	},
				fillOpacity: 0.7,
			}).addTo(map)
			    .bindPopup("<b>Reason:  </b>" + jsonData[i].contributing_factor_vehicle_1 + "<br> <b>Hello</b>");	
			} else {			
			}
	}
});

$( "#map").mouseenter(function() {
	actualTileLayer.setOpacity(0.3);
	$(this).mouseleave(function() {
		actualTileLayer.setOpacity(1);
	})
})