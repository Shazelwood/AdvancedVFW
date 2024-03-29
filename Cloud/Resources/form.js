var currentWin = Ti.UI.currentWindow;
var Cloud = require('ti.cloud');

var cancel = Ti.UI.createButton({
	top: 600,
	right: 50, 
	title: "cancel"
});

cancel.addEventListener("click", function(){
	currentWin.close();
});



var scrollView = Titanium.UI.createScrollView({
	backgroundColor: "#FFF",
    contentWidth: 'auto',
    contentHeight: 'auto',
    top: 30,
    bottom: 0,
    showVerticalScrollIndicator: true,
    showHorizontalScrollIndicator: true
});
 
currentWin.add(scrollView);
 
var firstName = Titanium.UI.createLabel({
    color:'#001245',
    text:'First',
    top:180,
    left:30,
    width:100,
    height:'auto'
});
 
var firstNameField = Titanium.UI.createTextField({
    hintText:'Shae',
    height:35,
    top:205,
    left:30,
    width:250,
    color: "#000",
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
 
var lastName = Titanium.UI.createLabel({
    color:'#001245',
    text:'Last',
    top:245,
    left:30,
    width:200,
    height:'auto'
});
 
var lastNameField = Titanium.UI.createTextField({
    hintText:'Hazelwood',
    height:35,
    top:270,
    left:30,
    width:250,
    color: "#000",
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
 
var email = Titanium.UI.createLabel({
    color:'#001245',
    text:'Email Address',
    top:310,
    left:30,
    width:200,
    height:'auto'
});
 
var emailField = Titanium.UI.createTextField({
    hintText:'email@',
    height:35,
    top:335,
    left:30,
    width:250,
    color: "#000",
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
    keyboardType:Titanium.UI.KEYBOARD_EMAIL,
    returnKeyType:Titanium.UI.RETURNKEY_DONE
});
 
var username = Titanium.UI.createLabel({
    color:'#001245',
    text:'username',
    top:375,
    left:30,
    width:200,
    height:'auto'
});
 
var usernameField = Titanium.UI.createTextField({
    hintText:"Shazelwood1995",
    height:35,
    top:400,
    left:30,
    width:250,
    blur:true,
    color: "#000",
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
 
var password = Titanium.UI.createLabel({
    color:'#001245',
    text:'Password',
    top:440,
    left:30,
    width:200,
    height:'auto'
});
 
var passwordField = Titanium.UI.createTextField({
    hintText:"**********",
    height:35,
    top:465,
    left:30,
    width:250,
    blur:true,
    color: "#000",
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
 
var passwordCheck = Titanium.UI.createLabel({
    color:'#001245',
    text:'Re-Type Password',
    top:505,
    left:30,
    width:200,
    height:'auto'
});
 
var passwordCheckField = Titanium.UI.createTextField({
    hintText:"*********",
    height:35,
    top:530,
    left:30,
    width:250,
    blur:true,
    color: "#000",
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});

var profilePic = Ti.UI.createImageView({
	top: 20,
	left: 30, 
	width: 150,
	height: 150,
	borderWeight: 30,
	backgroundColor: "#001245",
	image: ""
});

var createBTN = Ti.UI.createButton({
	top: 600, 
	left: 50,
	title: "Create User"
});

profilePic.addEventListener("click", function(){
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
	                    Ti.App.Properties.setString("image", image.nativePath);
	                    // var imageView = Ti.UI.createImageView({
	                    	// height: 'auto',
	                    	// width: 'auto',
							// image: image
						// });
						profilePic.image = image;
	                }
	            },
	            cancel:function()
	            {
	                //do somehting if user cancels operation
	            },
	            error:function(error)
	            {
	                var a = Titanium.UI.createAlertDialog({title:'Camera'});
	                if (error.code == Titanium.Media.NO_CAMERA)
	                {
	                    a.setMessage('Device does not have camera');
	                }
	                else
	                {
	                    a.setMessage('Unexpected error: ' + error.code);
	                }
	                a.show();
	            },
	            allowImageEditing:true,
	            saveToPhotoGallery:true
	        });
	    }
	    else if(e.index == 1)
	    {
	        Titanium.Media.openPhotoGallery({
	            success:function(event)
	            {
	                var image = event.media; 
	                if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
	                {
	                   Ti.App.Properties.setString("image", image.nativePath);
	                   // var imageView = Ti.UI.createImageView({
	                    	// height: 'auto',
	                    	// width: 'auto',
							// image: image
						// });
						// profilePic.add(imageView);
						profilePic.image = image; 
	                }   
	            },
	            cancel:function()
	            {
	                
	            }
	        });
	    }
	    else
	    {
	        //cancel was tapped
	        //user opted not to choose a photo
	    }
	});
	dialog.show();
});
createBTN.addEventListener("click", function(){
	Cloud.Users.create({
		username: usernameField.value,
	    email: emailField.value,
	    first_name: firstNameField.value,
	    last_name: lastNameField.value,
	    password: passwordField.value,
	    password_confirmation: passwordCheckField.value,
	    photo: profilePic.image
	    
	}, 
	function (e) {
	    if (e.success) {
	        var user = e.users[0];
	        alert('Success:\n' +
	            'id: ' + user.id + '\n' +
	            'sessionId: ' + Cloud.sessionId + '\n' +
	            'first name: ' + user.first_name + '\n' +
	            'last name: ' + user.last_name);
	            currentWin.close();
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
});


scrollView.add(cancel);
scrollView.add(createBTN);
scrollView.add(passwordCheckField);
scrollView.add(passwordCheck);
scrollView.add(passwordField);
scrollView.add(password);
scrollView.add(usernameField);
scrollView.add(username);
scrollView.add(emailField);
scrollView.add(email);
scrollView.add(lastNameField);
scrollView.add(lastName);
scrollView.add(firstNameField);
scrollView.add(firstName); 
scrollView.add(profilePic);