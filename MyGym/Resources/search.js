var currentWin = Ti.UI.currentWindow;

Ti.include("JSON.js");

var tableHolder = Ti.UI.createView({
	backgroundColor: "red",
	top: "150dp",
	bottom: "0dp"
});

var searchbar = Ti.UI.createSearchBar({
	hintText : 'Search',
	barColor : '#fff'
});

var table = Ti.UI.createTableView({
	top: 150,
	search : searchbar,
	font : {
		fontStyle : 'Helvetica',
		fontSize : 18
	}
});


var theSections = [];

for(var n in search){
	var tableSection = Ti.UI.createTableViewSection({
		headerTitle: search[n].headerTitle,
	});
	for ( var i = 0, j = search[n].rowData.length; i < j ; i++){
		var theRow = Ti.UI.createTableViewRow({
			color: "#fc6060",
			font:{
				color: "#FFF"
			},
			header: search[n].headerTitle,
			title: search[n].rowData[i].name,
			steps: search[n].rowData[i].explaination,
			start: search[n].rowData[i].image,
			finish: search[n].rowData[i].image2,
			hasChild: true
		});
		//console.log(legs[n].rowData[i].explaination.length);
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
	// console.log(search[n].headerTitle);
	// console.log(search[n].rowData);
	};
	theSections.push(tableSection);
};
table.setData(theSections);

var button1 = Ti.UI.createButton({
	title: "BACK",
	color: "#1f1f1f",
	top: "40dp",
	left: "20dp"
});

button1.addEventListener("click", function(){
	currentWin.close();
});

table.addEventListener('click', function(e) {
	
});
currentWin.add(table);
currentWin.add(button1);
