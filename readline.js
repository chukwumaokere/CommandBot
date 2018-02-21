const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What do you think of Node.js? ', (answer) => {
  // TODO: Log the answer in a database
  if (answer == "Good")
  {
	console.log(`Good! Thank you for your valuable feedback: ${answer}`);
  }else{
	console.log(`Thank you for your valuable feedback: ${answer}`);
  }
  

/*   rl.on('line', (input) => {
  console.log(`Received: ${input}`);
  if ()
}); */

  rl.close();
});


if (message.content.startsWith(prefix + 'role')) {
	let rolewanted = message.content.split(' ').slice(2).join(' ').toLowerCase();
	let role = message.guild.roles.find(r => r.name.toLowerCase() === rolewanted);
	if (!message.channel.permissionsFor(message.author).hasPermission("KICK_MEMBERS")) {
	   message.reply('This command requires you to have Kick_Members permission.');
	}
	else if (message.member.roles.exists(role)){ 
		message.channel.send('Cunt are you fucking retarded? You already have that role.');
	}
	else if (!role) {
		message.channel.send('Please add a role to the command like this "!role @userName roleName". ');
	}
	else{
		let member = message.mentions.members.first();
		let usertorole = message.mentions.users.first();
		member.addRole(role).catch(console.error);
		message.channel.send(usertorole.username + " Has had the role given to them!");
	}	
}