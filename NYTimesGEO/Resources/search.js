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
sWin.open();
