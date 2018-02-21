const Discord = require('discord.js');
const bot = new Discord.Client();
var fs = require("fs");
var oldAuthor;

// ADD YOUR BOT'S TOKEN HERE
const token = "Mjk3MTI1MzMwMTEwMzgyMDgy.C78PHA.dq_YiSyvxo385UO8g735or_F9Mk";

bot.on('ready', () => {
  bot.user.setGame("with my code");
  bot.user.setStatus("online");
});


bot.on('message', async(message) => {
	var checkMessage = message.content.split(" ");
	var isCommand = false;

	//Make sure the first character is ~
	if (checkMessage[0].charAt(0) == "~"){
		var isCommand = true;
		var isValidCommand = false;
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
				//message.channel.fetchMessage('335454375470170115').then(message => console.log(message.content)).catch(console.error);
			}else{
				message.channel.send("EH?! Nani kore... You're not my daddy. <@!252667124785348608> is my daddy!");
			}
			
		}
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
			
			//await message.channel.send `${message.id}`;
			//console.log(messageId);
			//message.channel.fetchMessage(messageId).then(message => console.log(message.content)).catch(console.error);;
			let botMessage;
			await message.channel.fetchMessage(messageId).then(message => botMessage = message);
			console.log(botMessage);
			for (b = 1; b <= totalCount; b++){
				await botMessage.react(`${b}⃣`);
			}
			//botMessage.react("1⃣");
			//message.react("2⃣")
			
			message.channel.stopTyping();
			
			//message.channel.fetchMessages(1).then(message => console.log(message.content)).catch(console.error);
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
						message.channel.send(`Here is the list of commands:\n${comAsList}`);
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
		message.channel.send(`That is not a valid command. Please use "~commands" for a list of commands.`);
		message.channel.stopTyping();
	}
	});
});

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

bot.login(token);
