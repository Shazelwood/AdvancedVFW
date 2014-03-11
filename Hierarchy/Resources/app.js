var mainWin = Ti.UI.createWindow({
	title: "Hierarchy",
	backgroundColor: "#FFF"
});

var label1 = Ti.UI.createLabel({
	text: type,
	font: {
		fontSize: 100,
		fontFamily: "Helvetica Bold",
	}
});

mainWin.add(label1);
mainWin.open();
