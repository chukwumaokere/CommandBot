let cmd = "!gif";
msg = "!gif cool stuff"
let args = msg.split(' ');
//let argsjoin = args.join('%20'); //not needed anymore
var totalNumQuery = args.length - 1;
var gifSearchArray = [];

for (n = 1; n <= totalNumQuery; n++){
	gifSearchArray.push(args[n]);
}
var searchQuery = gifSearchArray.toString().replace(/,/g, "%20");
console.log(searchQuery);