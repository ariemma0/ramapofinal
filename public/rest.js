// JavaScript Document
var clicks = 0;  
var DELAY = 400;
var timer = null ;
var markers = [];
var origin1;
var adderror = false;
var changed = false;
//===============================* updating functions *=======================================
//---  function to show the update screen related to the line detailed button 
var update_items = (function(){
	$('#upbuttonmy').off("click").on("click",  update_confirm);
	$('#upbuttoncnl').off("click").on("click",  update_cancel);
	var lineno = $(this).data('numb');
	$('#main_select').fadeTo(0, 0.4);  // fade screen to display update
	console.log("update screen ", lineno);
	$('ul').off("click"); 
	$('#my_refreshbutton').off("click");  
	$('#my_addbutton').off("click"); 
	$('#tooltipc1').off()   // clear event handlers
	$('#tooltipc2').off()
	$('#tooltipc3').off()
	// display update screen
	$('#main_update').css({ top:'50px' }).show().data('numb', lineno );
	console.log(document.getElementById('anchorname0'));
	
	document.getElementById('up_dbid').value = document.getElementById('my_dbid'+lineno ).innerText;
	document.getElementById('up_name').value = document.getElementById('my_name'+lineno ).innerText;
	document.getElementById('up_rwebaddr').value = document.getElementById('anchorname'+lineno).href;
	document.getElementById('up_rmenu').value = document.getElementById('anchormenu'+lineno).href;
	document.getElementById('up_yelp').value = document.getElementById('anchoryelp'+lineno).href;
	document.getElementById('up_phone').value = document.getElementById('my_phone'+lineno).innerText;
	document.getElementById('up_addr').value = document.getElementById('my_addr'+lineno).innerText;
	document.getElementById('up_town').value = document.getElementById('my_town'+lineno).innerText;
	document.getElementById('up_state').value = document.getElementById('my_state'+lineno).innerText;
	document.getElementById('up_comment').value = document.getElementById('my_comment'+lineno).innerText;  
    document.getElementById('up_position').value = document.getElementById('my_position'+lineno).innerText; 
    document.getElementById('up_distance').value = document.getElementById('my_distance'+lineno).innerText; 
    string_region = $('#my_region' + lineno).data('numb') ;
    var numb_region=0;

    if (isNaN(string_region) ) numb_region=0;
    else numb_region = parseInt(string_region);
	var selregion = document.getElementById("up_region");
    selregion.options[numb_region].selected = true;

    var selcuisine = document.getElementById("up_cuisine");
	  for(var j = 0; j< selcuisine.options.length;j++)
	  {    
		    	 selcuisine.options[j].selected = false;
	
	   }	
    $('#main_update_confirm').css({ 'top': 60 + 'px' }).show().data('numb', lineno );

    string_cuisine = $('#my_cuisine' + lineno).data('numb').toString() ;
   
        for (var j = 0; j< string_cuisine.length;j++)
        {   if (isNaN(string_cuisine[j]) ) alert('jjnb');
			else 
			{    numb_cuisine = parseInt(string_cuisine[j]);
		    	 selcuisine.options[numb_cuisine].selected = true;
                 
		    }	 
		} 
	   debugger;

});


// this function called from a button displayed by the update_item function on the 
// display section 'main_update_confirm', to cancel the update process 	
var update_cancel = (function(){
	console.log("update canceled");

	buttons_on();
});

