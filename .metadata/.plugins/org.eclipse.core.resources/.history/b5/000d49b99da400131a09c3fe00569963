var currentWin = Ti.UI.currentWindow;

var holder = Ti.UI.createScrollView({
	height: 800,
	bottom: 0,
	width: Ti.UI.FILL,
	contentWidth: Ti.Platform.displayCaps.platformWidth,
	layout: "horizontal"
});

var data = [];
var response, listViews, headline, description, images, keywords;
var remoteResponse = function() {
    // Response function code
	response = JSON.parse(this.responseText);
	for (var i = 0; i < response.headlines.length; i++){
		data.push({
			id: i+1,
			headline:response.headlines[i].headline,
			info: response.headlines[i].description,
			images:	response.headlines[i].images,
			keywords: response.headlines[i].keywords,
			type:response.headlines[i].type
		});
		listViews = Ti.UI.createView({
			height: 200,
			backgroundColor: "black",
			bottom: 10,
			left: 20,
			right: 20,
			headline:data[i].headline,
			info: data[i].info,
			images:	data[i].images,
			keywords: data[i].keywords,
			type:response.headlines[i].type
		});
		images = Ti.UI.createImageView({
			width: 250,
			left: 0
		});
		headline = Ti.UI.createLabel({
			text: data[i].headline,
			font: {
				fontSize: 30
			},
			color: "white",
			top: "10%",
			left: images.width + 10,
			right: 20
		});
		keywords = Ti.UI.createLabel({
			text: "Het",
			font: {
				fontSize: 30,
				fontStyle: "bold"
			},
			color: "gray",
			bottom: 40,
			left: images.width + 10,
			right: 20
		});
		if (data[i].images.length === 0) {
			images.image = "http://www.whatiwantmykids2know.com/wp-content/uploads/2012/09/image-not-available.jpg";
		}else{
			images.image = data[i].images[0].url;
		};
		if (data[i].keywords.length === 0) {
			keywords.text = "Keywords unavailable";
		}else{
			for(var a=0,j=data[i].keywords.length; a<j; a++){
				keywords.text = data[i].keywords[a] + ", " +data[i].keywords[a-a] ;
			};
			
		};
		listViews.addEventListener("click", function(){
			var more = Ti.UI.createWindow({
				title: this.type,
				backgroundColor: "#535353",
			});
			var imageHolder = Ti.UI.createView({
				top: 20,
				left: 20,
				height: 300,
				width: 300,
			});
			var mainImage = Ti.UI.createImageView();
			var label1 = Ti.UI.createLabel({
				text: this.headline,
				color: "black",
				font: {
					fontSize: 40,
					fontWeight: "bold"
				},
				textAlign: "left",
				top: 100,
				left: imageHolder.width + 30,
				right: 20
			});
			var label2 = Ti.UI.createLabel({
				text: this.info,
				top: mainImage.height + 20,
				right: 20,
				left: 20,
				font:{
					fontSize: 40,
				},
				textAlign: "left"
			});
			var holder2 = Ti.UI.createView({
				backgroundColor: "#FFF",
				bottom: 10,
				left: 10,
				right: 10,
				top: 100
			});
			var holder3 = Ti.UI.createScrollView({
				height: 300,
				left: 0,
				right: 0,
				bottom: 20,
				contentWidth: Ti.Platform.displayCaps.platformWidth,
				layout: "horizontal",
			});
			
			if (this.images.length === 0) {
				alert("Image not found");
			} else{
				mainImage.image = this.images[0].url;
				for(var b = 0; b < this.images.length; b++){
					var picHolder = Ti.UI.createView({
						backgroundColor: "white",
						height: 250,
						width: 250,
						top: 10,
						left: 5,
						image: this.images[b].url,
						caption: this.images[b].caption
					});
					var pictures = Ti.UI.createImageView({
						image: this.images[b].url,
						caption: this.images[b].caption,
					});
					picHolder.add(pictures);
					picHolder.addEventListener("click", function(e){
						var holder = Ti.UI.createView();
						var trans = Ti.UI.createView({
							backgroundColor: "373737",
							opacity: 0.9,
							});
						var imagelarge = Ti.UI.createImageView({
							image: this.image,
							top: 350
						});
						var explain = Ti.UI.createLabel({
							bottom: 250,
							left:20,
							right:20,
							font:{
								fontSize: 30
							},
							backgroundColor: "eaeaea",
							text: this.caption
						});
						holder.add(trans,imagelarge, explain);
						
						holder.addEventListener("click", function(){
							holder.hide();
								
						});
							more.add(holder);
					});
					holder3.add(picHolder);
				};
				
			};
			var back = Ti.UI.createLabel({
				text:"	< BACK",
				color:"black",
				font:{
					fontSize: 50,
					fontWight: "bold",
				},
				backgroundColor: "red",
				width: 250,
				top: 30,
				left: 10
			});
			back.addEventListener("click", function(){
				more.close();
			});
			imageHolder.add(mainImage);
			holder2.add(imageHolder, label1, label2, holder3);
			more.add(holder2, back);
			more.open();
		});
		
		listViews.add(headline, images, keywords);
		holder.add(listViews);
	};
	
	
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

xhr.open("GET", "http://api.espn.com/v1/sports/basketball/nba/teams/14/news?apikey=7jw7varw94fh4qp68vdhu38t");
xhr.send();



currentWin.add(holder);