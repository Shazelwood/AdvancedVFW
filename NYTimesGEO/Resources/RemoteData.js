// var currentWin = Ti.UI.currentWindow;
// 
// var holder = Ti.UI.createView({
	// height: 800,
	// bottom: 0,
	// width: Ti.UI.FILL,
// });
// var info = [];
// var response, name, population, lat, lng, dist, county;
// var remoteResponse = function() {
    // // Response function code
	// response = JSON.parse(this.responseText);
	// for (var i = 0; i < response.results.length; i++){
		// name = response.results[i].geocode.name;
		// population = response.results[i].geocode.population;
		// lat = response.results[i].geocode.latitude;
		// lng = response.results[i].geocode.longitude;
		// dist = response.results[i].geocode.distance;
		// county = response.results[i].geocode.admin_name2;
		// info.push({
			// id: i + 1,
			// name: name,
			// county: county,
			// population: population,
			// distance: dist,
			// longitude: lng,
			// latitude: lat,
		// });
	// };
	// console.log(info);
// 	
// };
// 
// 
// var remoteError = function(e) {
    // Ti.API.debug("Status: " + this.status);
    // Ti.API.debug("Text: " + this.responseText);
    // Ti.API.debug("Error: " + e.error);
    // alert("There's a problem pulling remote data");
// };
// 
// var xhr = Ti.Network.createHTTPClient({
    // onload: remoteResponse,
    // onerror: remoteError,
    // timeout:5000
// });
// 
// var runGeo = function(){
// 	
	// Ti.Geolocation.purpose = "Your location is needed to gather lat/long coords.";
// 	
	// Ti.Geolocation.getCurrentPosition(function(e){
		// var lat = e.coords.latitude;
		// var lng = e.coords.longitude;
		// var url = "http://api.nytimes.com/svc/semantic/v2/geocodes/query.json?nearby=" + lat + "," + lng + "&api-key=ec2c67ba0d91240ac18bbf24043c8cb5:1:68792990";
		// var coordinateLabel = Ti.UI.createLabel({
			// color: '#fff',
			// text: 'Latitude: ' + lat + ', Longitude: ' + lng,
			// height: Ti.UI.SIZE,
			// textAlign: 'center',
			// font: {
				// fontSize: '20dp',
				// fontWeight: 'bold'	
			// } 
		// });
// 		
		// console.log("This is whats happening: " + url);
		// holder.add(coordinateLabel);
		// return url;
	// });
	// // console.log("This what you want: " + urlz);
// 	
// 	
// };
// //runGeo();
// 
// 
// 
// xhr.open("GET", "http://api.nytimes.com/svc/semantic/v2/geocodes/query.json?nearby=37.78583526611328,-122.40641784667969&api-key=ec2c67ba0d91240ac18bbf24043c8cb5:1:68792990");
// xhr.send();
// 
// 
// 
// currentWin.add(holder);