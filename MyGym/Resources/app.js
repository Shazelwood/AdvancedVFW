

var getnetworkstate = function(){
	if(Titanium.Network.online){
	    

	}else {
	    var alertDialog = Titanium.UI.createAlertDialog({
        	title: 'NOTICE!',
          	message: 'Your device is not online. Some features my not be accessible.',
          	buttonNames: ['OK'] 
        });
	  	alertDialog.show();
	}
};

getnetworkstate();

var mainWin = Ti.UI.createWindow({
	title: "My Gym",
	backgroundColor: "#fc6060",
});

var landing = Ti.UI.createView({
	backgroundImage: "images/logo_03.png",
	height: "110dp",
	width: "520dp"
});

mainWin.addEventListener("click", function(){
	var selectWin = Ti.UI.createWindow({
		title: "Selection",
		backgroundColor: "#000",
		url: "selection.js"
	});
	selectWin.open();
});

mainWin.add(landing);
mainWin.open();



