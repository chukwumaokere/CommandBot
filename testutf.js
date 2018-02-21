var utf8 = require('utf8');

var test = utf8.decode(`\xEF\xBC\xA8\xEF\xBD\x81`);

console.log(test);


