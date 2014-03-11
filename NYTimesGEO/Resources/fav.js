//Window Start
var favWin = Ti.UI.createWindow({
	title : 'Stored',
	backgroundColor : 'red'
});
exports.favWin = favWin;
//Window End

var dataB = Ti.Database.open("GeoDB");
dataB.execute('CREATE TABLE IF NOT EXISTS location(id INTEGER PRIMARY KEY, name TEXT, population TEXT, longitude INTEGER, latitude INTEGER, distance TEXT, county TEXT, state TEXT)');

var buildRow = function () {
	var data = [];
	var test = dataB.execute("SELECT * FROM location");
	
	while (test.isValidRow()) {
		var name = test.fieldByName('name');
		var state = test.fieldByName('state');
		var county = test.fieldByName('county');
		var latitude = test.fieldByName('latitude');
		var longitude = test.fieldByName('longitude');
		var distance = test.fieldByName('distance');
		var population = test.fieldByName('population');
		var id = test.fieldByName('id');

		data.push({
			title : name,
			state : state,
			county : county,
			latitude : latitude,
			longitude : longitude,
			distance : distance,
			population: population,
			id : id
		});
		test.next();
	};
	return data;
};

var table = Ti.UI.createTableView();

table.setData(buildRow());

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
	title: "yes",
	left: 20,
	bottom: 20
});

//Cancel (closes the prompt)
var button3 = Ti.UI.createButton({
	title: "no",
	right: 20,
	bottom: 20
});
var label = Ti.UI.createLabel({
	text: "Would you like to delete this item?",
	font: {fontSize: 14},
	top: 20
});

prompt.add(button1, button3, label);
prompt.visible = false;
promptHolder.visible = false;
////////////////////////////////////// Prompt //////////////////////////////////////


table.addEventListener("scrollend", function(){
	table.setData(buildRow());
	alert("Your favorites have been updated");
});

table.addEventListener("click", function(e){
	var id = e.source.id;
	
	//Displays the prompt
	prompt.visible = true;
	promptHolder.visible = true;
	
	//SQL Delete
	button1.addEventListener("click", function(e){
		dataB.execute("DELETE FROM location WHERE id=?", id);
		prompt.visible = false;
		promptHolder.visible = false;
		table.setData(buildRow());
	});
	
	//Cancel
	button3.addEventListener("click", function(){
		prompt.visible = false;
		promptHolder.visible = false;
	});

});
favWin.add(table, promptHolder, prompt);
