var redis = require('redis');
var client = redis.createClient(); //creates a new client
var client2 = redis.createClient();
var id = "Pinot";
var date = Date.now();
client.on('connect', function() {
    console.log('connected');
});

client.set('everything', 'all black', redis.print);
client2.set('everything', 'all blue', redis.print);

//client.set('everything', 'all black', function(err, reply){console.log(reply); });

client.get('everything', function(err, res){ 
	console.log(res);
});

client2.get('everything', function(err, res){
	console.log(res);
});

client.get('everything', function(err, res){
        console.log(res);
});

