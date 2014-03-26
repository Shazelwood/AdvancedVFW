var currentWin = Ti.UI.currentWindow;
// pob = Part of Body
// name = workout's name
// steps = array of steps

var header = Ti.UI.createLabel({
	text: "WORKOUT",
	font:{
		fontSize: "100dp"
	},
	color: "#fc6060",
	top: "20dp"
});

var dataB = Ti.Database.open("GymDB");
dataB.execute("CREATE TABLE IF NOT EXISTS gym(id INTEGER PRIMARY KEY, pob TEXT, name TEXT, steps TEXT);");
var tableView = Ti.UI.createTableView();

var tableHolder = Ti.UI.createView({
	top: "150dp",
	bottom: "0dp"
});

var button1 = Ti.UI.createButton({
	title: "BACK",
	color: "#1f1f1f",
	top: "40dp",
	left: "20dp"
});

button1.addEventListener("click", function(){
	currentWin.close();
});

var buildRow = function () {
	var dataArray = [];

	var rows = dataB.execute("SELECT * FROM gym");

	while (rows.isValidRow()){
		var id, pob, name, steps;

		id = rows.fieldByName('id');
		part = rows.fieldByName('pob');
		workout = rows.fieldByName('name');
		steps = rows.fieldByName('steps');

		dataArray.push({
			title:	workout + " (" + part + ")",
			id:		id,
			workout:	workout,
			steps:	steps
		});
		rows.next();
	};
	return dataArray;
};

var button = Ti.UI.createButton({
	title: "Register",
	right: 10,
	top: 0
});

button.addEventListener("click", function(){
	formWin.open();
	button2.addEventListener("click",function(){
		dataB.execute("INSERT INTO game(name,number,team) VALUES (?,?,?)", field1.value, field2.value, field3.value);

		field1.value = "";
		field2.value = "";
		field3.value = "";

		formWin.close();
		tableView.setData(buildRow());
	});
});

var dim = Ti.UI.createView({
		width: Ti.UI.FIIL,
		height: Ti.UI.FILL,
		backgroundColor: "black",
		opacity: 0.8
	});
dim.visible = false;
tableView.addEventListener("longpress", function(e){
	var test = e.source.id;
	dim.visible = true;
	var prompt = Ti.UI.createView({
		backgroundColor: "#FFF",
		width: 200,
		height: 100,
		borderRadius: 20
	});
	var button1 = Ti.UI.createButton({
		title: "Delete",
		right: 20,
		bottom: 20
	});
	var button2 = Ti.UI.createButton({
		title: "Edit",
		left: 20,
		bottom: 20
	});
	var button3 = Ti.UI.createButton({
		title: "cancel",
		bottom: 5
	});
	var label = Ti.UI.createLabel({
		text: "What would you like to do?",
		font: {fontSize: 14},
		top: 20
	});
	// //Edit
	// button2.addEventListener("click", function(){
		// formWin.open();
		// button2.addEventListener("click", function(){
			// dataB.execute("UPDATE game SET name = ?, number = ?, team = ? WHERE id = ?",field1.value, field2.value, field3.value, test);
			// formWin.close();
			// prompt.visible = false;
		 	// dim.visible = false;
			// tableView.setData(buildRow());
		// });
	// });
	//cancel
	button3.addEventListener("click", function(){
		prompt.visible = false;
		dim.visible = false;
	});
	//Delete
	button1.addEventListener("click", function(){
		dataB.execute("DELETE FROM gym WHERE id = ?", test);
		prompt.visible = false;
		dim.visible = false;
		tableView.setData(buildRow());
	});

	prompt.add(button1, button2, button3, label);
	currentWin.add(prompt);

});

tableHolder.add(tableView);
currentWin.add(tableHolder, dim);
tableView.setData(buildRow());

currentWin.add(header);
currentWin.add(button1);