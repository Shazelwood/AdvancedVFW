var currentWin = Ti.UI.currentWindow;
Ti.include("JSON.js");


var table = Titanium.UI.createTableView({
	style: Ti.UI.iPhone.TableViewStyle.GROUPED
	
});

Ti.API.info(arm);
var theSections = [];
//create TableViewRows

for(var n in arm){
	var tableSection = Ti.UI.createTableViewSection({
		headerTitle: arm[n].headerTitle,
		//footerTitle: arm[n].footerTitle
	});
	for ( var i = 0, j = arm[n].rowData.length; i < j ; i++){
	var theRow = Ti.UI.createTableViewRow({
		header: arm[n].headerTitle,
		title: arm[n].rowData[i].name,
		hasChild: true
	});
	tableSection.add(theRow);
	};
	theSections.push(tableSection);
}
table.setData(theSections);
currentWin.add(table);