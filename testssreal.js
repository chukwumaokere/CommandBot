/*****DEF: Mentioned users is this array of arrays:
[
        [ 'id': '252667124785348608', 'username': 'Pinót' ], 
        [ 'id': '291603961151225856', 'username': 'McCreep' ],
        [ 'id': '485626792271544322', 'username': 'DND Bot' ] 
]
ENDDIF ******/

//Creating array of arrays:
var mentionedusers = [ [], [], [] ];
mentionedusers[0].id = 252667124785348608;
mentionedusers[0].username = 'Pinót';
mentionedusers[1].id = 291603961151225856;
mentionedusers[1].username = 'McCreep';
mentionedusers[2].id = 485626792271544322;
mentionedusers[2].username= 'DND Bot';

var a = mentionedusers;
var b = mentionedusers; 

var rand = Math.floor(Math.random() * (a.length - 1)) + 1;

var c = a.map(function(e, i) {
	var l = (i + rand) % a.length;
	return [a[i], b[l]];
});

c.forEach(function(pair){
	//console.log(pair[0]);
	var gifter = pair[0];
	var giftername = gifter.username;
	var gifterid = gifter.id;
	
	var giftee = pair[1];
	var gifteename = giftee.username;
	var gifteeid = giftee.id;
	
	console.log(`${giftername} has ${gifteename}`);
});

/***debugging

console.log('\n');

console.log(c[0][0]);
console.log(c[0][1]);

console.log('\n');

console.log(c[1][0]);
console.log(c[1][1]);

console.log('\n');

console.log(c[2][0]);
console.log(c[2][1]);
***/
