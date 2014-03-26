var currentWin = Ti.UI.currentWindow;

var header = Ti.UI.createLabel({
	text: "GALLERY",
	font:{
		fontSize: "100dp"
	},
	color: "#fc6060",
	top: "20dp"
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

var galleryHolder = Ti.UI.createView({
	layout: "horizontal",
	bottom: 0,
	top: 150,
	backgroundColor: "#fc6060"
});

var button2 = Ti.UI.createButton({
	title: "Camera",
	top: "40dp",
	right: "20dp"	
});

button2.addEventListener("click", function(){
	var dialog = Titanium.UI.createOptionDialog({
	    title: 'Choose an image source...',
	    options: ['Camera','Photo Gallery', 'Cancel'],
	    cancel:2
	});
	dialog.addEventListener('click', function(e) {
	    if(e.index == 0)
	    {
	        Titanium.Media.showCamera({
	            success:function(event)
	            {
	                var image = event.media; 
	                if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
	                {
	                    //we may create image view with contents from image variable
	                    //or simply save path to image
	                    
	                    var imageView = Ti.UI.createImageView({
	                    	image: image,
	                    	path: image.nativePath,
	                    	width: "200dp",
	                    	height: "200dp",
	                    	top: "20dp",
	                    	left: "20dp"
	                    });
	                    var label = Ti.UI.createLabel({
	                    	text: imageView.path
	                    }); 
	                    galleryHolder.add(label);
	                    galleryHolder.add(imageView);
	                }
	            },
	            cancel:function()
	            {
	                
	            },
	            error:function(error)
	            {
	                //error happend, create alert
	                var a = Titanium.UI.createAlertDialog({title:'Camera'});
	                //set message
	                if (error.code == Titanium.Media.NO_CAMERA)
	                {
	                    a.setMessage('Device does not have camera');
	                }
	                else
	                {
	                    a.setMessage('Unexpected error: ' + error.code);
	                }
	 
	                // show alert
	                a.show();
	            },
	            allowImageEditing:true,
	            saveToPhotoGallery:true
	        });
	    }
	    else if(e.index == 1)
	    {
	        //obtain an image from the gallery
	        Titanium.Media.openPhotoGallery({
	            success:function(event)
	            {
	                //getting media
	                var image = event.media; 
	                // set image view
	                 
	                //checking if it is photo
	                if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
	                {
	                    var imageView = Ti.UI.createImageView({
	                    	image: image,
	                    	path: image.nativePath,
	                    	width: "200dp",
	                    	height: "200dp",
	                    	top: "20dp",
	                    	left: "20dp"
	                    });
	                    galleryHolder.add(imageView);
	                    Ti.App.Properties.setString("image", image.nativePath); 
	                }   
	            },
	            cancel:function()
	            {
	                //user cancelled the action fron within
	                //the photo gallery
	                dialog.hide();
	            }
	        });
	    }
	    else
	    {
	        //cancel was tapped
	        //user opted not to choose a photo
	    }
	});
	//show dialog
	dialog.show();
});

currentWin.add(header);
currentWin.add(button2);
currentWin.add(button1);
currentWin.add(galleryHolder);