// this function called from a button displayed by the update_item function on the 
// display section 'main_update_confirm', to confirm the update process 	
var update_confirm = (function(){
	var lineno = $('#main_update').data('numb') ;
	var lineid = '#myline' + lineno ;
	console.log("write update ajax function here" );
    var id = lineno;
    
    var up_address = document.getElementById('up_addr').value +","+ document.getElementById('up_town').value +","+ document.getElementById('up_state').value;
    
    if (up_address==",,") up_address = "new york,NY"
    console.log(up_address);
    
	 geocoder = new google.maps.Geocoder();
	 geocoder.geocode({ 'address': up_address }, function(results, status) 
	  {
              if (status == google.maps.GeocoderStatus.OK) 
			  {
                    console.log(google.maps.GeocoderStatus.OK);
		
					var position = results[0].geometry.location; 
					console.log("nn"+ results[0].geometry.location + position  ); 
			   }
			   else{
				   console.log("error at add geolocation" + google.maps.GeocoderStatus.OK);	
			       document.getElementById('up_addr').value = "";
			       document.getElementById('up_town').value = "new york";
			       document.getElementById('up_state').value ="NY";
			       update_confirm();
			       buttons_on();
			     	   }	
				
					document.getElementById('up_position').value = position;
			  
			  		 
					var up_name     = document.getElementById('up_name').value ;
                    var up_rwebaddr  = document.getElementById('up_rwebaddr').value ;
					var up_rmenu     = document.getElementById('up_rmenu').value ;
					var up_yelp     = document.getElementById('up_yelp').value ;
					var up_phone    = document.getElementById('up_phone').value ;
					var up_addr     = document.getElementById('up_addr').value ;
					var up_town     = document.getElementById('up_town').value ;
					var up_state    = document.getElementById('up_state').value ;
					var up_comment  = document.getElementById('up_comment').value ; 
					var up_dbid     = document.getElementById('up_dbid').value ; 
					var up_position = document.getElementById('up_position').value ;  
					var up_distance = document.getElementById('up_distance').value ; 
					markers[lineno].setPosition(position);
							//kkkkkkkkkkkkkk			
		 	        var destinationA = position;
		 	        debugger;
                    var service = new google.maps.DistanceMatrixService();
                    service.getDistanceMatrix(
                               {
                                  origins     : [origin1],
                                  destinations: [destinationA],
                                  travelMode  : 'DRIVING',
                                  unitSystem  : google.maps.UnitSystem.IMPERIAL,
                               }, resultdistanceup);

                                   function resultdistanceup(response, status) {
                                   // See Parsing the Results for
                                        if (status !== 'OK') {alert('Error was: add ' + status);}
                                        else {
                                            //    var outputDiv = document.getElementById('output');
                                              for (var i = 0; i < response.rows.length; i++) {
                                              var results = response.rows[i].elements;
                                              for (var j = 0; j < results.length; j++) {
                            
                                                document.getElementById('up_distance').value = results[j].distance.text ;
                                                document.getElementById('my_time'+lineno ).innerText = results[j].duration.text ;
                                                var up_name     = document.getElementById('up_name').value ;
												var up_rwebaddr  = document.getElementById('up_rwebaddr').value ;
												var up_rmenu     = document.getElementById('up_rmenu').value ;
												var up_yelp     = document.getElementById('up_yelp').value ;
												var up_phone    = document.getElementById('up_phone').value ;
												var up_addr     = document.getElementById('up_addr').value ;
												var up_town     = document.getElementById('up_town').value ;
												var up_state    = document.getElementById('up_state').value ;
												var up_comment  = document.getElementById('up_comment').value ; 
												var up_dbid     = document.getElementById('up_dbid').value ; 
												var up_position = document.getElementById('up_position').value ;  
												var up_distance = document.getElementById('up_distance').value ; 
												var up_region = '*'; 
												up_region = up_region + (document.getElementById("up_region").value);
												$('#my_region'+lineno).data('numb',(document.getElementById("up_region").value));
												debugger;
												var up_cuisine = '*'; 
												var upsavecuise =""
												var x=document.getElementById("up_cuisine");
                                                 for (var i = 0; i < x.options.length; i++)
                                                 {
                                                      if(x.options[i].selected ==true)
                                                      {   up_cuisine = up_cuisine +(x.options[i].value);
													      upsavecuise = upsavecuise + x.options[i].value	  
													  }
                                                 }
												$('#my_cuisine'+lineno).data('numb',(upsavecuise));
												debugger;
												
						                        // ajax call to update item on server
	                                            var jax = $.post('update', { id : up_dbid,	p_name : up_name, p_rwebaddr : up_rwebaddr, p_rmenu : up_rmenu, 
													         p_yelp : up_yelp, p_phone : up_phone, p_addr : up_addr, p_town : up_town, p_state : up_state,
													         p_comment : up_comment, p_position : up_position, p_distance : up_distance, p_region: up_region, p_cuisine: up_cuisine });
			        
												jax.done( function (data) {
													if (data.result == 'updated' )
													{    // confirm back everything worked on server
														console.log("update return from server ");
                             
													}
													else 
													{   // something went wrong
														console.log("invalid return");
													}
												 }); // end ajax .done
                                              }
                                            }
                                       }
                                   };
      
                                   // the basics of a callback function.
                			
		//kkkkkkkkkkkkkkkkkkkkk			
					 
				
	                 // 
			  	
	   });			    
    
	buttons_on();
	document.getElementById('my_name'+lineno ).innerText = document.getElementById('up_name').value  ;
	document.getElementById('anchorname'+lineno).href = document.getElementById('up_rwebaddr').value;
	document.getElementById('anchormenu'+lineno).href = document.getElementById('up_rmenu').value ;
	document.getElementById('anchoryelp'+lineno).href = document.getElementById('up_yelp').value ;
	document.getElementById('my_phone'+lineno).innerText = document.getElementById('up_phone').value ;
	document.getElementById('my_addr'+lineno).innerText = document.getElementById('up_addr').value ;
	document.getElementById('my_town'+lineno).innerText = document.getElementById('up_town').value ;
	document.getElementById('my_state'+lineno).innerText = document.getElementById('up_state').value ;
	document.getElementById('my_comment'+lineno).innerText = document.getElementById('up_comment').value ; 

});		
		
