var fs = require("fs");
var utf8 = require('utf8');

fs.readFile('./commands/commands.txt','utf8',function(err,f){
	var com = f.toString().split(";");
	var comlength = com.length;
	console.log(comlength);
});

