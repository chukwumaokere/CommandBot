var a = ['a', 'b', 'c','d'];
var b = ['a', 'b', 'c','d'];
var rand = Math.floor(Math.random() * (a.length - 1)) + 1;

var c = a.map(function (e, i) {
        var l = (i + rand) % a.length ;
	console.log(l);
    return [a[i], b[l]];
});

console.log(c);
