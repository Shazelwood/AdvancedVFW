var search = require("search");
var mapWin = Ti.UI.createWindow({
	title : "Map Window",
	backgroundImage: "map.png"
});
exports.mapWin = mapWin;
var holder = Ti.UI.createView({
	height: 800,
	bottom: 0,
	width: Ti.UI.FILL,
});
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

runGeo();
mapWin.add(holder);