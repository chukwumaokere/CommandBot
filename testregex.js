var message = "who farted here EH? fartsalot"

var checkMessage =  message.split(" ");
var countedwords = checkMessage.length;
console.log(countedwords);
var start = 0;
while (start < countedwords){
	var something =	checkMessage[start].search(/fart/);
	console.log(something);
	if (something == 0){
		console.log('fart is in here');
	}else{
		console.log('cant find fart');
	}
	start++;	
}
/*
if (checkMessage.indexOf(  ) > -1) {
	console.log('fart is in there');
}else{
	console.log('cant find fart');
}
*/
console.log(checkMessage);