//===================================* show item detail *====================================================
//---  function to show the detail item related to the line detailed button 
var detail_buttons = (function(){
	var lineid = '#moreline' + $(this).data('numb');
	console.log(lineid);
	$(lineid).toggle();
});

//=====================================* delete/remove functions *====================================================
//--- function handles deleting an entry	
var delete_item = (function(lineno){
	$('#deletebutton').off("click").on("click",  delete_confirm);
	$('#deletebuttoncnl').off("click").on("click",  delete_cancel);
    // lineno is the line number that the mpouse button was clicked on
	$('#main_select').fadeTo(0, 0.4);  // fade screen to display delete confirmation
    // calculateawhere to display delete confirmation box
	var x = event.clientX;
    var y = event.clientY;
    var z = window.innerHeight;
    var z1 = y +70;  // height of box
    console.log(x,y,z,z1);
    if (z > z1)   y = y - 70;
    else          y = z - 140; 
    console.log("line no in delete_item " , lineno);
    var id = document.getElementById('my_dbid'+lineno ).innerText
	$('#main_del').css({ 'top': y + 'px' }).show().data('numb', lineno ).data('id',id);
	console.log(x + " " + y);
	var nameid = '#my_name' + lineno ;
	document.getElementById('deleteelement').value=$(nameid).text()
//	$('#deleteelement').value($(nameid).text());  // diplay name of item to delete  
	$('ul').off("click"); 
	$('#my_refreshbutton').off("click");  
	$('#my_addbutton').off("click"); 
	$('#tooltipc1').off()   // clear event handlers
	$('#tooltipc2').off()
	$('#tooltipc3').off()
});	
	

// this function called from a button displayed by the delete_item function on the 
// display section 'main_del', to cancel the delete process 	
var delete_cancel = (function(){
	console.log("delete cancel");

	buttons_on();
});
	
// this function called from a button displayed by the delete_item function on the 
// display section 'main_del', to confirm the delete process 	
var delete_confirm = (function(){
	var lineno = $('#main_del').data('numb') ;
	var id = $('#main_del').data('id') ;
	var lineid = '#myline' + lineno ;
	console.log("write delete ajax function here"  + id);

    buttons_on();
    // ajax call to delete item on server
	var jax = $.post('delete', { id : id});
    jax.done( function (data) {
       if (data.result == 'deleted' )
          {    // confirm back everything worked on server
               console.log("delete return from server " + data.id);
               return;
          }
       else 
          {   // something went wrong
			  console.log("invalid return");
		  }
      }) // end ajax .done
	// remove list item from display
	 markers[lineno].setMap(null);
	$(lineid).remove();
});		
	
	
//--- function handles removing an entry		
var remove_item = (function(lineno ){
    console.log("remove " , lineno);
	var lineid = '#myline' + lineno ;
	markers[lineno].setMap(null);
	$(lineid).remove();
});	

