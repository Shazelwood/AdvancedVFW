var currentWin = Ti.UI.currentWindow;

Ti.include("JSON.js"); 

var panel = Ti.UI.createView({
	backgroundColor: "#000",
	left: 0,
	width: 80,
	top: 30,
	bottom: 0,
	layout: "vertical"
});

var manHolder = Ti.UI.createView({
	backgroundColor: "#FFF",
	top: 30,
	right: 0,
	bottom: 0,
	width: 688,
});

var man = Ti.UI.createView({
	width: 520,
	height: 970,
	backgroundImage: "Human_03.jpg"
});

var RArm = Ti.UI.createView({
	top: 188,
	left: 84,
	height:440,
	width:165,
	backgroundColor: "red"
});

var chest = Ti.UI.createView({
	top: 188,
	left: 84 + 165,
	height: 120,
	width: 190,
	backgroundColor: "blue",
});

var LArm = Ti.UI.createView({
	top: 188,
	right: 84,
	height:440,
	width:165,
	backgroundColor: "yellow"
});

var abs = Ti.UI.createView({
	top: 188 + 120,
	left: chest.left,
	height:230,
	width:190,
	backgroundColor: "green"
});

var legs = Ti.UI.createView({
	top: abs.top + 230,
	left: chest.left,
	height:440,
	width:190,
	backgroundColor: "purple"
});
manHolder.add(man);
manHolder.add(LArm);
manHolder.add(RArm);
manHolder.add(chest);
manHolder.add(abs);
manHolder.add(legs);
//manHolder.add(man);

images = [];
labels = ["Home", "Calendar", "Workout", "Search"];

for(var i = 0; i < 4; i++){
	var icons =Ti.UI.createView({
		top: 20,
		height: 50,
		width: 50,
		borderRadius: 10,
		backgroundColor:"#FFF"
	});
	var iconLabel = Ti.UI.createLabel({
		top: 5,
		color: "#FFF",
		text: labels[i],
		font:{
			fontSize: 15,
			fontFamily: "Helvetica Neue"
		}
	});
	panel.add(icons, iconLabel);
};

RArm.addEventListener("click", function(){
	var armWin = Ti.UI.createWindow({
		title: "ARM",
		backgroundColor: "#FFF",
		url: "arm.js"
	});
	armWin.open();
});
LArm.addEventListener("click", function(){
	var armWin = Ti.UI.createWindow({
		title: "ARM",
		backgroundColor: "#FFF",
		url: "arm.js"
	});
	armWin.open();
});
chest.addEventListener("click", function(){
	chestWin = Ti.UI.createWindow({
		title: "CHEST",
		backgroundColor: "#FFF",
		url: "chest.js"
	});
	chestWin.open();
});
abs.addEventListener("click", function(){
	absWin = Ti.UI.createWindow({
		title: "ABS",
		backgroundColor: "#FFF",
		url: "abs.js"
	});
	absWin.open();
});
legs.addEventListener("click", function(){
	legsWin = Ti.UI.createWindow({
		title: "LEGS",
		backgroundColor: "#FFF",
		url: "legs.js"
	});
	legsWin.open();
});


currentWin.add(manHolder);
currentWin.add(panel);