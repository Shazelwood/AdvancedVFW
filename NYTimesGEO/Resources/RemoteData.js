<<<<<<< HEAD
<<<<<<< HEAD
var search = require("search");
var mapWin = Ti.UI.createWindow({
	title : "Map Window",
	backgroundImage: "map.png"
});
exports.mapWin = mapWin;
=======
<<<<<<< HEAD
=======
>>>>>>> FETCH_HEAD
var mapWin = Ti.UI.createWindow({
	title : "Map Window"
});
exports.mapWin = mapWin;
=======
var currentWin = Ti.UI.currentWindow;
>>>>>>> FETCH_HEAD

>>>>>>> FETCH_HEAD
var holder = Ti.UI.createView({
	height: 800,
	bottom: 0,
	width: Ti.UI.FILL,
});
<<<<<<< HEAD
var refreshHolder = Ti.UI.createView({
	borderRadius : '5%',
	center : '0%',
	height : '40%',
	width : '60%',
	backgroundColor : '#fff'
});
var refresh = Ti.UI.createButton({
	title: "refresh"
});
refresh.addEventListener("click", function(){
	xhr.open("GET", url);
	xhr.send();
=======
var info = [];
var response, name, population, lat, lng, dist, county;
var remoteResponse = function() {
    // Response function code
	response = JSON.parse(this.responseText);
	for (var i = 0; i < response.results.length; i++){
		name = response.results[i].geocode.name;
		population = response.results[i].geocode.population;
		lat = response.results[i].geocode.latitude;
		lng = response.results[i].geocode.longitude;
<<<<<<< HEAD
		dist = Math.round(response.results[i].geocode.distance/100)*100;
=======
		dist = response.results[i].geocode.distance;
>>>>>>> FETCH_HEAD
		county = response.results[i].geocode.admin_name2;
		info.push({
			id: i + 1,
			name: name,
			county: county,
			population: population,
			distance: dist,
			longitude: lng,
			latitude: lat,
		});
	};
	var Map = require('ti.map');
	var mapview = Map.createView({mapType:Map.NORMAL_TYPE});
<<<<<<< HEAD
	mapWin.add(mapview);
	// console.log(info);
};
exports.info = info;
=======
	currentWin.add(mapview);
	console.log(info);
	
};

>>>>>>> FETCH_HEAD

var remoteError = function(e) {
    Ti.API.debug("Status: " + this.status);
    Ti.API.debug("Text: " + this.responseText);
    Ti.API.debug("Error: " + e.error);
<<<<<<< HEAD
    alert("There is a problem pulling the data");
=======
    alert("There's a problem pulling remote data");
>>>>>>> FETCH_HEAD
};

var xhr = Ti.Network.createHTTPClient({
    onload: remoteResponse,
    onerror: remoteError,
    timeout:5000
>>>>>>> FETCH_HEAD
});

var runGeo = function(){
	
	Ti.Geolocation.purpose = "Your location is needed to gather lat/long coords.";
	
	Ti.Geolocation.getCurrentPosition(function(e){
		if (e.error){
			alert("Your location is turned off. Please turn on");
			
			runGeo();
		}else{
			var lat = e.coords.latitude;
			var lng = e.coords.longitude;
			var url = "http://api.nytimes.com/svc/semantic/v2/geocodes/query.json?nearby=" + lat + "," + lng + "&api-key=ec2c67ba0d91240ac18bbf24043c8cb5:1:68792990";
			var coordinateLabel = Ti.UI.createLabel({
				color: '#fff',
				text: 'Latitude: ' + lat + ', Longitude: ' + lng,
				height: Ti.UI.SIZE,
				textAlign: 'center',
				font: {
					fontSize: '20dp',
					fontWeight: 'bold'	
				} 
			});
		}
		var info = [];
		var response, name, population, lat, lng, dist, county;
		var remoteResponse = function() {
			
			
		    // Response function code
			response = JSON.parse(this.responseText);
			for (var i = 0; i < response.results.length; i++){
				name = response.results[i].geocode.name;
				st = response.results[i].geocode.admin_code1;
				population = response.results[i].geocode.population;
				lat = Math.round(response.results[i].geocode.latitude * 1000) / 1000;
				lng = Math.round(response.results[i].geocode.longitude * 1000) / 1000;
				dist = Math.round(response.results[i].geocode.distance * 100) / 100;
				county = response.results[i].geocode.admin_name2;
				cp = response.copyright;
						
				var rows = Ti.UI.createTableViewRow({
					id : i + 1,
					title : name,
					name : name,
					st : st,
					county : county,
					population : population,
					distance : dist,
					cp : cp
				});
		
				info.push(rows);
			};
			var Map = require('ti.map');
			var mapview = Map.createView({
				mapType : Map.NORMAL_TYPE
			});
			mapWin.add(mapview);
			search.timesTable.setData(info);
		};
			
		var remoteError = function(e) {
		    Ti.API.debug("Status: " + this.status);
		    Ti.API.debug("Text: " + this.responseText);
		    Ti.API.debug("Error: " + e.error);
		    alert("There's a problem pulling remote data");
		    refreshHolder.add(refresh);
		    mapWin.add(refreshHolder);
		};

		var xhr = Ti.Network.createHTTPClient({
		    onload: remoteResponse,
		    onerror: remoteError,
		    timeout:5000
		});
		holder.add(coordinateLabel);
		
		xhr.open("GET", url);
		xhr.send();
	});
	
};
<<<<<<< HEAD
<<<<<<< HEAD

runGeo();
mapWin.add(holder);
=======
<<<<<<< HEAD
=======
>>>>>>> FETCH_HEAD
=======
var mapview = Titanium.Map.createView({
    mapType: Titanium.Map.STANDARD_TYPE,
    region:{latitude:33.74511, longitude:-84.38993, latitudeDelta:0.5, longitudeDelta:0.5},
    animate:true,
    regionFit:true,
    userLocation:true
});
currentWin.add(mapview);
>>>>>>> FETCH_HEAD
runGeo();



xhr.open("GET", "http://api.nytimes.com/svc/semantic/v2/geocodes/query.json?nearby=37.78583526611328,-122.40641784667969&api-key=ec2c67ba0d91240ac18bbf24043c8cb5:1:68792990");
xhr.send();



<<<<<<< HEAD
mapWin.add(holder);
=======
currentWin.add(holder);
>>>>>>> FETCH_HEAD
<<<<<<< HEAD
>>>>>>> FETCH_HEAD
=======
>>>>>>> FETCH_HEAD
