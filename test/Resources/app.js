var land = Ti.UI.createView({
	backgroundImage: "lebron.jpg"
});
var mainWin = Ti.UI.createWindow({
	title: "Main Window",
	backgroundColor: "#535353"	,
	url: "RemoteData.js"
});
var title = Ti.UI.createLabel({
	textAlign: "center",
	backgroundColor:"red",
	width: Ti.UI.FILL,
	text: "Heat News",
	font:{
    	fontSize:'50',
    	fontWeight: "Bold" 
	},
	top: 30
});
mainWin.add(land, title);
mainWin.open();



 