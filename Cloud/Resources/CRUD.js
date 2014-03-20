var currentWin = Ti.UI.currentWindow;

var dataB = Ti.Database.open("UserDB");
dataB.execute("CREATE TABLE IF NOT EXISTS user(id INTEGER PRIMARY KEY, firstname TEXT, lastname TEXT)");
var tableHolder = Ti.UI.createView({
	top: "30%",
	bottom: 0,
});
var close = Ti.UI.createButton({
	title: "back",
	text: "back",
	top: "10%",
	left: "10%"
});

close.addEventListener("click", function(){
	currentWin.close();
});

var buildRow = function () {
	var data = [];
	var test = dataB.execute("SELECT * FROM user");
	
	while (test.isValidRow()) {
		var firstname = test.fieldByName('firstname');
		var lastname = test.fieldByName('lastname');
		var id = test.fieldByName('id');

		data.push({
			firstname : firstname,
			lastname : lastname,
			title : firstname + " " + lastname,
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

	//console.log(e.source.id);
	//console.log(e.rowData.id);
	var id = e.source.id;
	//Displays the prompt
	prompt.visible = true;
	promptHolder.visible = true;
	
	//SQL Delete
	button1.addEventListener("click", function(e){
		dataB.execute("DELETE FROM user WHERE id=?", id);
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
currentWin.add(tableHolder);
tableHolder.add(table);
currentWin.add(close);
currentWin.add(promptHolder);
currentWin.add(prompt);
