currentWin = Ti.UI.currentWindow;
var Cloud = require('ti.cloud');

var header = Ti.UI.createLabel({
	text: "User",
	font:{
		fontSize: 60,
		fontFamily: "Helvetica Neue Thin"
	},
	top: 80,
	color: "#FFF"
});

var holder = Ti.UI.createScrollView({	
	backgroundColor: "#001245",
    contentWidth: 'auto',
    contentHeight: 'auto',
    top: 30,
    bottom: 0,
    showVerticalScrollIndicator: true,
    showHorizontalScrollIndicator: true
});
 
var usernameField = Titanium.UI.createTextField({
    hintText:"Username",
    height:35,
    top: 250,
    width:250,
    color: "#000",
    //blur:true,
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});

var passwordField = Titanium.UI.createTextField({
    hintText:"Password",
    height:35,
    top:300,
    width:250,
    color: "#000",
    //blur:true,
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});

var signInText = Ti.UI.createLabel({
	text: "Sign In",
	color: "#FFF"
});

var signIn = Ti.UI.createView({
	height: 35,
	top: 400,
	width: 250,
	backgroundColor: "#001245",
	borderRadius: 6
});

signIn.addEventListener("click", function(){
	//When long in is clicked, color changes to 032ca2
	signIn.backgroundColor = "#032ca2";
	Cloud.Users.login({
	    login: usernameField.value,
	    password: passwordField.value
	}, function (e) {
	    if (e.success) {
	        var user = e.users[0];
	        alert('Success:\n' +
	            'id: ' + user.id + '\n' +
	            'sessionId: ' + Cloud.sessionId + '\n' +
	            'first name: ' + user.first_name + '\n' +
	            'last name: ' + user.last_name);
	            var galleryWin = Ti.UI.createWindow({
	            	title: "My Moments",
	            	backgroundColor: "#FFF",
	            	url: "gallery.js"
	            });
	            galleryWin.open();
	    } else {
	        alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
	    }
	});	
});

var signUp = Ti.UI.createButton({
	title: "Sign Up",
	top: 30,
	right: 20
});
signUp.addEventListener("click", function(){
	var formWin = Ti.UI.createWindow({
		title: "Sign Up",
		backgroundColor: "#FFF",
		url: "form.js"
	});
	formWin.open();
});

currentWin.add(header);
signIn.add(signInText);
currentWin.add(signUp);
currentWin.add(passwordField);
currentWin.add(usernameField);
currentWin.add(signIn);