//==========================================* refresh screen *=============================
//---  function to refresh data from server 
var refresh_items = (function(){
	console.log('refresh');
	$('ul').off("click"); 
	if (changed == false){
		    document.getElementById('box1').value = '*';
		     document.getElementById('box2').value = '*';
		      document.getElementById('box3').value = '999';
		}
	$('#my_refreshbutton').off("click");  
	$('#my_addbutton').off("click"); 
	$('#tooltipc1').off()   // clear event handlers
	$('#tooltipc2').off()
	$('#tooltipc3').off()
    document.getElementById('refresh_form').submit();
   
	$('#main_wait').show();
    //	location.reload();   both work
    
});

//==========================================* add entry *====================================
//---  function to add an item   
var add_items = (function(){
	adderror = false;
	$('#addbuttonmy').off("click").on("click",  add_confirm);
	$('#addbuttoncnl').off("click").on("click",  add_cancel);
	console.log("add");
	$('ul').off("click"); 
	$('#my_refreshbutton').off("click");  
	$('#my_addbutton').off("click"); 
	$('#tooltipc1').off()   // clear event handlers
	$('#tooltipc2').off()
	$('#tooltipc3').off()
	$('#main_select').fadeTo(0, 0.4);  // fade screen to display update

	document.getElementById('ad_name').value = "";
	document.getElementById('ad_rwebaddr').value = "";
	document.getElementById('ad_rmenu').value  = "";
	document.getElementById('ad_yelp').value  = "";
	document.getElementById('ad_phone').value = "xxx-xxx-xxxx";
	document.getElementById('ad_addr').value = "";
	document.getElementById('ad_town').value = "";
	document.getElementById('ad_state').value = "NJ";
	document.getElementById('ad_comment').value = ""; 
	$("#ad_cuisine").val([]);
	var selregion = document.getElementById("ad_region");
    selregion.options[0].selected = true;
	$('#main_add').css({ top:'50px' }).show()
    //document.getElementById('refresh_form').submit();
 
});


// this function called from a button displayed by the add_item function on the 
// display section 'main_add', to cancel the add process 	
var add_cancel = (function(){
	console.log("add canceled");

	buttons_on();
});


// this function called from a button displayed by the add_item function on the 
// display section 'main_add', to confirm the add process 	
var add_confirm = (function(){	

	   $(this).off('click')
	
    var add_address = document.getElementById('ad_addr').value +","+ document.getElementById('ad_town').value +","+ document.getElementById('ad_state').value
    if (add_address==",," || adderror) 
       {
		    add_address = "new york,NY";
		    adderror = false;
	    }
	    	    
    console.log(add_address);
    
	 geocoder = new google.maps.Geocoder();
	 geocoder.geocode({ 'address': add_address }, function(results, status) 
	  {
              if (status == google.maps.GeocoderStatus.OK) 
			  {
                    console.log(google.maps.GeocoderStatus.OK);
		
					var position = results[0].geometry.location; 
					console.log("nn"+ results[0].geometry.location + position  ); 
					document.getElementById('ad_position').value = position;
		//kkkkkkkkkkkkkk			
		 	        var destinationA = position;
                    var service = new google.maps.DistanceMatrixService();
                    service.getDistanceMatrix(
                               {
                                  origins     : [origin1],
                                  destinations: [destinationA],
                                  travelMode  : 'DRIVING',
                                  unitSystem  : google.maps.UnitSystem.IMPERIAL,
                               }, resultdistanceadd);

                                   function resultdistanceadd(response, status) {
                                   // See Parsing the Results for
                                        if (status !== 'OK') {alert('Error was: add ' + status);}
                                        else {
                                            //    var outputDiv = document.getElementById('output');
                                              for (var i = 0; i < response.rows.length; i++) {
                                              var results = response.rows[i].elements;
                                              for (var j = 0; j < results.length; j++) {
                                     
                                                document.getElementById('ad_distance').value = results[j].distance.text ;
                                                var ad_name     = document.getElementById('ad_name').value ;
												var ad_rwebaddr  = document.getElementById('ad_rwebaddr').value ;
												var ad_rmenu     = document.getElementById('ad_rmenu').value ;
												var ad_yelp     = document.getElementById('ad_yelp').value ;
												var ad_phone    = document.getElementById('ad_phone').value ;
												var ad_addr     = document.getElementById('ad_addr').value ;
												var ad_town     = document.getElementById('ad_town').value ;
												var ad_state    = document.getElementById('ad_state').value ;
												var ad_comment  = document.getElementById('ad_comment').value ; 
												var ad_position = document.getElementById('ad_position').value ;  
												var ad_distance = document.getElementById('ad_distance').value ;
												var ad_region = '*'; 
												ad_region = ad_region +(document.getElementById("ad_region").value);
												var ad_cuisine = '*'; 
												var x=document.getElementById("ad_cuisine");
                                                 for (var i = 0; i < x.options.length; i++)
                                                 {
                                                      if(x.options[i].selected ==true)
                                                      {   ad_cuisine = ad_cuisine + (x.options[i].value);}
                                                 }
												debugger;
						                        // ajax call to update item on server
	                                            var jax = $.post('add', { p_name : ad_name, p_rwebaddr : ad_rwebaddr, p_rmenu : ad_rmenu, 
													         p_yelp : ad_yelp, p_phone : ad_phone, p_addr : ad_addr, p_town : ad_town, p_state : ad_state,
													         p_comment : ad_comment, p_position : ad_position, p_distance : ad_distance, p_region:  ad_region, p_cuisine:  ad_cuisine });
			        
												jax.done( function (data) {
													if (data.result == 'add' )
													{    // confirm back everything worked on server
														console.log("update return from server ");
														 debugger;
                                                             document.getElementById('refresh_form').submit();
													}
													else 
													{   // something went wrong
														console.log("invalid return");
													}
												 }); // end ajax .done
                                                
                                               
                                                
                                                
                                         //       document.getElementById('add_form').submit(); 
                                              }
                                            }
                                       }
                                   };
      
                                   // the basics of a callback function.
                			
		//kkkkkkkkkkkkkkkkkkkkk			
					
			  }
			  else {console.log("error at add geolocation" + google.maps.GeocoderStatus.OK);
				  adderror = true;
				  add_confirm();
				  return;
				  }
			  		
	   });			    

	
	$('#main_add').hide();
	$('#main_wait').show();

	
//	buttons_on();
});		

