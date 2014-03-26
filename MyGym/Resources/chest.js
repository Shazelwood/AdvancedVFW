var currentWin = Ti.UI.currentWindow;
Ti.include("JSON.js");

var button1 = Ti.UI.createButton({
	title: "BACK",
	color: "#1f1f1f",
	top: "20dp",
	left: "20dp"
});

button1.addEventListener("click", function(){
	currentWin.close();
});

var header = Ti.UI.createLabel({
	text: "CHEST",
	font:{
		fontSize: "100dp"
	},
	color: "#fc6060",
	top: "20dp"
});
var tableHolder = Ti.UI.createView({
	backgroundColor: "red",
	top: "150dp",
	bottom: "0dp"
});

var table = Titanium.UI.createTableView({
	//style: Ti.UI.iPhone.TableViewStyle.GROUPED
	
});

var theSections = [];
//create TableViewRows

for(var n in chest){
	var tableSection = Ti.UI.createTableViewSection({
		headerTitle: chest[n].headerTitle,
		//footerTitle: chest[n].footerTitle
	});
	for ( var i = 0, j = chest[n].rowData.length; i < j ; i++){
		var theRow = Ti.UI.createTableViewRow({
			color: "#fc6060",
			font:{
				color: "#FFF"
			},
			header: chest[n].headerTitle,
			title: chest[n].rowData[i].name,
			steps: chest[n].rowData[i].explaination,
			start: chest[n].rowData[i].image,
			finish: chest[n].rowData[i].image2,
			hasChild: true
		});
		console.log(chest[n].rowData[i].explaination.length);
		tableSection.add(theRow);
		
		theRow.addEventListener("click", function(e){
			var win = Ti.UI.createWindow({
				title: e.source.title,
				backgroundColor: "#FFF",
			});
			var header = Ti.UI.createLabel({
				text: e.source.header,
				font:{
					fontSize: "100dp"
				},
				color: "#fc6060",
				top: "20dp",
				opacity: 0.1
			});
			var headerExtra = Ti.UI.createLabel({
				text: e.source.title,
				font:{
					fontSize: "30dp"
				},
				top: "70dp",
				color: "#1f1f1f",
			});
			var holder = Ti.UI.createView({
				backgroundColor: "#fc6060",
				top: "150dp",
				bottom: 0
			});
			
			var stepHolder = Ti.UI.createView({
				top: "400dp",
				left: "50dp",
				right: "50dp",
				bottom: "50dp",
				layout: "vertical",
			});
			for (var l = 0; l < e.source.steps.length; l++){
				var steps = Ti.UI.createLabel({
					//backgroundColor: "#FFF",
					text: "Step " + (l + 1) + ": " +  e.source.steps[l],
					font:{
						fontSize: "20"
					},
					left: "20dp",
					bottom: "20dp",
					textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
				});
				stepHolder.add(steps);
			};
			var startImage = Ti.UI.createImageView({
				top: "50dp",
				left: "50dp",
				width: "300dp",
				height: "300dp",
				image: e.source.start
			});
			var endImage = Ti.UI.createImageView({
				top: "50dp",
				right: "50dp",
				width: "300dp",
				height: "300dp",
				image: e.source.finish
			});
			
			var button2 = Ti.UI.createButton({
				title: "BACK",
				color: "#1f1f1f",
				top: "20dp",
				left: "20dp"
			});
			button2.addEventListener("click", function(){
				win.close();
			});
			
			holder.add(stepHolder);
			holder.add(startImage);
			holder.add(endImage);
			win.add(holder);
			win.add(button2);
			win.add(header);
			win.add(headerExtra);
			win.open();
		});
	};
	theSections.push(tableSection);
}
table.setData(theSections);
tableHolder.add(table);
currentWin.add(header);
currentWin.add(button1);
currentWin.add(tableHolder);