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
	// Makes sure the first word is ~createcommand
	var isInCommandList = false;
	var checkMessage = message.content.split(" ");
	if(checkMessage[0] == "~createcommand")
	{
		var isInCommandList = true;
		// commandText gets grabbed by splitting the string with |
		// commandName gets grabbed by splitting the string with spaces
		// command Name must have '~' in it just so you can't use any word you
		// want
		var commandText = message.content.split("|",2);
		var commandName = message.content.split(" ");
		if(commandName[1].charAt(0) == "~")
			{
				checkExistingCommand(commandText,commandName);
				message.channel.sendMessage("Command " + commandName[1] + " has been created");
			} else {
				message.channel.sendMessage("Command must contain '~'");
			}
	}
	if(checkMessage[0] == "~profile" && typeof checkMessage[1] === 'string' && checkMessage[0] !== ' '){
		var isInCommandList = true;
		var profileNameRoot = message.content.split(" ");
		var profileName1 = profileNameRoot[1];
		var profileName = profileName1.replace("#", "-");
		var profileNameDec = decodeURIComponent(profileName);
		var profileNameEnc = encodeURIComponent(profileName);
		var profileNameEncClean = profileNameEnc.replace('%83%C2', '');
		//$encod = utf8_encode($user1);
			//$user =  rawurlencode($encod);
		if(typeof checkMessage[1] === 'string'){
			//var filesToSend = ["http://i.imgur.com/6CbxaPc.jpg", "http://i.imgur.com/6CbxaPc.jpg"];
			message.channel.startTyping();
			message.react("👍");
			//message.channel.sendMessage("http://chukwumaokere.com/test/profile.php?bnet=" + profileName + "").then(message => console.log(`Sent message: ${message.content} with profile name ${profileName}`)).catch(console.error);
			//message.channel.send('Hello!').then(m => console.log(`Sent message: ${message.content}`)).catch(console.error);
			//message.channel.send('Hello!').then(m => console.log(`Sent message: ${m.content}`)).catch(console.error);
			//message.channel.send("http://chukwumaokere.com/test/profile.php?bnet=" + profileName + "", files = `border.png`).then(m => console.log(`Sent message: ${m.content} with profile name ${profileName}`)).catch(console.error);
			//message.channel.sendFile(`./border.png`, `./border.png`, `lol`, (err, m) => { if (err) console.log(err); }); 
			//var fileToSend = "http://i.imgur.com/6CbxaPc.jpg";
			//fileToSend.toString();
			//message.channel.sendFile(fileToSend, fileToSend, fileToSend);
			//message.channel.send('', {files: ['http://chukwumaokere.com/test/images/Peekaboo-11628.png']}).then(m => console.log(`Sent message: ${m.content} with profile name ${profileName}`)).catch(console.error);
			
			await message.channel.send("http://chukwumaokere.com/test/profile.php?bnet=" + profileNameDec + "").then(m => m.delete()).then(m => console.log(`Sent message: ${m.content} with profile name ${profileName}`)).catch(console.error);
			wait(4000);
			//wait(2000);
			await message.channel.send("", {files: ["http://chukwumaokere.com/test/images/" + profileNameEncClean + ".png"]}).then(m => console.log(`Sent image: ${m.content} of ${profileName}`)).catch(console.error);
			//message.channel.delete();
			message.channel.stopTyping();
			
			
			/*
			if(typeof profileName === 'string'){
				console.log("its a string");
			}else{
				console.log('its not a string');
			}
			*/
			
			//console.log(checkMessage[1].charAt(0));
			//console.log(typeof profileName);
			//.sendFiles(filesToSend[0], "")
			//message.channel.sendFiles("http://i.imgur.com/6CbxaPc.jpg");
			//bot.sendFile(message.channel, 'http://i.imgur.com/6CbxaPc.jpg', 'kappa.jpg', 'Check out this cool file!');
        }
	}else if (checkMessage[0] == "~profile"){
			var isInCommandList = true;
			message.channel.sendMessage(`The "~profile" command must contain the BattleTag (case-sensitive; accents are welcome!), a hashtag or dash, and the numbers (ex: "~profile Pinót-1367" or "~profile Pinót#1367")`);
	}
	
	//else if ($checkMessage[0] != '~profile' && $checkMessage[0] != '~help' && $checkMessage[0] != '~commands' && $checkMessage[0] != '~createcommand' && isInCommandList == false) {
	//	message.channel.send("Command does not exist. Please use ~commands for a list of commands.");
	//}
	
	/*
	 * Checks the commands.txt file to see if anyone posted the command.
	 * commands.txt is split with semi-colons. For loop to check every single
	 * command. If there is a match, then it opens up the txt file associate
	 * with that command. If there are multiple pictures then the user should
	 * type $random{} and then type in all the pictures in the brackets
	 * separated by semi-colons. If there is no $random{} then it just sends the
	 * message.
	 */
	//console.log(`isInCommandList = ${isInCommandList}`);
	fs.readFile('./commands/commands.txt','utf8',function(err,f){
		var com = f.toString().split(";");
		for(i = 0; i < com.length; i++)
		{
			if(message.content == com[i])
			{
				var isInCommandList = true;
				if(com[i] == "~commands")
					{
						var isInCommandList = true;
						message.channel.sendMessage(com);
						break;
					}
				if(com[i] == "~help")
					{
						var isInCommandList = true;
						message.channel.sendMessage("How to create commands:\n~createcommand ~NameOfCommand | Type whatever you want here");
						break;
					}
				/*
				if(com[i] == "~profile")
					{
						var profileNameRoot = message.content.split(" ", 2);
						var profileName = profileNameRoot[1];
						message.channel.sendMessage("http://chukwumaokere.com/test/profile.php?bnet=TheRedMan-11954" + profileNameRoot + "");
						break;
					}
				*/
				var command = "./commands/" + com[i] + ".txt";
				fs.readFile(command,'utf8', function(err,f){
				try{
					var com2 = f.toString().split(";");
					var num = Math.random() * ((com2.length - 1) - 0) + 0;
					var isInCommandList = true;
					message.channel.sendMessage(com2[Math.floor(num)]);
				}
				catch(err) {
					console.error("",err);
				}
				});
			}
		}
		//console.log(`isInCommandList = ${isInCommandList}`);
	});
});

function sendSomeMessage(){
	message.channel.send("http://chukwumaokere.com/test/profile.php?bnet=" + profileName + "").then(m => console.log(`Sent message: ${m.content} with profile name ${profileName}`)).catch(console.error);
}
function sendImage(){
	message.channel.send("file here: http://chukwumaokere.com/test/images/" + profileName + ".png", {files: ["http://chukwumaokere.com/test/images/" + profileName + ".png"]}).then(m => console.log(`Sent image: ${m.content} of ${profileName}`)).catch(console.error);
}
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
