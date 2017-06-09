var window = Ti.UI.createWindow({
    backgroundColor:'white',
});

// var text1 = Ti.UI.createLabel({
// 	text: 'GoOogle',
// 	color: '#888',
//   	font: {fontSize:40, fontWeight:'bold'},
//   	top: 235
// });

var image = Ti.UI.createImageView({
    image:'/assets/images/google-logo.png',
    width: 140,
    height: 135,
    top: 215
});

window.add(image);

var search = Ti.UI.createSearchBar({
    barColor:'#00BFFF',
    center: {x: Ti.UI.SIZE, y: Ti.UI.SIZE},
    left: 35,
    right:35,
    borderRadius: 7
});


search.addEventListener('return', function (event) {
    var result = search.getValue();
    console.log(result.toLocaleLowerCase());
    
    
    
    
    var w = Titanium.UI.createView({
 		backgroundColor:'white',
 		title:'New View',
 		barColor:'black'
 	});
 	var text2 = Ti.UI.createLabel({
		text: 'GoOogle',
		color: '#888',
  		font: {fontSize:30, fontWeight:'bold'},
  		top: 20
	});

	var search1 = Ti.UI.createTextField({
    	color:'#00BFFF',
    	borderStyle : Ti.UI.INPUT_BORDERSTYLE_BEZEL,
    	borderRadius: 5,
    	left: 20,
    	right: 20,
    	top: 70,
    	value: result,
    	clearButtonMode: 1
	});
	
var url = "https://www.googleapis.com/customsearch/v1?key=AIzaSyCMOhRm3gKQtoufVKzsFXPFzj6BxRULiHM&cx=014247543586542351054:ovbnw0un3qm&q=" + result;
var xhr = Ti.Network.createHTTPClient({
    onload: function(e) {
		// this function is called when data is returned from the server and available for use
        // this.responseText holds the raw text return of the message (used for text/JSON)
        // this.responseXML holds any returned XML (including SOAP)
        // this.responseData holds any returned binary data
        Ti.API.debug(this.responseText);
        
        var res = JSON.parse(this.responseText);
        console.log("JSON array LENGTH ", res.items.length); 
        console.log("JSON array ", res.items);
        console.log("The url: ", res.items[0].pagemap["cse_thumbnail"][0].src);
        alert('success');
        
        var listView = Ti.UI.createListView({
        	top: 110
        });
        
		var sections = [];
		var googleSection = Ti.UI.createListSection({ 
			headerTitle: 'Results: ',
		});
		
		var googleDataSet = [];
		for(var i = 0; i < res.items.length; i++){
        
        	googleDataSet.push({properties: { title: "# - " + res.items[i].htmlTitle}});

        }
        console.log("googleDataSet ", googleDataSet);
		
		googleSection.setItems(googleDataSet);
		sections.push(googleSection);
			
		listView.sections = sections;
		w.add(listView);        
    },
    onerror: function(e) {
		// this function is called when an error occurs, including a timeout
        Ti.API.debug(e.error);
        alert('error');
    },
    timeout:5000  /* in milliseconds */
});

xhr.open("GET", url);
xhr.send();  // request is actually sent with this statement

	search1.addEventListener('change', function (event) {
    	if (!search1.getValue()) {
			window.remove(w);
			search.value = '';
			console.log("Boom!!!");
		} else {
			console.log("Shterg!!!");
		}
		
	});
	
 	w.add(text2);
 	w.add(search1);
 	window.add(w);
 	 	
});

//AIzaSyCMOhRm3gKQtoufVKzsFXPFzj6BxRULiHM - my key
//014247543586542351054:azfo2ckcwky
//014247543586542351054:ovbnw0un3qm
window.add(text1);
window.add(search);
window.open();