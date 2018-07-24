const Discord = require('discord.js');
const bot = new Discord.Client();
const https = require('https');
var fs = require("fs");
var utf8 = require('utf8');
var oldAuthor;

var mysql = require('mysql');

var con = mysql.createConnection({
	localAddress: "localhost",
	host: "localhost",
	user: "",
	password: "",
	database: "discord"
});

// ADD YOUR BOT'S TOKEN HERE
const token = "";

bot.on('ready', () => {
  bot.user.setGame("in Nikki's NSFW");
 // bot.user.setStatus("online");
});


bot.on('message', async(message) => {
if (message.author.id == "126109205395537920" || message.author.id == "184405311681986560"){ 
}
else{
	var firstpart = false;
	var writerid = message.author.id;
	var writername = message.author.username;
	var nowDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
	var checkMessage = message.content.split(" ");
	con.query(`SELECT * FROM discord_users WHERE userid = ${writerid}`, function (err, result, fields) {
		if (result[0] === undefined){
			con.query(`INSERT INTO discord_users VALUES (${writerid}, "${writername}", "${nowDate}", 100, "${nowDate}", NULL, NULL)`);
			console.log(`Created User: ${writerid}, ${writername}, ${nowDate}`);
			firstpart = true;
		}
		if (result[0] !== undefined && checkMessage[0] != '~dailies' && checkMessage[0] != '~flip'){
			con.query(`SELECT * FROM discord_users WHERE userid = ${writerid}`, function (err, result2, fields){
				var currentcredits = result2[0].credits;
				var newcredits = currentcredits+1;
				con.query(`UPDATE discord_users SET credits = ${newcredits} WHERE userid = ${writerid}`);
				firstpart = true;
				if (checkMessage[0].charAt(0) == "~"){
					var anotherone = newcredits+1;
					con.query(`UPDATE discord_users SET credits = ${anotherone} WHERE userid = ${writerid}`);
					firstpart = true;
				}
				con.query(`UPDATE discord_users SET last_command = '${nowDate}' WHERE userid = ${writerid}`);
			});
		}
	});
/*
	 if (checkMessage.indexOf('fart') > -1){
                        var isValidCommand = true;
                        var command = checkMessage[1];
                        con.query(`SELECT * FROM commandcount WHERE commandname LIKE "%fart%"`, function (err, results, fields){
                                var count = results[0].count;
                                var newcount = count+1;
                                con.query(`UPDATE commandcount SET count = '${newcount}' WHERE commandname LIKE "%fart%"`);
				message.channel.send(`THARR SHE BLOWS!! :runner: :dash:`);
				message.channel.send(`<@!273994855578075136> has now farted ${newcount} times! :nauseated_face:`);
                        });
                }

*/
	var checkMessage = message.content.split(" ");
	var isCommand = false;
	var countedwords = checkMessage.length;
	var start = 0;
//fart commands
if (checkMessage[0] != "~check"){
//console.log(checkMessage[0]);
	while (start < countedwords){
		var checkforfart = checkMessage[start].toLowerCase().search(/fart/);
		if (checkforfart == 0 && writerid != '297125330110382082' && checkMessage[0].charAt(0) != "~check"){
			con.query(`SELECT * FROM commandcount WHERE commandname LIKE "%fart%"`, function (err, results, fields){
					var count = results[0].count;
					var newcount = count+1;
					con.query(`UPDATE commandcount SET count = '${newcount}' WHERE commandname LIKE "%fart%"`);
					message.channel.send(`THARR SHE BLOWS!! :runner: :dash:`);
					message.channel.send(`<@!273994855578075136> has now farted ${newcount} times! :nauseated_face:`);
			});
		}
		start++;

	}	
}
var startTwo = 0;
console.log(checkMessage[0]);
if (checkMessage[0] != "~check"){
	//console.log('here');
        while (startTwo < countedwords){
                var checkforkacto = checkMessage[startTwo].toLowerCase().search(/kactosophobia/);
		if (checkforkacto == -1){ var checkforkacto = checkMessage[startTwo].search(/Kactosophobia/);} 
		//console.log('found');
                if (checkforkacto == 0 && writerid != '297125330110382082' && checkMessage[0].charAt(0) != "~check"){
                       // con.query(`SELECT * FROM commandcount WHERE commandname LIKE "%fart%"`, function (err, results, fields){
                             //           var count = results[0].count;
                               //         var newcount = count+1;
                                 //       con.query(`UPDATE commandcount SET count = '${newcount}' WHERE commandname LIKE "%fart%"`);
                                        message.channel.send(`Kactosophobia (from Greek kaktos, "cardoon") is the fear of cacti, a branch of botanophobia, fear of plants. Cacti are one of the more fearful plants as they have pricks that can stab anyone who touches it. People getting stabbed by pricks on a cactus may lead to kactosophobia, or even by learning verbally about it. Sufferers may be afraid that cacti may grow in their yard. Kactosophobia cases are more widespread in deserts where cacti thrive.`);
                       // });
                }
                startTwo++;

        }
}
var startThree = 0;
if (checkMessage[0] != "~check"){
        //console.log('here');
        while (startThree < countedwords){
		var authid = message.author.id;
                var authtag = "<@!" + authid + ">";
                var checkforfurry = checkMessage[startThree].toLowerCase().search(/furry/);
                if (checkforfurry == -1){ var checkforfurry = checkMessage[startThree].search(/Furry/);}
                //console.log('found');
                if (checkforfurry == 0 && writerid != '297125330110382082' && checkMessage[0].charAt(0) != "~check"){
                       // con.query(`SELECT * FROM commandcount WHERE commandname LIKE "%fart%"`, function (err, results, fields){
                             //           var count = results[0].count;
                               //         var newcount = count+1;
                                 //       con.query(`UPDATE commandcount SET count = '${newcount}' WHERE commandname LIKE "%fart%"`);
                                        message.channel.send(`<@!148437198759395330>, <@!252667124785348608>! Mommy, Daddy! ${authtag} tried to say the banned word! :sob: KILL THEM`);
                       // });
                }
                startThree++;

        }
}
	//Make sure the first character is ~
	if (checkMessage[0].charAt(0) == "~"){
		var isCommand = true;
		var isValidCommand = false;
	}
	if (checkMessage[0] == "!hoo"){
		var isCommand = true;
                var isValidCommand = true;
		message.channel.send("", {files: ["http://chukwumaokere.com/test/hoo.png"]}).then(m => console.log(`HOO`)).catch(console.error);
	}
	if (checkMessage[0].toLowerCase() == "!neko" || checkMessage[0].toLowerCase() == "~neko"){
		var isCommand = true;
		var isValidCommand = true;
		

		var authid = message.author.id;
		var authtag = "<@!" + authid + ">";
		var desc = '...E-Enjoy, ' + authtag + '!';

		var mentioned = message.mentions.users.first();
		if (mentioned){
			var mentionedid = mentioned.id;
			var mentionedtag = "<@!" + mentionedid + ">";
		}

		var endpoint = checkMessage[1]; 
		var action = '';
		var actionable = ['spank', 'tickle', 'bj', 'poke', 'slap', 'blowjob', 'kiss', 'cuddle', 'feed', 'cum', 'hug', 'pat'];
 
		if (actionable.indexOf(endpoint) > -1 && mentionedtag){
			action = endpoint + 'ed';
			if (action == 'slaped'){
				action = 'slapped';
			}
			if (action == 'pokeed'){
				action = 'poked';
			}
			if (action == 'feeded'){
				action = 'fed';
			}
			if (action == 'cuddleed'){
				action = 'cuddled';
			}
			if (action == 'tickleed'){
				action = 'tickled';
			}		
			desc = authtag + " has " + action + " " + mentionedtag + ".";
			if (action == 'cumed'){
				action = 'came';
				 desc = authtag + " came on " + mentionedtag + ".";
			}
			if (action == 'blowjobed' || action == 'bjed'){
				desc = authtag + " has given " + mentionedtag + " a blowjob.";
			}
			if (action == 'huged'){
				desc = authtag + " hugged " + mentionedtag + ".";
			}			
			if (action == 'pated'){
				desc = authtag + " patted " +  mentionedtag + "'s head.";
			}
		}

		if (endpoint == '' || !endpoint || endpoint == ' '){
			message.channel.send("Please specify what type of lewds you want, b-baka! I'm not going to do it for you!");
			message.channel.send('`Type "!neko help" for more info`');
			endpoint = false;
		}
		if (endpoint == 'help'){
			message.channel.send("OwO naughty, eh? Weww you can choose fwom these: \n\n`'feet', 'yuri', 'trap', 'futanari', 'hololewd', 'lewdkemo', 'solog', 'feetg', 'cum', 'erokemo', 'les', 'wallpaper', 'lewdk', 'ngif', 'meow', 'tickle', 'lewd', 'feed', 'gecg', 'eroyuri', 'eron', 'cum_jpg', 'bj', 'nsfw_neko_gif', 'solo', 'kemonomimi', 'nsfw_avatar', 'gasm', 'poke', 'anal', 'slap', 'hentai', 'avatar', 'erofeet', 'holo', 'keta', 'blowjob', 'pussy', 'tits', 'holoero', 'lizard', 'pussy_jpg', 'pwankg', 'classic', 'kuni', 'waifu', 'pat', '8ball', 'kiss', 'femdom', 'neko', 'spank', 'cuddle', 'erok', 'fox_girl', 'boobs', 'Random_hentai_gif', 'smallboobs', 'hug', 'ero'` \n\n Or use one of these neat actionabwe commands: \n\n `spank, tickle, bj, poke, slap, blowjob, kiss, cuddle, feed, cum, hug, pat` \n\n To use these, type the action and @Someone. \n  Example: `!slap @Pinót\`");
			endpoint = false;
		}

		var url = "https://nekos.life/api/v2/img/" + endpoint;
		if (endpoint){
			https.get(url, (resp) => {
				let data = '';

				resp.on('data', (chunk) => {
					data += chunk;
				});

				resp.on('end', () => {
					var res = JSON.parse(data).url;
					console.log(JSON.parse(data).url);
					message.channel.startTyping();
					//message.channel.send("", {files: [res]});
					if (res === undefined){
						message.channel.send("I couldn't find what you're looking for :sob:");
						message.channel.send(" Please try again, I'll try harder next time!");
					}else{
					message.channel.send(
								{
								  "embed": {
								    "description": desc,
								    "color": 13605273,
								    "footer": {
								      "text": "Pinót's Bot"
								    },
								    "image": {
								      "url": res
								    }   
								  }
								});
					}

					message.channel.stopTyping(true); message.channel.stopTyping();
				});
			}).on("error", (err) => {
				console.log("Error: " + err.message);
				var errormess = "Error: " + err.message;
				message.channel.startTyping();
				message.channel.send(errormess);
				message.channel.stopTyping();
			});
		}
		
	}
	if (checkMessage[0].toLowerCase() == "!fuck" || checkMessage[0].toLowerCase() == "~fuck"){
		var isValidCommand = true;
                var isCommand = true;
		if(checkMessage[1]){
			var authid = message.author.id;
			var authtag = "<@!" + authid + ">"; 
			var desc = '...E-Enjoy, ' + authtag + '!';
			
			var mentioned = message.mentions.users.first();
			if (mentioned){
				var mentionedid = mentioned.id;
				var mentionedtag = "<@!" + mentionedid + ">";
				desc =  authtag + " fucked " + mentionedtag + " like this:";
			}
			var validep = ['Random_hentai_gif', 'classic', 'nsfw_neko_gif', 'bj'];

			var endpoint = validep[Math.floor(Math.random()*validep.length)];

			var url = "https://nekos.life/api/v2/img/" + endpoint;
			if (endpoint){
				https.get(url, (resp) => {
					let data = '';
					
					resp.on('data', (chunk) => {
						data += chunk;
					});
					
					resp.on('end', () => {
						var res = JSON.parse(data).url;
						console.log(JSON.parse(data).url);
						message.channel.startTyping();
						//message.channel.send("", {files: [res]});
						message.channel.send(   
									{ 
									  "embed": {
									    "description": desc,
									    "color": 13605273,
									    "footer": {
									      "text": "Pinót's Bot"
									    },
									    "image": {
									      "url": res
									    }
									  }
									});
						message.channel.stopTyping(true);
					});
				}).on("error", (err) => {
					console.log("Error: " + err.message);
					var errormess = "Error: " + err.message;
					message.channel.startTyping();
					message.channel.send(errormess);
					message.channel.stopTyping();
				});
			}

		}else{
			message.channel.send("Please include someone to share the action with! Selfish, baka :rage:");
		}

	}
	//actionable command shortcuts
	if ((checkMessage[0].charAt(0) == "~" && checkMessage[0] != '~fuck' && checkMessage[0] != '~neko') || (checkMessage[0].charAt(0) == "!" && checkMessage[0] != '!fuck' && checkMessage[0] != '!neko') ){
		var actionable = ['spank', 'tickle', 'bj', 'poke', 'slap', 'blowjob', 'kiss', 'cuddle', 'feed', 'cum', 'hug', 'pat'];
	
		var authid = message.author.id;
                var authtag = "<@!" + authid + ">";

                var desc = '!';
		var action = '';
		var endpoint = '';

                var mentioned = message.mentions.users.first();
                if (mentioned){
                        var mentionedid = mentioned.id;
                        var mentionedtag = "<@!" + mentionedid + ">";
                }
		if (checkMessage[0].charAt(0) == "~" && checkMessage[0] != '~fuck'){
               		action = checkMessage[0].replace('~', '');
                }
                if ( checkMessage[0].charAt(0) == "!" && checkMessage[0] != "!fuck"){
                        action = checkMessage[0].replace('!', '');
                }
		if ( actionable.indexOf(action) > -1){
			var isValidCommand = true;
 			var isCommand = true;
			if(mentionedtag){
				if (checkMessage[0].charAt(0) == "~"){
					endpoint = checkMessage[0].replace('~', '');
				}
				if ( checkMessage[0].charAt(0) == "!"){
					endpoint = checkMessage[0].replace('!', '');
				}
				action = endpoint + 'ed';
				if (action == 'slaped'){
					action = 'slapped';
				}
				if (action == 'pokeed'){
					action = 'poked';
				}
				if (action == 'feeded'){
					action = 'fed';
				}
				if (action == 'cuddleed'){
					action = 'cuddled';
				}
				if (action == 'tickleed'){
					action = 'tickled';
				}
				desc = authtag + " has " + action + " " + mentionedtag + ".";
				if (action == 'cumed'){
					action = 'came';
					 desc = authtag + " came on " + mentionedtag + ".";
				}
				if (action == 'blowjobed' || action == 'bjed'){
					desc = authtag + " has given " + mentionedtag + " a blowjob.";
				}
				if (action == 'huged'){
					desc = authtag + " hugged " + mentionedtag + ".";
				}
				if (action == 'pated'){
					desc = authtag + " patted " +  mentionedtag + "'s head.";
				}

				//Execution
				var url = "https://nekos.life/api/v2/img/" + endpoint;
				if (endpoint){
					https.get(url, (resp) => {
						let data = '';

						resp.on('data', (chunk) => {
							data += chunk;
						});

						resp.on('end', () => {
							var res = JSON.parse(data).url;
							console.log(JSON.parse(data).url);
							message.channel.startTyping();
							//message.channel.send("", {files: [res]});
							if (res === undefined){
								message.channel.send("I couldn't find what you're looking for :sob:");
								message.channel.send(" Please try again, I'll try harder next time!");
							}else{
							message.channel.send(
										{
										  "embed": {
										    "description": desc,
										    "color": 13605273,
										    "footer": {
										      "text": "Pinót's Bot"
										    },
										    "image": {
										      "url": res
										    }
										  }
										});
							}

							message.channel.stopTyping(true); message.channel.stopTyping();
						});
					}).on("error", (err) => {
						console.log("Error: " + err.message);
						var errormess = "Error: " + err.message;
						message.channel.startTyping();
						message.channel.send(errormess);
						message.channel.stopTyping();
					});
				}
				//Execution end

				//message.channel.send(desc);
			}else{
				if (action != "slap"){
					message.channel.send("Include someone to do it to, idiot!");
				}
			}
		}else{
			return;
		}
	}

	if(isCommand == true){
		if(checkMessage[0] == "~createcommand")
		{
			var isValidCommand = true;
			// commandText gets grabbed by splitting the string with |
			// commandName gets grabbed by splitting the string with spaces
			// command Name must have '~' in it just so you can't use any word you
			var commandText = message.content.split("|",2);
			var commandName = message.content.split(" ");
			if(commandName[1].charAt(0) == "~")
				{
					checkExistingCommand(commandText,commandName);
					message.channel.send("Command " + commandName[1] + " has been created");
				} else {
					message.channel.send("Command must contain '~'");
				}
		}
		if (checkMessage[0] == "~callmedaddy"){
			var isValidCommand = true;
			if (message.author.id == "252667124785348608"){
				message.channel.send("Konichiwa, Daddy :blush:");
			}else{
				message.channel.send("EH?! Nani kore... You're not my daddy. <@!252667124785348608> is my daddy!");
			}
			
		}
/*
		if (checkMessage.indexOf('fart') > -1){
			var isValidCommand = true;
			var command = checkMessage[1];
                        con.query(`SELECT * FROM commandcount WHERE commandname LIKE "%fart%"`, function (err, results, fields){
                                var count = results[0].count;
				var newcount = count+1;
				con.query(`UPDATE commandcount SET count = '${newcount}' WHERE commandname LIKE "%fart%"`);
                        });
		}
*/
		if (checkMessage[0] == "~check"){
			var isValidCommand = true;
			var command = checkMessage[1];
			con.query(`SELECT * FROM commandcount WHERE commandname LIKE "%${command}%"`, function (err, results, fields){
				var count = results[0].count;
				message.delete();
				message.channel.send(`<@!273994855578075136> has farted ${count} times! :nauseated_face:`);
			});
		}

/*
		if(checkMessage[0] == "~profile" && typeof checkMessage[1] === 'string' && checkMessage[0] !== ' '){
			var isValidCommand = true;
			var profileNameRoot = message.content.split(" ");
			var profileName1 = profileNameRoot[1];
			var profileName = profileName1.replace("#", "-");
			var profileNameDec = decodeURIComponent(profileName);
			var profileNameEnc = encodeURIComponent(profileName);
			var profileNameEncClean = profileNameEnc.replace('%83%C2', '');
			if(typeof checkMessage[1] === 'string'){
				message.channel.startTyping();
				message.react("👍");
				await message.channel.send("http://chukwumaokere.com/test/profile.php?bnet=" + profileNameDec + "").then(m => m.delete()).then(m => console.log(`Sent message: ${m.content} with profile name ${profileName}`)).catch(console.error);
				wait(4000);
				await message.channel.send("", {files: ["http://chukwumaokere.com/test/images/" + profileNameEncClean + ".png"]}).then(m => console.log(`Sent image: ${m.content} of ${profileName}`)).catch(console.error);
				message.channel.stopTyping();
			}
		}
		if (checkMessage[0] == "~profile" && !checkMessage[1] || checkMessage[0] == "~profile" && checkMessage[1] == ''){
			
			var isValidCommand = true;
			message.channel.send(`The "~profile" command must contain the BattleTag (case-sensitive; accents are welcome!), a hashtag or dash, and the numbers (ex: "~profile Pinót-1367" or "~profile Pinót#1367")`);
		} 
*/		
		/*
		if(checkMessage[0] == "~succ"){
			var isValidCommand = true;
			var commandauth = message.author.username;
			//message.channel.send(`Hello`);
			console.log(`Joining channel`);
			const chan = message.member.voiceChannel;
			chan.join();
			console.log(`Joined ${commandauth}'s Channel`);
			//wait(2000);
			//console.log(`2 secs have passed. posting command !succ`);
			message.channel.send(`!succ`);
			//console.log(`Waiting 10 seconds before leaving`);
			//wait(10000);
			//console.log(`10 seconds passed. Leaving now`);
			//chan.leave();

		} 
		*/
		if(checkMessage[0] == "~remember"){
			var isValidCommand = true;
			var auth = message.author.username;
			var mentioned = message.mentions.users.first();
			if (mentioned){
				var mentionedname = mentioned.username;
				if(mentionedname == "nikkst3rz"){
					message.delete();
					message.channel.send(`**(?)** _Thotliet will remember that._ `);
				}else{ 
					message.delete();
					message.channel.send(`**(?)** _${mentionedname} will remember that._ `);
				}
			}
			else{
				if (auth == "nikkst3rz"){
					message.delete();
					message.channel.send(`**(?)** _Thotliet will remember that._ `);
				}else{
					message.delete();
					message.channel.send(`**(?)** _${auth} will remember that._`);
				}
			}
		}
		/*
		if(checkMessage[0] == "~slap"){
                        var isValidCommand = true;
                        var commandauth = message.author.username;
                        //message.channel.send(`Hello`);
                        console.log(`Joining channel`);
                        const chan = message.member.voiceChannel;
                        chan.join();
                        console.log(`Joined ${commandauth}'s Channel`);
                        //wait(2000);
                        //console.log(`2 secs have passed. posting command !succ`);
                        message.channel.send(`!slap`);
                        //console.log(`Waiting 10 seconds before leaving`);
                        //wait(10000);
                        //console.log(`10 seconds passed. Leaving now`);
                        //chan.leave();

                }    
		*/
		if(checkMessage[0] == "~profile"){
			console.log("at least you're in profile");
			var isValidCommand = true;
			var bt = false;
			var mentioned = message.mentions.users.first();
			if (!checkMessage[1] || checkMessage[1] == ' ' || checkMessage[1] == ''){
			con.query(`SELECT * FROM discord_users WHERE userid = ${writerid}`, async function (err, results, fields) { 
				console.log("hello");
				console.log(results[0].battletag);
				if (results[0] !== undefined && results[0].battletag && results[0].battletag != ' ' && results[0].battletag != ''){
					console.log("still in the condition");
					var bt = true;
					var battletag = results[0].battletag;
					var profileName1 = battletag; 
					var profileName = profileName1.replace("#", "-");
					var profileNameDec = decodeURIComponent(profileName);
					var profileNameEnc = encodeURIComponent(profileName);
					var profileNameEncClean = profileNameEnc.replace('%83%C2', '');
					
						message.channel.startTyping();
						message.react("👍");
						await message.channel.send("http://chukwumaokere.com/test/profile.php?bnet=" + profileNameDec + "").then(m => m.delete()).then(m => console.log(`Sent message: ${m.content} with profile name ${profileName}`)).catch(console.error);
						wait(5000);
						await message.channel.send("", {files: ["http://chukwumaokere.com/test/images/" + profileNameEncClean + ".png"]}).then(m => console.log(`Sent image: ${m.content} of ${profileName}`)).catch(console.error);
						message.channel.stopTyping();
					}else{
						console.log("you made it!");
                                        	message.channel.send(`You must first set a battletag (ex: "~set battletag BattleTag#1010") or the "~profile" command must contain the BattleTag (case-sensitive; accents are welcome!), a hashtag or dash, and the numbers (ex: "~profile Pinót-1367" or "~profile Pinót#1367")`);
					}
			});
			}else if (checkMessage[1] && checkMessage[1] != ' ' && checkMessage[1] !== undefined && checkMessage[1] != ''){
					console.log("somewhere out there");
					var to = checkMessage[1].valueOf();
					
					console.log(`${to}`);
				if(!mentioned && typeof checkMessage[1] !== "number"){
					var bt = true;
					var isValidCommand = true;
					var profileNameRoot = message.content.split(" ");
					var profileName1 = profileNameRoot[1];
					var profileName = profileName1.replace("#", "-");
					var profileNameDec = decodeURIComponent(profileName);
					var profileNameEnc = encodeURIComponent(profileName);
					var profileNameEncClean = profileNameEnc.replace('%83%C2', '');
					if(typeof checkMessage[1] === 'string'){
						message.channel.startTyping();
						message.react("👍");
				await	 message.channel.send("http://chukwumaokere.com/test/profile.php?bnet=" + profileNameDec + "").then(m => m.delete()).then(m => console.log(`Sent message: ${m.content} with profile name ${profileName}`)).catch(console.error);
						wait(5000);
				await	 message.channel.send("", {files: ["http://chukwumaokere.com/test/images/" + profileNameEncClean + ".png"]}).then(m => console.log(`Sent image: ${m.content} of ${profileName}`)).catch(console.error);
						message.channel.stopTyping();
					}
				if(!mentioned && typeof checkMessage[1] === 'number'){
					var num = checkMessage[1]
					var bnnum = "bn" + num;
					con.query(`SELECT ${bnnum} FROM discord_users INNER JOIN bn_alts ON discord_users.userid = bn_alts.userid WHERE discord_users.userid = ${writerid}`, async function (err, results, fields) {
						if (results[0] !== undefined && results[0].battletag && results[0].battletag != ' ' && results[0].battletag != ''){
							var bt = true;
							var battletag = results[0].bnnum;
							var profileName1 = battletag; 
							var profileName = profileName1.replace("#", "-");
							var profileNameDec = decodeURIComponent(profileName);
							var profileNameEnc = encodeURIComponent(profileName);
							var profileNameEncClean = profileNameEnc.replace('%83%C2', '');

							message.channel.startTyping();
							message.react("👍");
							await message.channel.send("http://chukwumaokere.com/test/profile.php?bnet=" + profileNameDec + "").then(m => m.delete()).then(m => console.log(`Sent message: ${m.content} with profile name ${profileName}`)).catch(console.error);
							wait(5000);
							await message.channel.send("", {files: ["http://chukwumaokere.com/test/images/" + profileNameEncClean + ".png"]}).then(m => console.log(`Sent image: ${m.content} of ${profileName}`)).catch(console.error);
							message.channel.stopTyping();
						}
					});

				}
				}if (mentioned){
					var mentionedid = mentioned.id
					con.query(`SELECT * FROM discord_users WHERE userid = ${mentionedid}`, async function (err, results, fields) {
						var bt = true;
					if (results[0] !== undefined && results[0].battletag && results[0].battletag != ' ' && results[0].battletag != ''){
						var battletag = results[0].battletag;
						var profileName1 = battletag; 
						var profileName = profileName1.replace("#", "-");
						var profileNameDec = decodeURIComponent(profileName);
						var profileNameEnc = encodeURIComponent(profileName);
						var profileNameEncClean = profileNameEnc.replace('%83%C2', '');
						
							message.channel.startTyping();
							message.react("👍");
							await message.channel.send("http://chukwumaokere.com/test/profile.php?bnet=" + profileNameDec + "").then(m => m.delete()).then(m => console.log(`Sent message: ${m.content} with profile name ${profileName}`)).catch(console.error);
							wait(4000);
							await message.channel.send("", {files: ["http://chukwumaokere.com/test/images/" + profileNameEncClean + ".png"]}).then(m => console.log(`Sent image: ${m.content} of ${profileName}`)).catch(console.error);
							message.channel.stopTyping();
					}else{
						message.channel.send(`:thumbsdown: | Sorry, that user does not have a battletag set on their discord account yet.`);
					}
					});
				
				}
			} 
			
		} 
		if (checkMessage[0] == "~poll" && !checkMessage[1] || checkMessage[0] == "~poll" && checkMessage[1] == ''){
			var isValidCommand = true;
			message.channel.send(`The "~poll" command must contain the question and all possible answers. Like this: "~poll Where should we go next?; Germany; Italy; France;"`);
		}
		if (checkMessage[0] == "~poll" && checkMessage[1] || checkMessage[0] == "~poll" && !checkMessage[1] == '' || checkMessage[0] == "~poll" && !checkMessage[1] == ' '){
			var isValidCommand = true;
			var pollParts = message.content.split(";");
			var pollQp = pollParts[0].split("~poll ");
			var pollQ = pollQp[1];
			var totalCount = (pollParts.length - 1) - 1;
			var theAnswers = [];
			for (k = 1; k <= totalCount; k++){
				theAnswers.push(pollParts[k]);
			}
			var theNumbers = [];
			for (n = 1; n <= totalCount; n++){
				theNumbers.push(n);
			}

			var questionPreface = `**POLL Cast your votes!**
---------------------------------
Q: ${pollQ}`;
			var answerClump = [];
			for(i = 0; i < totalCount; i++){
				var pollA = pollParts[i];
				var counter = i + 1;
				var okayAnswers = `${counter})${theAnswers[i]}`;
				answerClump.push(okayAnswers);
			}
			var newAnswers = answerClump.toString().replace(/,/g, "\n");
			
			message.channel.startTyping();
			message.delete();
			
			let messageId;
			await message.channel.send(questionPreface + "\n\n" + newAnswers).then(message => messageId = message.id);

			let botMessage;
			await message.channel.fetchMessage(messageId).then(message => botMessage = message);
			for (b = 1; b <= totalCount; b++){
				await botMessage.react(`${b}⃣`);
			}
			message.channel.stopTyping();
		}
		//Bot status and game command
		if (checkMessage[0] == "~status" && checkMessage[1] || checkMessage[0] == "~status" && !checkMessage[1] == '' || checkMessage[0] == "~status" && !checkMessage[1] == ' '){
			var isValidCommand = true;
			if (message.author.id == "252667124785348608"){
				var isValidCommand = true;
				var botStatus = checkMessage[1];
				bot.user.setStatus(`${botStatus}`);
				console.log(`Setting bots status to: ` + botStatus);
				message.delete();
			}
		}
		if (checkMessage[0] == "~roll"){
			var isValidCommand = true;
			var roller = parseInt(checkMessage[1].replace(/[^0-9\.]/g, ''), 10);
			var authorid = message.author.id;
                        var authorname = message.author.username;
			if ((checkMessage[1].charAt(0) == "d" || checkMessage[1].charAt(0) == "D")){
				if (!checkMessage[2]){
					var rollnum = Math.floor(Math.random() * roller) + 1;
					message.channel.send(`:game_die: ***${authorname}*** *rolled a ${rollnum}.*`);
				}
				if (checkMessage[2]){
					if ( message.author.id == "252667124785348608"){
						var mentioned = message.mentions.users.first();
 		                                var mentionedname = mentioned.username;
                		                var rollnum = Math.floor(Math.random() * roller) + 1;
		                                message.channel.send(`:game_die: ***${mentionedname}*** *rolled a ${rollnum}.*`);
					}
					else{
						message.channel.send(`Sorry only <@!252667124785348608> can roll for other users. Hes the GM! :blush:`);
					}
				}
				
			}
			 else{
                                message.channel.send(`Please specify what type of die to roll. E.g.: "~roll d20" :blush:` );
                        }
		}
		
		if (checkMessage[0] == "~credits"){
			var nowDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
			var isValidCommand = true;
			var authorid = message.author.id;
			var authorname = message.author.username;
			//console.log(`MySQL Connected for command ${checkMessage[0]}`);
			if (checkMessage[1]){
				var mentioned = message.mentions.users.first();
				var mentionedname = mentioned.username;
				var mentionedid = mentioned.id;
				con.query(`SELECT * FROM discord_users WHERE userid = ${mentionedid}`, function (err, result, fields) {
					if (err){
						console.log(err);
						connection.release();
						return;
					}
					else{
						if (result[0] !== undefined){
							var credits = result[0].credits;
								var dbname = result[0].name;
								message.channel.startTyping();
								// no @ mention message.channel.send(` :credit_card: | <@${authorid}>, you have **${credits}** :yen: credits` );
								message.channel.send(` :credit_card: | **${mentionedname}** has **${credits}** :yen: credits` );
								message.channel.stopTyping();
								//console.log(result.credits);
								//con.query(`UPDATE discord_users SET name = "${authorname}" WHERE userid = ${authorid}`, function (err, result, fields) {
								//	if (err) throw err;
								//});	
						}	
						if (result[0] === undefined){
							//con.query(`INSERT INTO discord_users VALUES (${authorid}, "${authorname}", "${nowDate}", 100, "${nowDate}")`);
							if (err) throw err;
							message.channel.startTyping();
							message.channel.send(` :credit_card: | **${mentionedname}** has **0** :yen: credits because they haven't played with me yet :slight_frown:` );
							message.channel.stopTyping();
						}	
					}
				});
			}
			else if (!checkMessage[1]){
				con.query(`SELECT * FROM discord_users WHERE userid = ${authorid}`, function (err, result, fields) {
					if (err){
						console.log(err);
						connection.release();
						return;
					}
					else{
						if (result[0] !== undefined){
							var credits = result[0].credits;
							
								message.channel.startTyping();
								// no @ mention message.channel.send(` :credit_card: | <@${authorid}>, you have **${credits}** :yen: credits` );
								message.channel.send(` :credit_card: | **${authorname}**, you have **${credits}** :yen: credits` );
								message.channel.stopTyping();
								//console.log(result.credits);
								con.query(`UPDATE discord_users SET name = "${authorname}" WHERE userid = ${authorid}`, function (err, result, fields) {
									if (err) throw err;
								});	
						}	
						if (result[0] === undefined){
							con.query(`INSERT INTO discord_users VALUES (${authorid}, "${authorname}", "${nowDate}", 100, "${nowDate}", NULL)`);
							if (err) throw err;
							message.channel.startTyping();
							message.channel.send(` :credit_card: | **${authorname}**, you have **100** :yen: credits` );
							message.channel.stopTyping();
						}	
					}
				});
			}
		}
		if (checkMessage[0] == "~game" && checkMessage[1] || checkMessage[0] == "~game" && !checkMessage[1] == '' || checkMessage[0] == "~game" && !checkMessage[1] == ' '){
			if (message.author.id == "252667124785348608"){
				var isValidCommand = true;
				var botGameAry = [];
				var totalWords = checkMessage.length - 1;
				for (m = 1; m <= totalWords; m++){
					botGameAry.push(checkMessage[m]);
				}
				var botGame = botGameAry.toString().replace(/,/g, " ");
				bot.user.setGame(`${botGame}`);
				console.log(`Setting bots game to: ` + botGame);
				message.delete();
			}
		}
		if ( checkMessage[0] == '~role') {
			let rolewanted = message.content.split(' ').slice(2).toString();
			let role = message.guild.roles.find("name", rolewanted);
			if (!message.channel.permissionsFor(message.author).hasPermission("KICK_MEMBERS")) {
			   message.reply('This command requires you to have Kick_Members permission.');
			} 
			/*
			if (message.member.roles.exists(role)){ 
			console.log("one");
				message.channel.send('Cunt are you fucking retarded? You already have that role.');
			} 
			*/
			if (!role) {
				console.log("two");
				message.channel.send('Please add a role to the command like this "!role @userName roleName". ');
			}
			else{
				console.log("Starting");
				let member = message.mentions.members.first();
				let usertorole = message.mentions.users.first();
				member.addRole(role).catch(console.error);
				console.log("assigning role");
				message.channel.send(usertorole.username + " Has had the role given to them!");
			}	
		}
		if ((checkMessage[0] == "~addcredits" || checkMessage[0] == "~add" ) && checkMessage[1] && checkMessage[2]){
		var isValidCommand = true;
			if (message.author.id == "252667124785348608"){
				var mentioned = message.mentions.users.first();
				var mentionedname = mentioned.username;
				var mentionedid = mentioned.id;
				con.query(`SELECT * FROM discord_users WHERE userid = ${mentionedid}`, function (err, results, fields) {
					if (results[0] !== undefined){
						var currentcredits = parseInt(results[0].credits);
						var creditstoadd = parseInt(checkMessage[2]);
						var newamount = creditstoadd+currentcredits; 
						con.query(`UPDATE discord_users SET credits = ${newamount} WHERE userid = ${mentionedid}`);
						message.channel.send(`You have given ${mentionedname} ${creditstoadd} credits :yen:`);
					}
				});
			}
		}
		if (checkMessage[0] == "~flip"){
			var isValidCommand = true;
			if (checkMessage[1]){
				con.query(`SELECT * FROM discord_users WHERE userid = ${writerid}`, function (err, results, fields) {
					if (results[0] !== undefined){	
						var HorT = Math.floor(Math.random() * 2) + 1;
						var flipAmt =  parseInt(checkMessage[1]);
						var flipDoub = flipAmt * 2; 
						var origCreds = parseInt(results[0].credits);
						var flipPlusOrg = origCreds + flipDoub;
						var orgMinusBet = origCreds - flipAmt; 
						if (flipAmt <= origCreds){
							if (HorT == 2){
								message.channel.send(`:moneybag: | Congratulations **${writername}** you won **${flipDoub} credits!**`);
								con.query(`UPDATE discord_users SET credits = ${flipPlusOrg} WHERE userid = ${writerid}`);
							}else{
								message.channel.send(`:x: | Sorry **${writername}** you lost **${flipAmt} credits!**`);
								con.query(`UPDATE discord_users SET credits = ${orgMinusBet} WHERE userid = ${writerid}`);
							}	
						}else{
							console.log(flipAmt);
							console.log(origCreds);
							message.channel.send(`:x: | Sorry, ${writername} you don't have enough credits. You currently have **${origCreds} credits**. Please use "~credits" to check how much you have before betting.`);
						}						
					}else{
						message.channel.send(`:x: Sorry, user not found.`);
					}
				});
			}else{
				message.channel.send(`Please specify a valid bet amount like this "~flip 20" to bet 20 credits.`);
			}
		}
		if (checkMessage[0] == "~set"){
			var isValidCommand = true;
			if(checkMessage[1] == "battletag"){
				if (checkMessage[2]){
					var battletag = checkMessage[2];
						message.channel.send(`:thumbsup: | ${writername}, your battletag has been set to ${battletag}`);
						con.query(`UPDATE discord_users SET battletag = "${battletag}" WHERE userid = ${writerid}`);
				}
				else{
					message.channel.send(`:thumbsdown: | Please enter an appropriate battletag. Remember, all battletags are case-sensitive`);
				}

			}
			else{
				message.channel.send(`:x: | When using the set command, you need to specify a valid parameter to set! Currently there is: "battletag".`);
			}
		} 
		if ((checkMessage[0] == "~dailies" || checkMessage[0] == "~daily") && !checkMessage[1]){
			var isValidCommand = true;
			con.query(`SELECT * FROM discord_users WHERE userid = ${writerid}`, function (err, results, fields) {
				if (results[0] !== undefined){						
					var lastdailytime = new Date(results[0].last_dailies);
					var personName = results[0].name;
					var dailyDate = new Date();
					var hourspassed = diff_hours(lastdailytime, dailyDate);
					var minpassed = diff_min(dailyDate, lastdailytime);
					var secpassed = diff_sec(lastdailytime, dailyDate);
					var diff = Math.abs(new Date() - lastdailytime);
					if (hourspassed >= 24){
						var moreThan24 = true;
					}else{ 
						var moreThan24 = false;
					}
					if (lastdailytime == '' || lastdailytime == null || moreThan24 == true || lastdailytime == 'Invalid Date'){
						var currentcredits2 = results[0].credits;
						var newcredits2 = currentcredits2+200;
						con.query(`UPDATE discord_users SET credits = ${newcredits2}, last_dailies = '${dailyDate}' WHERE userid = ${writerid}`);
						message.channel.send(`:moneybag: | **${personName}**, you have received your :yen: **200** daily credits!`);
					}
					else{
						var hleft = 24 - hourspassed - 1;
						var mleft = 60 - (minpassed % 60) - 1;
						var sleft = 60 - (secpassed % 60);
						message.channel.send(`Sorry **${personName}**, you've already claimed your daily credits for today. Please try again in **${hleft} hours ${mleft} minutes ${sleft} seconds**`);
					}
					
					/*
					if (results[0] !== undefined && results[0].last_dailies !== '' || results[0] !== undefined && moreThan24 == true){
						
						console.log()
					}else if (results[0] === undefined){
						//create their record
					}*/
				}
			});
		}
		//Creation of games for CommandBot
		if (checkMessage[0] == "~startgame" && checkMessage[1] || checkMessage[0] == "~startgame" && !checkMessage[1] == '' || checkMessage[0] == "~startgame" && !checkMessage[1] == ' '){
			var isValidCommand = true;
			if (checkMessage[1] == "blackjack" && checkMessage[2]){
				if (checkMessage[2]){
					var betAmount = checkMessage[2];
					message.channel.startTyping();
					//insert game here	level 2 would be to save blackjack.js and then just include blackjack.js here so the code is cleaner
					function Card(s, n) {
						var suit = s;
						var number = n;
						this.getSuit = function () {
							return suit;
						};
						this.getNumber = function () {
							return number;
						};
					}

					Card.prototype.getValue = function () {
							return this.getNumber() === 1 ? 11 : isBetween(11, this.getNumber(), 13) ? 10 : this.getNumber();
					};

					var myCalledCards = [];
					var dealerCalledCards = [];
					var usedCards = [];
					var myRunningTotal = 0;
					var dealerRunningTotal = 0;

					var initDeal = function () {

							//Player Hand
							var myHand = new Card((Math.floor(Math.random() * 4) + 1), (Math.floor(Math.random() * 13) + 1));
							var cardSuit = myHand.getSuit();
							var cardNumber = myHand.getNumber();
							var cardSuitSuit = '';
							var cardNumberValue = cardNumber;

							if (cardSuit == 1){
									cardSuitSuit = ':hearts:';
							}
							if (cardSuit == 2){
									cardSuitSuit = ':spades:';
							}
							if (cardSuit == 3){
									cardSuitSuit = ':diamonds:';
							}
							if (cardSuit == 4){
									cardSuitSuit = ':clubs:';
							}
							
							if (cardNumber == 1){
									var cardNumberValue = ':one:';
									cardNumber = 1;
							}
							if (cardNumber == 2){
									var cardNumberValue = ':two:';
									cardNumber = 2;
							}
							if (cardNumber == 3){
									var cardNumberValue = ':three:';
									cardNumber = 3;
							}
							if (cardNumber == 4){
									var cardNumberValue = ':four:';
									cardNumber = 4;
							}
							if (cardNumber == 5){
									var cardNumberValue = ':five:';
									cardNumber = 5;
							}
							if (cardNumber == 6){
									var cardNumberValue = ':six:';
									cardNumber = 6;
							}
							if (cardNumber == 7){
									var cardNumberValue = ':seven:';
									cardNumber = 7;
							}
							if (cardNumber == 8){
									var cardNumberValue = ':eight:';
									cardNumber = 8;
							}
							if (cardNumber == 9){
									var cardNumberValue = ':nine:';
									cardNumber = 9;
							}
							if (cardNumber == 11){
									cardNumberValue = 'Jack';
									cardNumber = 10;
							}
							if (cardNumber == 12){
									cardNumberValue = 'Queen';
									cardNumber = 10;
							}
							if (cardNumber == 13){
									cardNumberValue = 'King';
									cardNumber = 10;
							}
							var myCardString = `${cardNumberValue} of ${cardSuitSuit}`;

							//Player Second Hand
							var mySecondHand = new Card((Math.floor(Math.random() * 4) + 1), (Math.floor(Math.random() * 13) + 1));
							var secondCardSuit = mySecondHand.getSuit();
							var secondCardNumber = mySecondHand.getNumber();
							var secondCardSuitSuit = '';
							var secondCardNumberValue = secondCardNumber;

							if (secondCardSuit == 1){
									secondCardSuitSuit = ':hearts:';
							}
							if (secondCardSuit == 2){
									secondCardSuitSuit = ':spades:';
							}
							if (secondCardSuit == 3){
									secondCardSuitSuit = ':diamonds:';
							}
							if (secondCardSuit == 4){
									secondCardSuitSuit = ':clubs:';
							}

							if (secondCardNumber == 1){
									var secondCardNumberValue = ':one:';
									secondCardNumber = 1;
							}
							if (secondCardNumber == 2){
									var secondCardNumberValue = ':two:';
									secondCardNumber = 2;
							}
							if (secondCardNumber == 3){
									var secondCardNumberValue = ':three:';
									secondCardNumber = 3;
							}
							if (secondCardNumber == 4){
									var secondCardNumberValue = ':four:';
									secondCardNumber = 4;
							}
							if (secondCardNumber == 5){
									var secondCardNumberValue = ':five:';
									secondCardNumber = 5;
							}
							if (secondCardNumber == 6){
									var secondCardNumberValue = ':six:';
									secondCardNumber = 6;
							}
							if (secondCardNumber == 7){
									var secondCardNumberValue = ':seven:';
									secondCardNumber = 7;
							}
							if (secondCardNumber == 8){
									var secondCardNumberValue = ':eight:';
									secondCardNumber = 8;
							}
							if (secondCardNumber == 9){
									var secondCardNumberValue = ':nine:';
									secondCardNumber = 9;
							}
							if (secondCardNumber == 11){
									secondCardNumberValue = 'Jack';
									secondCardNumber = 10;
							}
							if (secondCardNumber == 12){
									secondCardNumberValue = 'Queen';
									secondCardNumber = 10;
							}
							if (secondCardNumber == 13){
											secondCardNumberValue = 'King';
									secondCardNumber = 10;
							}
							var mySecondCardString = `${secondCardNumberValue} of ${secondCardSuitSuit}`;



							//Dealer Stuff
							var dealerHand = new Card((Math.floor(Math.random() * 4) + 1), (Math.floor(Math.random() * 13) + 1));
							var dealerCardSuit = dealerHand.getSuit();
							var dealerCardNumber = dealerHand.getNumber();
							var dealerCardSuitSuit = '';
							var dealerCardNumberValue = dealerCardNumber;

							if (dealerCardSuit == 1){
									dealerCardSuitSuit = ':hearts:';
							}
							if (dealerCardSuit == 2){
									dealerCardSuitSuit = ':spades:';
							}
							if (dealerCardSuit == 3){
									dealerCardSuitSuit = ':diamonds:';
							}
							if (dealerCardSuit == 4){
									dealerCardSuitSuit = ':clubs:';
							}

							if (dealerCardNumber == 1){
									var dealerCardNumberValue = ':one:';
									dealerCardNumber = 1;
							}
							if (dealerCardNumber == 2){
									var dealerCardNumberValue = ':two:';
									dealerCardNumber = 2;
							}
							if (dealerCardNumber == 3){
									var dealerCardNumberValue = ':three:';
									dealerCardNumber = 3;
							}
							if (dealerCardNumber == 4){
									var dealerCardNumberValue = ':four:';
									dealerCardNumber = 4;
							}
							if (dealerCardNumber == 5){
									var dealerCardNumberValue = ':five:';
									dealerCardNumber = 5;
							}
							if (dealerCardNumber == 6){
									var dealerCardNumberValue = ':six:';
									dealerCardNumber = 6;
							}
							if (dealerCardNumber == 7){
									var dealerCardNumberValue = ':seven:';
									dealerCardNumber = 7;
							}
							if (dealerCardNumber == 8){
									var dealerCardNumberValue = ':eight:';
									dealerCardNumber = 8;
							}
							if (dealerCardNumber == 9){
									var dealerCardNumberValue = ':nine:';
									dealerCardNumber = 9;
							}
							if (dealerCardNumber == 11){
									dealerCardNumberValue = 'Jack';
									dealerCardNumber = 10;
							}
							if (dealerCardNumber == 12){
									dealerCardNumberValue = 'Queen';
									 dealerCardNumber = 10;
							}
							if (dealerCardNumber == 13){
									dealerCardNumberValue = 'King';
									dealerCardNumber = 10;
							}
							var dealerCardString = `${dealerCardNumberValue} of ${dealerCardSuitSuit}`;

							//Dealer Second Hand Stuff
							var dealerSecondHand = new Card((Math.floor(Math.random() * 4) + 1), (Math.floor(Math.random() * 13) + 1));
							var dealerSecondCardSuit = dealerSecondHand.getSuit();
							var dealerSecondCardNumber = dealerSecondHand.getNumber();
							var dealerSecondCardSuitSuit = '';
							var dealerSecondCardNumberValue = dealerSecondCardNumber;

							if (dealerSecondCardSuit == 1){
									dealerSecondCardSuitSuit = ':hearts:';
							}
							if (dealerSecondCardSuit == 2){
									dealerSecondCardSuitSuit = ':spades:';
							}
							if (dealerSecondCardSuit == 3){
									dealerSecondCardSuitSuit = ':diamonds:';
							}
							if (dealerSecondCardSuit == 4){
									dealerSecondCardSuitSuit = ':clubs:';
							}

							if (dealerSecondCardNumber == 1){
									var dealerSecondCardNumberValue = ':one:';
									dealerSecondCardNumber = 1;
							}
							if (dealerSecondCardNumber == 2){
									var dealerSecondCardNumberValue = ':two:';
									dealerSecondCardNumber = 2;
							}
							if (dealerSecondCardNumber == 3){
									var dealerSecondCardNumberValue = ':three:';
									dealerSecondCardNumber = 3;
							}
							if (dealerSecondCardNumber == 4){
									var dealerSecondCardNumberValue = ':four:';
									dealerSecondCardNumber = 4;
							}
							if (dealerSecondCardNumber == 5){
									var dealerSecondCardNumberValue = ':five:';
									dealerSecondCardNumber = 5;
							}
							if (dealerSecondCardNumber == 6){
									var dealerSecondCardNumberValue = ':six:';
									dealerSecondCardNumber = 6;
							}
							if (dealerSecondCardNumber == 7){
									var dealerSecondCardNumberValue = ':seven:';
									dealerSecondCardNumber = 7;
							}
							if (dealerSecondCardNumber == 8){
									var dealerSecondCardNumberValue = ':eight:';
									dealerSecondCardNumber = 8;
							}
							if (dealerSecondCardNumber == 9){
									var dealerSecondCardNumberValue = ':nine:';
									dealerSecondCardNumber = 9;
							}
							if (dealerSecondCardNumber == 11){
									dealerSecondCardNumberValue = 'Jack';
									dealerSecondCardNumber = 10;
											}
							if (dealerSecondCardNumber == 12){
									dealerSecondCardNumberValue = 'Queen';
									 dealerSecondCardNumber = 10;
							}
							if (dealerSecondCardNumber == 13){
									dealerSecondCardNumberValue = 'King';
									dealerSecondCardNumber = 10;
							}
							var dealerSecondCardString = `${dealerSecondCardNumberValue} of ${dealerSecondCardSuitSuit}`;


							var myTotal = cardNumber + secondCardNumber;
							var dealerTotal = dealerCardNumber + dealerSecondCardNumber;


					//Prints and card handling
							message.channel.send(`Welcome to Pinot's Blackjack Parlor! This table pays 3-to-1 on wins. Good luck and play responsibly!`)
							message.channel.send(`To start: Dealer has the ${dealerCardString} and ${dealerSecondCardString} for a value of ${dealerTotal}`);
							message.channel.send(`To start: You have the ${myCardString} and ${mySecondCardString} for a value of ${myTotal}`);

							myCalledCards.push(myCardString);
							myCalledCards.push(mySecondCardString);

							dealerCalledCards.push(dealerCardString);
							dealerCalledCards.push(dealerSecondCardString);

							myRunningTotal += myTotal;
							dealerRunningTotal += dealerTotal;

					};

					var randSuit = (Math.floor(Math.random() * 4) + 1);
					var randNum = (Math.floor(Math.random() * 13) + 1);

					function generateCard(randSuit, randNum){

							//Hit Me Card
							this.thisCardSuit = randSuit;
							this.thisCardNumber = randNum;
							var thisCardNumberValue = this.thisCardNumber;

							if (this.thisCardSuit == 1){
									var thisCardSuitSuit = ':hearts:';
							}
							if (this.thisCardSuit == 2){
									var thisCardSuitSuit = ':spades:';
							}
							if (this.thisCardSuit == 3){
									var thisCardSuitSuit = ':diamonds:';
							}
							if (this.thisCardSuit == 4){
									var thisCardSuitSuit = ':clubs:';
							}
							
							if (this.thisCardNumber == 1){
									var thisCardNumberValue = ':one:';
									this.thisCardNumber = 1;
							}
							if (this.thisCardNumber == 2){
									var thisCardNumberValue = ':two:';
									this.thisCardNumber = 2;
							}
							if (this.thisCardNumber == 3){
									var thisCardNumberValue = ':three:';
									this.thisCardNumber = 3;
							}
							if (this.thisCardNumber == 4){
									var thisCardNumberValue = ':four:';
									this.thisCardNumber = 4;
							}
							if (this.thisCardNumber == 5){
									var thisCardNumberValue = ':five:';
									this.thisCardNumber = 5;
							}
							if (this.thisCardNumber == 6){
									var thisCardNumberValue = ':six:';
									this.thisCardNumber = 6;
							}
							if (this.thisCardNumber == 7){
									var thisCardNumberValue = ':seven:';
									this.thisCardNumber = 7;
							}
							if (this.thisCardNumber == 8){
									var thisCardNumberValue = ':eight:';
									this.thisCardNumber = 8;
							}
							if (this.thisCardNumber == 9){
									var thisCardNumberValue = ':nine:';
									this.thisCardNumber = 9;
							}
							if (this.thisCardNumber == 11){
									var thisCardNumberValue = 'Jack';
									this.thisCardNumber = 10;
							}
							if (this.thisCardNumber == 12){
									var thisCardNumberValue = 'Queen';
									this.thisCardNumber = 10;
							}
							if (this.thisCardNumber == 13){
									var thisCardNumberValue = 'King';
									this.thisCardNumber = 10;
							}
							this.thisCardString = `${thisCardNumberValue} of ${thisCardSuitSuit}`;

							this.thisCardValue = this.thisCardNumber;

					}

					var hitMe = function () {

							var newCard = new generateCard(randSuit, randNum);
						 
							for (n = 0; n < usedCards.length; n++){
									if(usedCards[n] == newCard.thisCardString){
											//rerun the card factory
											newCard = new generateCard(randSuit, randNum);
									}
									else{
									//add card to players Hand
									//add card to usedCards array
									}
							}

							myCalledCards.push(newCard.thisCardString);
							usedCards.push(newCard.thisCardString);
							myRunningTotal += newCard.thisCardValue;
					}
					var dealerHitMe = function () {

							var newCard = new generateCard(randSuit, randNum);

							for (n = 0; n < usedCards.length; n++){
									if(usedCards[n] == newCard.thisCardString){
											//rerun the card factory
											newCard = new generateCard(randSuit, randNum);
									}
									else{
									//add card to players Hand
									//add card to usedCards array
									}
							}
							dealerCalledCards.push(newCard.thisCardString);
							usedCards.push(newCard.thisCardString);
							dealerRunningTotal += newCard.thisCardValue;
					}

					initDeal();
					usedCards = myCalledCards.concat(dealerCalledCards);

					var isGameGood = 1;
					var dealerWon = 0;
					var dealerBust = 0;
					var afterHit = 0;
					var dealerAfterHit = 0;
					var preTie = 0;
					while (dealerRunningTotal < 17){
							dealerHitMe();
							dealerAfterhit = 1;
					}
					if (dealerRunningTotal >= 21){
							isGameGood = 0;
							if (dealerRunningTotal == 21){
									dealerWon = 1;
							}
							if (dealerRunningTotal > 21){
									dealerBust = 1;
							}

					}

					message.channel.send(`Your running total: ${myRunningTotal}`);
					message.channel.send(`The dealers running total: ${dealerRunningTotal}`);

					if (dealerRunningTotal == myRunningTotal){
							preTie = 1;
							message.channel.send(`Its a tie so far...`);
					}
					//Enter playing game here
					
					//
					//Determine outcome
					if (dealerRunningTotal > myRunningTotal && afterHit == 1){
							message.channel.send(`The dealer has a better hand; you lose`);
							message.channel.send(`You bet **${betAmount}** :yen: and lost it all`);
							// rl.close();
					}
					if(myRunningTotal > 21){
							message.channel.send(`You've busted. You're over 21! House wins!`);
							message.channel.send(`You bet **${betAmount}** :yen: and lost it all`);
							// rl.close();
					}
					if (dealerRunningTotal == 21){
							message.channel.send(`The house won! Dealer has blackjack!`);
							message.channel.send(`You bet **${betAmount}** :yen: and lost it all`);
							// rl.close();
					}
					if (dealerBust == 1) {
							var wonAmount = betAmount * 3;
							message.channel.send(`The dealer's hand is a bust. You win!`);
							message.channel.send(`You bet **${betAmount}** :yen: and won **${wonAmount}** :yen: !`);
							// rl.close();
					}

					if (dealerRunningTotal == myRunningTotal && afterHit == 1){
							message.channel.send(`Its a tie`);
							message.channel.send(`You keep your **${betAmount} :yen:`);
							// rl.close();
					}

					if (afterHit == 1 && myRunningTotal > dealerRunningTotal){
							if (myRunningTotal == 21){
									message.channel.send(`Blackjack!`);
									message.channel.send(`You bet **${betAmount}** :yen: and won **${wonAmount}** :yen: !`);
							}
							message.channel.send(`You won!`);
							// rl.close();
					}
					message.channel.stopTyping();
				}
			}
			else if (checkMessage[2] == '' || checkMessage[2] == ' ' || !checkMessage[2]){
					message.channel.send(`Welcome to Pinot's Blackjack Parlor! This table pays 3-to-1 on wins. You have to bet an amount for this hand e.g.: **"~startgame blackjack 30"** to bet 30 credits`);
			}
			else{
				message.channel.send(`Specify what game you want to play!`);
			}
		}
	}
	/*
	 * Checks the commands.txt file to see if anyone posted the command.
	 * commands.txt is split with semi-colons. For loop to check every single
	 * command. If there is a match, then it opens up the txt file associate
	 * with that command. If there are multiple pictures then the user should
	 * type $random{} and then type in all the pictures in the brackets
	 * separated by semi-colons. If there is no $random{} then it just sends the
	 * message.
	 */
	fs.readFile('./commands/commands.txt','utf8',function(err,f){
		var com = f.toString().split(";");
		var comlength = com.length;
		for(i = 0; i < com.length - 1; i++)
		{
			if(message.content == com[i])
			{
				var isInCommandList = true;
				if(com[i] == "~commands")
					{
						isValidCommand = true;
						comAsList = com.toString().replace(/,/g, "\n");
						//message.channel.send(`Here is the list of commands:\n${comAsList}`);
						var commandList = '\`\`\` ~commands (Obviously) \n ~help \n ~poll (Creates a votable poll) \n ~profile (Creates a nice picture of your overwatch Profile only if you have it saved) \n ~profile BattleNet#3333 (Retrieves someones Overwatch profile) \n ~set battletag Something#2121 (Set your battletag) \n ~battlenet (Creates a nice picture of someones battlenet) \n ~callmedaddy \n ~succ \n ~check farts \n ~remember \n ~roll (Roll a d# die) \n ~credits (Check your credit balance) \n ~startgame blackjack # (Under construction) \n ~add/addcredits (Only works for Pinót ) \n ~flip (Flips a coin with a bet amount to win double or nothing) \n ~dailies/~daily (Gives you 200 credits every 24 hours) \n Saying "Kactosophobia" triggers the Kactosophobia command \n Saying "fart" anywhere triggers the fart command \n Saying "furry" triggers the furry command \n !hoo \n !fuck \n !neko \n !help (SoundBot will PM you) \n PM Soundbot "!list" for a list of sound commands \n Actionable commands: "spank, tickle, bj, poke, slap, blowjob, kiss, cuddle, feed, cum, hug, pat". \n To use these type the action and @Someone. \n Example: "!slap @Pinót"\`\`\`';
						message.channel.send(`The list of commands are:  ${commandList}`);
						break;
					}
				if(com[i] == "~help")
					{
						isValidCommand = true;
						message.channel.startTyping();
						message.react("😊");
						message.channel.send(`Message my creator, <@!252667124785348608> for any help with me!`);
						message.channel.stopTyping();
						break;
					}
				if(com[i] == "~createhelp")
					{
						isValidCommand = true;
						message.channel.send("How to create commands:\n~createcommand ~NameOfCommand | Type whatever you want here");
						break;
					}
				var command = "./commands/" + com[i] + ".txt";
				fs.readFile(command,'utf8', function(err,f){
					try{
						var com2 = f.toString().split(";");
						var num = Math.random() * ((com2.length - 1) - 0) + 0;
						var isInCommandList = true;
						message.channel.send(com2[Math.floor(num)]);
					}
					catch(err) {
					//	console.error("",err);
					}
				});
			}
			if(com.indexOf(checkMessage[0]) == -1 ){
				isInCommandList = false;
			}
			
		}
	if(isCommand && isValidCommand || isInCommandList){
		console.log("Its a valid command or in the list");
	}else if (isCommand && !isInCommandList && !isValidCommand){
		console.log("Is a command but not in list or not a valid command.");
		message.channel.startTyping();
		message.react("❌");
		message.channel.send(`That is not a valid command or you do not have permission to use that command. Please use "~commands" for a list of commands.`);
		message.channel.stopTyping();
	}
	});
}
});

