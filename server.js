var express = require('express');
var app = express();

app.listen(4000, function () {
	console.log('Server is listening on port 4000 and ready to accept requests');
});

app.use('/', express.static('public'));

app.get('/node', function (request, response) {
	response.send('This is NODE endpoint!');
});

app.get('/girls', function (request, response) {
	response.send('This is GIRLS endpoint!');
});

app.get('/create-post', function (request, response) {
	console.log('/create-post endpoint ======> ' + request.body);
});