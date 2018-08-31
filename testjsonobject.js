var fs = require('fs');
const util = require('util');
var SHA256 = require("crypto-js/sha256");

var o = {};
var id = "Pinot"; //username string 
var specifierid = 252667124785348608; //id of user
var date = generateDate(); 
var nonce = Math.floor(Math.random() * 10) + 1;
var mode = "DND"; //DND or BLACKJACK
var concated = id + date + nonce + mode;

var sessionid = calculateHash(concated);

var title = `${mode}_${id}_${specifierid}`;
o['user_id'] = id;
o['mode'] = mode;
o['sessions'] = [];


var session_data = {id: "6cc98a888b61903873ee799a61d84e58cf1787919ba973352a6849d21d0114c1", data: {} };
//var data_metadata = {date_start: '2018-08-31 14:12:44', date_end: '2018-08-31 14:41:56', story: "You were born a cleric of the high order to a fortunate family bloodline. \nYou go into the Inn to rest",  last_episode: "You go into the Inn to rest", stats: [], inventory: []}

var session_data2 = {id: sessionid, data: {} };
//var data_metadata = {date_start: date, date_end: '', story: "You were born a cleric of the high order to a fortunate family bloodline. \nYou go into the Inn to rest \nYou awoke in a cold sweat and attempted to run to the bathroom. Roll d20 for strength check",  last_episode: "Roll d20", stats: [], inventory: []}

o['sessions'].push(session_data);
o['sessions'].push(session_data2);

var metadata = o['sessions'][0].data;
metadata['date_start'] = '2018-08-31 14:12:44';
metadata['date_end'] = '2018-08-31 14:41:56';
metadata['story'] = "You were born a cleric of the high order to a fortunate family bloodline. \nYou go into the Inn to rest";
metadata['last_episode'] = "You go into the Inn to rest";
metadata['stats'] = {};
metadata['inventory'] = {};

var metadata2 = o['sessions'][1].data;
metadata2['date_start'] = date;
metadata2['date_end'] = '';
metadata2['story'] = "You were born a cleric of the high order to a fortunate family bloodline. \nYou go into the Inn to rest \nYou awoke in a cold sweat and attempted to run to the bathroom. Roll d20 for strength check";
metadata2['last_episode'] = "Roll d20";
metadata2['stats'] = {};
metadata2['inventory'] = {};


var lasto = JSON.stringify(o, null, 2);

fs.writeFile(`cache/${title}.json`, lasto, function(err){ 
	if (err) {
		return console.log(err);
	}
	console.log("File saved: " + title + ".json");
});


console.log(util.inspect(o, false, null));

//console.log(util.inspect(lasto, false, null));


function calculateHash(c){ 
	return SHA256(c).toString();
}

function generateDate(){ 
	var date = new Date();

	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	if (month < 10) { month = "0" + month; } 
	var day = date.getDate();
	if (day < 10) { day = "0" + day; }
	var hours = date.getHours();
	if (hours < 10) { hours = "0" + hours; }
	var minutes = date.getMinutes();
	if (minutes < 10){ minutes = "0" + minutes; }
	var seconds = date.getSeconds();
	if (seconds < 10) { seconds = "0" + seconds; } 

	var dateString = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
	return dateString;
}


//console.log(date);

//var session = 
