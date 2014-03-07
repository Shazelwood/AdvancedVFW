//requiring JS files
var box = require('storage');
var map = require('RemoteData');

//Window Start
var sWin = Ti.UI.createWindow({
	title : 'FORM',
	backgroundColor : '#fff'
});
exports.sWin = sWin;
//Window End

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
sWin.open();
