var getnetworkstate = function(){
	if(Titanium.Network.online){
	     var win = Ti.UI.createWindow({
			backgroundColor: "#FFF",
		});
		
		var landing = Ti.UI.createView({
			backgroundColor: "#001245",
			height: Ti.UI.FILL,
			width: Ti.UI.FILL
		});
		var landingText = Ti.UI.createLabel({
			text: "User",
			font:{
				fontSize: 100,
				fontFamily: "Helvetica Neue Thin"
			},
			color: "#FFF"
		});
		landing.add(landingText);
		
		landing.addEventListener("click", function(){
			var logOnWin = Ti.UI.createWindow({
				title:"Capture the Moment",
				backgroundColor: "#001245",
				url: "logOn.js"
			});
			logOnWin.open();
		});
		win.add(landing);
		win.open();
	}else {
	    var alertDialog = Titanium.UI.createAlertDialog({
        	title: 'WARNING!',
          	message: 'Your device is not online.',
          	buttonNames: ['OK'] 
        });
	  	alertDialog.show();
	}
};


(function() { 
	// load the Cloud Module
	var Cloud = require('ti.cloud');
	// set .debug property to 'true' as we are in Development mode
	Cloud.debug = true;
	var loginUser = function(){
		Cloud.Users.login({
			login: 'com.fullsail.demoApp',
			password: '12345'
		}, function(e){
			// use .info method to view login info in the Console, if successful
			if (e.success){
				var user = e.users[0];
				Ti.API.info('Success!\n' + 
					'ACS User ID: ' + user.id + '\n' + 
					'ACS App sessionId: ' + Cloud.sessionId + '\n' + 
					'ACS App Username: ' + user.username);
			} else {
				alert((e.error && e.message) || JSON.stringify(e));
			}
		});
	}; // loginUser ends
	loginUser();
	// now your app is ready to access ACS network and data services
})();

getnetworkstate();