//============================ dynamic button controls *=============================
// turn on dynamic buttons 
var buttons_on = (function() {
	console.log("buttons on");
	$('#main_update').hide(); 	
	$('#main_del').hide(); 	
	$('#main_add').hide(); 	
	$('#main_select').fadeTo(0, 1);
	$("ul").on("click", ".button_delete", function(e)
    { 
		var lineno = $(this).data('numb');
		// determine click or double click
        clicks++;  //count clicks
        if(clicks === 1) 
            {
             timer = setTimeout(function() {
                         remove_item(lineno ); //perform single-click action
                         clicks = 0;  //after action performed, reset counter
                         }, DELAY);
            } // wait to see how many clicks
        else 
            {
             clearTimeout(timer);  //prevent single-click action
             delete_item(lineno);  //perform double-click action
             clicks = 0;  //after action performed, reset counter
             }
       });  // end jquery "ul"
        
                //  not needed here, turnoff dblclick action
                //   $("ul").on("dblclick", function(e){
                //       e.preventDefault();  //cancel system double-click event });

     $('ul').on("click", ".button_detail", detail_buttons);
     $('ul').on("click", ".button_update", update_items);
     $('#my_refreshbutton').on("click",  refresh_items);
     $('#my_addbutton').on("click", add_items);    



	 


	  $('#tooltipc2').hover(
	     function(){  //  mouseenter function cuisine
	           $('#tool2').css("visibility", "visible");
	           changed=false;  
	           
		 },    
		 function(){  //  mouseleave function cuisine
            $('#tool2').css("visibility", "hidden");
            var x=document.getElementById("box2");
            if(changed){
               for (var i = 0; i < x.options.length; i++)
               {
                   if(x.options[i].selected ==true){
 //                     alert(x.options[i].value);
                     }
               }
          //     refresh_items(); 
            }
         }   
     );      
	 	
	 $('#tooltipc1').hover(
	     function(){  //  mouseenter function cuisine
		       $('#tool1').css("visibility", "visible"); 
		       changed=false;
		 },    
		 function(){  //  mouseleave function cuisine
			   $('#tool1').css("visibility", "hidden");
			   if(changed){
                  var x=document.getElementById("box1");
                  for (var i = 0; i < x.options.length; i++)
                  {
                     if(x.options[i].selected ==true){
//                        alert(x.options[i].value);
          
                      }
                  }
           //       refresh_items(); 
               }   
         }
     );      
     
     $('#tooltipc3').hover(
	     function(){  //  mouseenter function cuisine
		       $('#tool3').css("visibility", "visible");
		       changed=false;
		 },    
		 function(){  //  mouseleave function cuisine
			   $('#tool3').css("visibility", "hidden");
               var x=document.getElementById("box3");
               if(changed){
                    for (var i = 0; i < x.options.length; i++)
                    {
                       if(x.options[i].selected ==true){
   //                        alert(x.options[i].value);
                                         
                       }
                    }
         //           refresh_items(); 
               }     
         }
     );      
	 				  	        
});
	
