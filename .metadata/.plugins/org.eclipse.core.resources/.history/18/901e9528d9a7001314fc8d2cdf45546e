var currentWin = Ti.UI.currentWindow;

var dataB = Ti.Database.open("MarvelDB");
dataB.execute("CREATE TABLE IF NOT EXISTS marvel(id INTEGER PRIMARY KEY, name TEXT, image TEXT);");


////////// Main Window //////////
var holder = Ti.UI.createView({
	height: 500,
	bottom: 0,
	width: Ti.UI.FILL
});
var table = Ti.UI.createTableView();
var tableData = [];
holder.add(table);


////////// Team Window //////////
var teamTitle = Ti.UI.createLabel({
	text: "My Team",
	font:{
    	fontSize:'16',
    	fontWeight: "Bold" 
	},
	top: 30
});
var button = Ti.UI.createButton({
	title: "add",
	top: 25,
	right: 20
});
button.addEventListener("click", function(){
	teamWin.close();
});
var teamWin = Ti.UI.createWindow({
	backgroundColor: "#FFF",
	title: "Team"
});
var teamTable = Ti.UI.createTableView({
	height: 500,
	bottom: 0
});
teamWin.add(teamTable,teamTitle, button);



var buildRow = function () {
	var teamData = [];
	var test = dataB.execute("SELECT * FROM marvel");
	
	while (test.isValidRow()) {
		var id, name, image;
		name = test.fieldByName('name');
		image = test.fieldByName('image');
		id = test.fieldByName('id');
		
		console.log(id);
		console.log(name);
		console.log(image);
		console.log("+++++++++++++++++++++============================++++++++++++++++++++++++");		
	
		teamData.push({
			id: id,
			title: name,
			image: image
		});
		test.next();
	};
	return teamData;
};

var response, label, row;

////////////////////////////////////// Prompt //////////////////////////////////////
var promptHolder = Ti.UI.createView({
	width: Ti.UI.FIIL,
	height: Ti.UI.FILL,
	backgroundColor: "black",
	opacity: 0.8
});
var prompt = Ti.UI.createView({
	backgroundColor: "#FFF",
	width: 200,
	height: 100,
	borderRadius: 20
});

//Delete button
var button1 = Ti.UI.createButton({
	title: "Delete",
	right: 20,
	bottom: 20
});

//Edit Button
var button2 = Ti.UI.createButton({
	title: "Replace",
	left: 20,
	bottom: 20
});

//Cancel (closes the prompt)
var button3 = Ti.UI.createButton({
	title: "cancel",
	bottom: 5
});
var label = Ti.UI.createLabel({
	text: "What would you like to do?",
	font: {fontSize: 14},
	top: 20
});

prompt.add(button1, button2, button3, label);
prompt.visible = false;
promptHolder.visible = false;
teamWin.add(promptHolder, prompt);
////////////////////////////////////// Prompt //////////////////////////////////////



var remoteResponse = function() {
    response = JSON.parse(this.responseText);
    //opens Team window
    var button4 = Ti.UI.createButton({
    	title: "Team",
    	top: 25,
    	right: 20
    });
    
    button4.addEventListener("click", function(){
    	var test = dataB.execute('SELECT * from marvel');
    		teamWin.open();
    		teamTable.setData(buildRow());
    		
    		teamTable.addEventListener("click", function(e){
				var id = e.source.id;
				var name = e.source.title;
				var image = e.source.image;
				
				console.log( name + "'s id number is " + id);
				
				var data = dataB.execute("SELECT * FROM marvel WHERE id=?", id);
				prompt.visible = true;
				promptHolder.visible = true;
				
				//SQL Delete
				button1.addEventListener("click", function(){
					dataB.execute("DELETE FROM marvel WHERE id=?", id);
					prompt.visible = false;
					promptHolder.visible = false;
					teamTable.setData(buildRow());
				});
				//SQL Update
				button2.addEventListener("click", function(){
					
					teamWin.close();
					table.addEventListener("longpress", function(e){
						
						//console.log(id);
						console.log(e.source.data.id);
						//console.log(image);
						console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
						
						dataB.execute("UPDATE marvel SET name=?, image=? WHERE id=?", e.source.data.name, e.source.data.image, id);
						
						prompt.visible = false;
						promptHolder.visible = false;
						
						
						teamTable.setData(buildRow());
						teamWin.open();
						console.log("Replace........2");
					});
			
					console.log("Replace........1");
				});
				
				button3.addEventListener("click", function(){
					prompt.visible = false;
					promptHolder.visible = false;
				});
				
    		});
    		teamTable.setData(buildRow());
    });
    currentWin.add(button4);
    //creates the rows for the main window table.
    for (i = 0; i < response.data.results.length ; i++){
		row = Ti.UI.createTableViewRow({
			height: 110,
			data: {
				image: response.data.results[i].thumbnail.path + "/standard_fantastic." + response.data.results[i].thumbnail.extension,
				name: response.data.results[i].name
			}
    	});	
    	image = Ti.UI.createImageView({
    		height: 100,
    		width: 100,
    		left: 5,
    		image: response.data.results[i].thumbnail.path + "/standard_fantastic." + response.data.results[i].thumbnail.extension,
    	});
    	label = Ti.UI.createLabel({
    		left: 105,
    		top: 5,
    		text: i + 1 + ". " + response.data.results[i].name
    	});
    	row.add(label, image);
    	
    	tableData.push(row);
    }
    table.setData(tableData);
    table.addEventListener("click" , function(e){
		//SQL Create
		dataB.execute("INSERT INTO marvel(name,image) VALUES (?,?)", e.source.data.name, e.source.data.image);
		alert(e.source.data.name + " has been added to your team!");
    	});
};

    	

var remoteError = function(e) {
    Ti.API.debug("Status: " + this.status);
    Ti.API.debug("Text: " + this.responseText);
    Ti.API.debug("Error: " + e.error);
    alert("There's a problem pulling remote data");
};

var xhr = Ti.Network.createHTTPClient({
    onload: remoteResponse,
    onerror: remoteError,
    timeout:5000
});

var ts = (new Date).getTime();
var publicKey = "60c41c64f7472f2bb1fe01527905b722";
var privateKey = "a8a3c90c4ca7182e5fe56776aee78e92479332de";
var hash = Titanium.Utils.md5HexDigest(ts+privateKey+publicKey);
Ti.API.info(hash);

var url = "http://gateway.marvel.com/v1/public/characters?limit=100&ts=" + ts + "&apikey=" + publicKey + "&hash=" + hash;     

Ti.API.info(url);


xhr.open("GET", url);
xhr.send();

currentWin.add(holder, teamWin);
