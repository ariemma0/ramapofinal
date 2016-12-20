var express = require('express');
var router = express.Router();
var collection;
var user_address = "73 skytop drive, mahwah, nj"
console.log(" has been requested");
 var ensureLoggedIn = function(req, res, next) {
	if ( req.user ) {
		next();
	}
	else {
		res.redirect("/login");
	}
}
var loadscreen = function(res, req){
    
	db_rest.find({$and:[{db_region:  req.session.selectregion},
		                {db_range: { $lt:req.session.selectrange}},
						{db_cuisine:{ $in : req.session.selectcuisine}}]}).sort({db_range:1}).toArray(function (err, result) 
	{   if (err) console.log("error in load array");
		console.log("start"); 
		var i = 0;
		var parm = [];
        for (rs of result)
        {    
			 console.log("name from database "+rs._id);
	
			 parm[i] = {};
			 parm[i].rdbid = rs._id;
             parm[i].rtype = "C";
             parm[i].rname = rs.db_name;
             parm[i].rwebaddr = rs.db_webaddr;
             parm[i].rmenu = rs.db_menu;
             parm[i].ryelp = rs.db_yelp;
             parm[i].rphone = rs.db_phone;
             parm[i].raddr = rs.db_addr;
             parm[i].rtown = rs.db_town;
             parm[i].rstate = rs.db_state ;     
             parm[i].rcomment = rs.db_comment ;
             parm[i].rposition = rs.db_position ;
             parm[i].rdistance = rs.db_distance;
             if (Array.isArray(rs.db_region)) parm[i].rregion = rs.db_region[1];
             else parm[i].rregion = "0";
             
             if (Array.isArray(rs.db_cuisine)) 
             {    var string_cuisine = ""
                  for (var j = 1; j < rs.db_cuisine.length; j++)
                  {
					  string_cuisine = string_cuisine + rs.db_cuisine[j]
                  }
                  parm[i].rcuisine = string_cuisine;     
		     }		  
             else parm[i].rcuisine = "";

             console.log( "cuisine " + parm[i].rcuisine + " + region " + parm[i].rregion);
             i++;
		};
		parm[i] = {};
		parm[i].range =  req.session.selectrange ;
		parm[i].region =  req.session.selectregion ;
		parm[i].cuisine = [] ;
        for (var k = 0 ; k < 10 ; k++){ parm[i].cuisine[k] ="0"}
	         for(var k = 0; k < req.session.selectcuisine.length; k++){
	             if (req.session.selectcuisine[k] == '*') parm[i].cuisine[0] = "1";
	             if (req.session.selectcuisine[k] == '0') parm[i].cuisine[1] = "1";
	             if (req.session.selectcuisine[k] == '1') parm[i].cuisine[2] = "1";
	             if (req.session.selectcuisine[k] == '2') parm[i].cuisine[3] = "1";
	             if (req.session.selectcuisine[k] == '3') parm[i].cuisine[4] = "1";
	             if (req.session.selectcuisine[k] == '4') parm[i].cuisine[5] = "1";
	             if (req.session.selectcuisine[k] == '5') parm[i].cuisine[6] = "1";
	             if (req.session.selectcuisine[k] == '6') parm[i].cuisine[7] = "1";
	             if (req.session.selectcuisine[k] == '7') parm[i].cuisine[8] = "1";
	             if (req.session.selectcuisine[k] == '8') parm[i].cuisine[9] = "1";

		  }
		i++;
		parm[i] = {};
		parm[i].useraddress =  "73 skytop drive, mahwah, nj" ;
		
        res.render('rest', {data: parm});
	

      });  
};



