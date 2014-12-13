
/*
 * GET home page.
 */
var MongoClient = require('mongodb').MongoClient;

exports.index = function(req, res){
		var userName="varunac";
	var password="varunac";
	MongoClient.connect("mongodb://"+userName+":"+password+"@ds061370.mongolab.com:61370/extracredit", function(err, db) {
		  if(!err) {
		    console.log("We are connected");	
		    var collection=db.collection('gumball');
		    collection.find({}).toArray(function(err,docs){
		    	
		    	var data =docs[0];
		    	console.log(data);
		    	res.writeHead(200,{"Content-Type":"application/json"});
		    	res.end(JSON.stringify(data)+"\n");
		    });
		  }else{			  
			  db.collection('gumball',function(err,collection){
				  console.log(collection);
			  });
		  }
		});	
};