// =============================* document ready 'starting' function ==========================	
// function turns on dynamic buttons on document load 
$(document).ready(function() {
     buttons_on();

});
function searchchanged(){
	changed = true
	 refresh_items(); 
}

//=====================*  geocoding functions ================================================
// inilize map
 function initMap() {  

	 var useraddress = document.getElementById('useraddress').innerText ;
	 var position, userformattedaddress;
	 geocoder = new google.maps.Geocoder();	
	 geocoder.geocode({ 'address': useraddress }, function(results, status) 
	  {
              if (status == google.maps.GeocoderStatus.OK) 
			  {
                    console.log(google.maps.GeocoderStatus.OK);
				    console.log( results[0].geometry.location  ); 
					position = results[0].geometry.location; 
					
					console.log(position.valueOf() + " xx  "  + position.toString() );
					console.log( results[0].formatted_address  );
					userformattedaddress = results[0].formatted_address;
					origin1 = position;
					debugger;
	                map = new google.maps.Map(document.getElementById('map'), {
                         zoom: 12,
                         center: position
                     });
                     var pinColor = "FFFF00";
    	             var latlngbounds = new google.maps.LatLngBounds();
                     var pinImage = 'home1.png';
                     var marker = new google.maps.Marker(
	                 {
                          position: position,
                          title: userformattedaddress,
                          animation: google.maps.Animation.DROP,
                          icon:pinImage,
                          map: map
                     })
					
					
					 $( ".maplocation" ).each(function() 
						{
							var position = $( this ).text();
							var lineno = $( this ).data('numb');
							var latlng = position.replace("(","").replace(")","").split(",")
							var latlonposition= {};
							latlonposition.lat = parseFloat(latlng[0].trim());
							latlonposition.lng = parseFloat(latlng[1].trim());
	        
							var marker = new google.maps.Marker(
							{
								position: latlonposition,
                                title: document.getElementById('my_name'+lineno ).innerText,
								animation: google.maps.Animation.DROP,
								map: map,
								label: {text: document.getElementById('my_name'+lineno ).innerText.slice(0,1)}
								
                                       
							});
							 marker.addListener('click', function() {
								 window.open(document.getElementById('anchorname'+lineno).href);
							});
							markers.push(marker);
					//kkkkkkkkkkkkkk			
		 	                var destinationA = latlonposition;
                            var service = new google.maps.DistanceMatrixService();
                             service.getDistanceMatrix(
                               {
                                  origins     : [origin1],
                                  destinations: [destinationA],
                                  travelMode  : 'DRIVING',
                                  unitSystem  : google.maps.UnitSystem.IMPERIAL,
                               }, resultdistancetime);

                                   function resultdistancetime(response, status) {
                                   // See Parsing the Results for
                                        if (status !== 'OK') {alert('Error was: add ' + status);}
                                        else {
                                            //    
                                              for (var i = 0; i < response.rows.length; i++) {
                                              var results = response.rows[i].elements;
                                              for (var j = 0; j < results.length; j++) {
                                     
                                                document.getElementById('my_time'+lineno).innerText = results[j].duration.text ;
                                              }
                                            }
                                       }
                                   };
      
                                   // the basics of a callback function.
                			
		//kkkkkkkkkkkkkkkkkkkkk	
						}); 
			   }
			   else console.log('google geocode user address error' );
		});	    
	 
	  
        
};

  
  
 
