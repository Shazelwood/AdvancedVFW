var dataB = Ti.Database.open('GeoDB');
dataB.execute('CREATE TABLE IF NOT EXISTS location(id INTEGER PRIMARY KEY, name TEXT, population TEXT, longitude INTEGER, latitude INTEGER, distance TEXT, county TEXT, state TEXT)');

//Window Start
var sWin = Ti.UI.createWindow({
	title : 'FORM',
	backgroundColor : '#fff'
});
exports.sWin = sWin;
//Window End

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
	}
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
	longitude = e.rowData.lng;
	latitude = e.rowData.lat;
	st = e.rowData.st;
	cp = e.rowData.cp;
	//calling vraibles from api end

console.log(latitude);

	//Window Start
	var tWin = Ti.UI.createWindow({
		title : 'FORM',
		backgroundColor : '#fff'
	});
	//Window End

	//save button start
	var saveBTN = Ti.UI.createButton({
		title : 'SAVE',
		top : '5%',
		right : '5%',
		font : {
			fontSize : 20
		}
	});

	saveBTN.addEventListener('click', function() {
		dataB.execute("INSERT INTO location(name,state,county,latitude,longitude,distance,population) VALUES (?,?,?,?,?,?,?)", name, st, county, latitude, longitude, dist, pop);
		alert(name + " has been added to your favorites list");
		tWin.close();
	});

	//save button end

	//cancel button start
	var cancelBTN = Ti.UI.createButton({
		title : 'CANCEL',
		top : '5%',
		left : '5%',
		font : {
			fontSize : 20
		}
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
		region : {
		latitude : latitude,
		longitude : longitude,
		latitudeDelta : 0.1,
		longitudeDelta : 0.1
		},
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
	var titleView = Ti.UI.createLabel({
		top : '0%',
		left : '8%',
		text : name + ', ' + st,
		font : {
			fontStyle : 'Helvetica',
			fontSize : '40%',
			fontWeight : 'bold'
		}
	});

	var countyLabel = Ti.UI.createLabel({
		top : '27%',
		left : '10%',
		text : county,
		font : {
			fontStyle : 'Helvetica',
			fontSize : '30%'
		}
	});

	Number.prototype.format = function() {
		return this.toString().split(/(?=(?:\d{3})+(?:\.|$))/g).join(",");
	};

	var popLabel = Ti.UI.createLabel({
		bottom : '27%',
		left : '12%',
		right : '15%',
		font : {
			fontStyle : 'Helvetica',
			fontSize : '25%'
		}
	});

	switch (pop) {
		case null:
			popLabel.text = 'Population: Not Availible';
			break;
		default :
			popLabel.text = 'Population: ' + pop.format();
			break;
	}

	var distLabel = Ti.UI.createLabel({
		bottom : '7%',
		left : '12%',
		right : '15%',
		text : 'Dist: ' + dist + ' Mile(s)',
		font : {
			fontStyle : 'Helvetica',
			fontSize : '25%'
		}
	});

	var cpLabel = Ti.UI.createLabel({
		bottom : '0%',
		center : '12%',
		text : cp,
		font : {
			fontStyle : 'Helvetica',
			fontSize : '20%'
		}
	});
	//Labels End

	var textView = Ti.UI.createView({
		top : '69.9%',
		height : '17%',
		width : '100%',
		borderRadius : '3%',
		backgroundColor : '#EBECE4'
	});
	textView.add(titleView, countyLabel, popLabel, distLabel);

	//EventListener Main Code
	tWin.add(cancelBTN, saveBTN);
	tWin.add(theMapView, textView, cpLabel);
	tWin.open();
});

sWin.add(timesTable);
sWin.open();