var start = function(req, res, next) {
		req.session.selectcuisine =  ["*"] ;
		req.session.selectregion =  '*' ;
		req.session.selectrange =  999;
		if (req.method=='POST')
		{  
		    req.session.selectregion =  req.body.box2 ;
			req.session.selectrange =  parseFloat(req.body.box3) ;
		    if(Array.isArray(req.body.box1))
		    {     req.session.selectcuisine =  req.body.box1 ; 
			}
			else 
			{     req.session.selectcuisine[0] = req.body.box1
		    }  
        } 
		loadscreen(res, req)	
	
        console.log("Starting!");
        var value = Math.floor((Math.random()*10)+1);
        req.session.value = value;



}


var update = function(req, res, next) {
      // Ajax request - just return json indicating result
        var value = req.session.value;
        var id = req.body.id;
        var region =[];
		var cuisine=[];
        for (var i = 0; i < req.body.p_region.length; i++ ) region.push(req.body.p_region[i]);	
		for (var i = 0; i < req.body.p_cuisine.length; i++ ) cuisine.push(req.body.p_cuisine[i]);	
        var line = { 
			         db_name    : req.body.p_name, 
                     db_webaddr : req.body.p_rwebaddr, 
                     db_menu    : req.body.p_rmenu,  
                     db_yelp    : req.body.p_yelp, 
                     db_phone   : req.body.p_phone,
                     db_addr    : req.body.p_addr, 
                     db_town    : req.body.p_town,  
                     db_state   : req.body.p_state,     
                     db_comment : req.body.p_comment, 
                     db_position: req.body.p_position, 
                     db_distance: req.body.p_distance,
                     db_range   : parseFloat(req.body.p_distance) ,
                     db_region  : region,
                     db_cuisine : cuisine 
                     }; 
					 console.log('aaaa');
                     db_rest.update({_id:req.ObjectID(id)},line);         
        console.log( " update ajax " +id + " " );
							 console.log('bbbbb');
 //       res.writeHead(200, { 'Content-Type': 'application/json' });   
        	res.json({result : 'updated', id : id});
			console.log('ccccc');
//        res.end(JSON.stringify({result : 'updated', id : id}));

}
router.get('/', ensureLoggedIn, start);
router.get('/start', ensureLoggedIn, start);
router.post('/start', ensureLoggedIn, start);
router.post('/add', ensureLoggedIn, function(req, res, next) {
// add restaraunt into collection
        var region =[];
		var cuisine=[];
        for (var i = 0; i < req.body.p_region.length; i++ ) region.push(req.body.p_region[i]);	
		for (var i = 0; i < req.body.p_cuisine.length; i++ ) cuisine.push(req.body.p_cuisine[i]);	
		var line = { 
                db_name    : req.body.p_name, 
                db_webaddr : req.body.p_rwebaddr, 
                db_menu    : req.body.p_rmenu,  
                db_yelp    : req.body.p_yelp, 
                db_phone   : req.body.p_phone,
                db_addr    : req.body.p_addr, 
                db_town    : req.body.p_town,  
                db_state   : req.body.p_state,     
                db_comment : req.body.p_comment, 
                db_position: req.body.p_position,
                db_distance: req.body.p_distance,
                db_range   : parseFloat(req.body.p_distance) ,
                db_region  : region,
                db_cuisine : cuisine 
                }; 

		db_rest.insert(line);        
        
		console.log(" add "  );
		       	res.json({result : 'add'});
      //  res.writeHead(200, { 'Content-Type': 'application/json' });   
  //      res.end(JSON.stringify({result : 'add', id : id}));
        
});
router.post('/delete', ensureLoggedIn, function(req, res, next) {
// Ajax request - just return json indicating result
		var value = req.session.value;
		var id = req.body.id.toString();
		        console.log( " delete "  );
//db_rest.remove({_id:ObjectID(id)});
 
   
    db_rest.remove({_id:req.ObjectID(id)});
        console.log(value  + " delete ajax " +id);
     //   res.writeHead(200, { 'Content-Type': 'application/json' });   
        
      //  res.end(JSON.stringify({result : 'deleted', id : id}));
            	res.json({result : 'deleted', id : id});
});
router.post('/update', ensureLoggedIn, update);

module.exports = router;
