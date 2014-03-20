var currentWin = Ti.UI.currentWindow;
var Cloud = require('ti.cloud');
var dataB = Ti.Database.open("UserDB");
dataB.execute("CREATE TABLE IF NOT EXISTS user(id INTEGER PRIMARY KEY, firstname TEXT, lastname TEXT)");
var table = Ti.UI.createTableView();

var holder = Titanium.UI.createScrollView({
	backgroundColor: "#7f93cc",
    contentWidth: 'auto',
    contentHeight: 'auto',
    top: 100,
    bottom: 0,
    showVerticalScrollIndicator: true,
    showHorizontalScrollIndicator: true,
    contentWidth: Ti.Platform.displayCaps.platformWidth,
    layout: "horizontal"
});

var header = Ti.UI.createLabel({
	text: "User",
	font:{
		fontSize: 60,
		fontFamily: "Helvetica Neue Thin"
	},
	top: 20,
	color: "#001245"
});

Cloud.Users.query({
    page: 1,
    per_page: 10,
}, function (e) {
    if (e.success) {
        alert('Success:\n' +
            'Count: ' + e.users.length);
        for (var i = 0; i < e.users.length; i++) {
            var user = e.users[i];
            var label = Ti.UI.createLabel({
            	text: user.first_name + " " + user.last_name,
            	color: "#000"
            });	
            var add = Ti.UI.createButton({
            	first: user.first_name,
            	last: user.last_name,
            	title: "Add+",
            	text: "Add+",
            	bottom: "10%",
            	right: "10%",
            });
            
            var row = Ti.UI.createView({
            	backgroundColor: "#FFF",
            	height: "20%",
            	left: 40,	
            	right: 40
            });
            var image = Ti.UI.createImageView({
            	image: "http://dogvacay.com/img/default_profile.jpg",
            	backgroundColor: "#000",
            	height: "80%",
            	left: 10,
            	width: "35%"
            });
            row.add(add);
            row.add(image);
            row.add(label);
            holder.add(row);
            add.addEventListener("click", function(e){
            	//console.log(e.source.first + " " + e.source.last);
            	var first = e.source.first;
            	var last = e.source.last;
            	dataB.execute("INSERT INTO user(firstname,lastname) VALUES (?,?)", first, last);
            });
		}
    } else {
        alert('Error:\n' +
            ((e.error && e.message) || JSON.stringify(e)));
    }
});

var list = Ti.UI.createButton({
	title: "Friends List",
	text: "Friends List",
	top: "10%",
	right: "5%",
});

list.addEventListener("click", function(){
	var crudWin = Ti.UI.createWindow({
		title: "Friends List",
		backgroundColor: "#FFF",
		url: "CRUD.js"
	});
	crudWin.open();
});

currentWin.add(list);
currentWin.add(header);
currentWin.add(holder);
//currentWin.add(cam);