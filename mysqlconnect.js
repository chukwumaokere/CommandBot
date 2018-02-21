var mysql = require('mysql');

var con = mysql.createConnection({
	localAddress: "localhost",
	host: "162.243.164.52",
	user: "discord",
	password: "Okere2548",
	database: "discord"
});

con.connect(function(err) {
	var authorid = 1;
	var betAmount = 20;
	var winnings = betAmount * 3;
	if (err) throw err;
	console.log("Connected!");
	//Grab comment author.id assign to var authorid 
	// WHERE userid = ${authorid}
	// grab credits = row['credits']
	// remainder = credits - bet 
	// insert remainder
	// newremainder = remainder + winnings
	// insert newremainder
	// need to check and make sure bet amount is less than credits available
	con.query(`SELECT * FROM discord_users WHERE userid = ${authorid}`, function (err, result, fields) {
		if (err) throw err;
		var credits = result[0].credits;
		var userid = result[0].userid 
		console.log(userid);
		console.log(credits);
		var remainder = credits - betAmount;
	console.log(remainder);
		var newbalance = winnings + remainder;
		console.log(newbalance);
		con.query(`UPDATE discord_users SET credits = ${newbalance} WHERE userid = ${authorid}`, function (err, result, fields) {
			if (err) throw err;
		});
	});
	
});