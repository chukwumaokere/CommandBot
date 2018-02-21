//var request = require('request');

console.log('Hello!');
console.log('HardalGöt-1500');
var profileName = 'HardalGöt-1500';
var profileNameEnc = encodeURIComponent(profileName);
var profileNameEncClean = profileNameEnc.replace('%83%C2', '');
var profileNameDec = decodeURIComponent(profileName);
console.log(profileNameEnc);
console.log(profileNameEncClean);
console.log(profileNameDec);
/*
// Set the headers
var headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/x-www-form-urlencoded'
}

// Configure the request
var options = {
    url: 'http://chukwumaokere.com/test/',
    method: 'POST',
    headers: headers,
    form: {'bnet': 'HardalGöt-1500', 'key2': 'yyy'}
}

// Start the request
request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        // Print out the response body
        console.log(body)
    }
}) */