//function 

function delay(time) {
  var d1 = new Date();
  var d2 = new Date();
  while (d2.valueOf() < d1.valueOf() + time) {
    d2 = new Date();
  }
}
function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}
function checkExistingCommand(commandText,commandName)
{
	var com = commandName[1];
	var desc = commandText[1];
	var CE = false;
	fs.readFile('./commands/commands.txt','utf8',function(err,f){
		var findCommands = f.toString().split(";");
		for(i = 0; i < findCommands.length; i++)
		{
			if(com == findCommands[i])
			{
				CE = true;
			}
		}
		if(CE == true)
		{
			createCommand(desc,true,com);
		} else if (CE == false)
		{
			createCommand(desc,false,com);
		}
	});
	
}

// Appends and/or creates the text files.
function createCommand(desc,b,com)
{
	var fileName = "./commands/" + com + ".txt";
	if(b == true)
	{
		fs.writeFile(fileName,desc,function(err){
		if(err) {
			return console.error(err);
		}
		});
	} else if (b == false){
		fs.appendFile('./commands/commands.txt',com+';',(err) =>
		{
		if(err) throw err;
		});
		
		fs.writeFile(fileName,desc,function(err){
		if(err) {
			return console.error(err);
		}
		});
	}
	return;
}

function diff_hours(dt2, dt1) 
 {

  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 3600;
  return Math.abs(Math.round(diff));
  
 }
 
 function diff_min(dt2, dt1) 
 {

  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.floor(diff));
  
 }
 
 function diff_sec(dt2, dt1) 
 {

  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  
  return Math.abs(Math.round(diff));
  
 }

bot.login(token);
