<<<<<<< HEAD
<<<<<<< HEAD
var dataB = Ti.Database.open('GeoDB');
dataB.execute('CREATE TABLE IF NOT EXISTS location(id INTEGER PRIMARY KEY, name TEXT, population TEXT, longitude INTEGER, latitude INTEGER, distance TEXT, county TEXT, state TEXT)');
=======
//requiring JS files
var box = require('storage');
var map = require('RemoteData');
>>>>>>> FETCH_HEAD
=======
//requiring JS files
var box = require('storage');
var map = require('RemoteData');
>>>>>>> FETCH_HEAD

//Window Start
var sWin = Ti.UI.createWindow({
	title : 'FORM',
	backgroundColor : '#fff'
});
exports.sWin = sWin;
//Window End

<<<<<<< HEAD
<<<<<<< HEAD
//Search Bar Start
var searchbar = Ti.UI.createSearchBar({
	top : 0,
	hintText : 'Search',
	barColor : '#fff'
});
//Search Bar End

//Table Start
var timesTable = Ti.UI.createTableView({
	search : searchbar,
	font : {
		fontStyle : 'Helvetica',
		fontSize : 18
	},

	opacity : .9
});
exports.timesTable = timesTable;
//Table End

//timesTable evt listener start
timesTable.addEventListener('click', function(e) {
	//calling vraibles from api start
	var name, pop, dist, longitude, latitude, county, st, cp;

	name = e.rowData.name;
	county = e.rowData.county;
	pop = e.rowData.population;
	dist = e.rowData.distance;
	longitude = e.rowData.longitude;
	latitude = e.rowData.latitude;
	st = e.rowData.st;
	cp = e.rowData.cp;
	//calling vraibles from api end

	//Window Start
	var tWin = Ti.UI.createWindow({
		title : 'FORM',
		backgroundColor : '#fff'
	});
	//Window End

	//save button start
	var saveBTN = Ti.UI.createButton({
		title : 'Save',
		top : '5%',
		right : '5%'
	});

	saveBTN.addEventListener('click', function(){
		dataB.execute("INSERT INTO location(name,state,county,latitude,longitude,distance,population) VALUES (?,?,?,?,?,?,?)", name, st, county, latitude, longitude, dist, pop);
		alert(name + " has been added to your favorites list");
	});
	
	//save button end

	//cancel button start
	var cancelBTN = Ti.UI.createButton({
		title : 'Cancel',
		top : '5%',
		left : '5%'
	});
	cancelBTN.addEventListener('click', function() {
		tWin.close();
	});
	//cencel button end

	//Map views start
	var Map = require('ti.map');

	var view = Map.createAnnotation({
		latitude : latitude,
		longitude : longitude
	});

	var mapview = Map.createView({
		mapType : Map.NORMAL_TYPE,
		annotations : [view],
		// region : {
		// latitude : e.source.latitude,
		// longitude : e.source.longitude,
		// latitudeDelta : 0.2,
		// longitudeDelta : 0.2
		// },
		enableZoomControls : true,
		regionFit : true
	});

	//this View holds the map
	var theMapView = Ti.UI.createView({
		top : '10%',
		height : '60%',
		width : '100%'
	});
	theMapView.add(mapview);
	//Map views end

	//Labels Begin
	var type = Ti.Platform.osname;
	if (type === "ipad"){
		titleLabel.font.fontSize = 100;
		titleLabel.font.fontFamily = "Helvetica Bold";
		titleLabel.left = 30;
		countyLabel.font.fontSize = 100;
		countyLabel.font.fontFamily = "Helvetica";
		countyLabel.left = 30;
		popLabel.font.fontSize = 100;
		popLabel.font.fontFamily = "Helvetica Bold";
		popLabel.left = 30;
		
	}
	var titleView = Ti.UI.createLabel({
		text : name + ', ' + st,
	});

	var countyLabel = Ti.UI.createLabel({
		text : county,
	});

	Number.prototype.format = function() {
		return this.toString().split(/(?=(?:\d{3})+(?:\.|$))/g).join(",");
	};

	var popLabel = Ti.UI.createLabel();

	switch (pop) {
		case null:
			popLabel.text = 'Population: Not Avalible';
			break;
		default :
			popLabel.text = pop.format(); + "people";
			break;
	}
	
	var distLabel = Ti.UI.createLabel({
		text : 'Dist: ' + dist + ' Miles',
	});

	var cpLabel = Ti.UI.createLabel({
		text : cp
	});
	//Labels End

	theMapView.add(titleView, countyLabel, popLabel, distLabel);
	theMapView.add(textView);
	//EventListener Main Code
	tWin.add(cancelBTN, saveBTN);
	tWin.add(theMapView, cpLabel);
	tWin.open();
});

sWin.add(timesTable);
=======
=======
>>>>>>> FETCH_HEAD
//save button start
var saveBTN = Ti.UI.createButton({
	title : 'SAVE',
	bottom : '5%',
	center : '0%'
});

// saveBTN.addEventListener('click', box.save);
//save button end

var cancelBTN = Ti.UI.createButton({
	systemButton : Ti.UI.iPhone.SystemButton.CANCEL,
	title : 'CANCEL',
	top : '5%',
	left : '5%'
});

cancelBTN.addEventListener('click', function() {
	sWin.close();
});

var name, population, lat, lng, dist, county; 

name = map.info.name;
console.log(name);

//Labels Begin

var titleView = Ti.UI.createLabel({
	top : '50%',
	left : '10%',
	text : name,
	font : {
		fontStyle : 'Helvetica',
		fontSize : 20,
		fontWeight : 'bold'
	}
});

var countyLabel = Ti.UI.createLabel({
	top : '55%',
	left : '10%',
	text : county,
	font : {
		fontStyle : 'Helvetica',
		fontSize : 16
	}
});

var latLabel = Ti.UI.createLabel({
	top : '60%',
	left : '10%',
	text : 'lat: ' + latitude,
	font : {
		fontStyle : 'Helvetica',
		fontSize : 16
	}
});

var lngLabel = Ti.UI.createLabel({
	top : '65%',
	left : '10%',
	text : 'lng: ' + longitude,
	font : {
		fontStyle : 'Helvetica',
		fontSize : 16
	}
});

var countryLabel = Ti.UI.createLabel({
	top : '70%',
	left : '10%',
	right : '15%',
	text : country,
	font : {
		fontStyle : 'Helvetica',
		fontSize : 16
	}
});

var distLabel = Ti.UI.createLabel({
	top : '75%',
	left : '10%',
	right : '15%',
	text : 'Dist: ' + dist,
	font : {
		fontStyle : 'Helvetica',
		fontSize : 16
	}
});
//Labels End

//EventListener Main Code
sWin.add(cancelBTN, saveBTN);
// evtWin.add(mapView, titleView, countyLabel, latLabel, lngLabel, countryLabel, distLabel);
<<<<<<< HEAD
>>>>>>> FETCH_HEAD
=======
>>>>>>> FETCH_HEAD
sWin.open();
