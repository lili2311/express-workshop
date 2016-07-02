const express = require('express');
const bodyParser = require('body-parser');
const fs= require('fs');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(4000, function () {
	console.log('Server is listening on port 4000 and ready to accept requests');
});

app.use('/', express.static('public'));

app.get('/get-posts', function (request, response) {
	response.sendFile(__dirname + '/data/posts.json');
});

app.post('/create-post', function (request, response) {
	console.log('/create-post endpoint ======> ', request.body);
	//read current posts in file
	var parsedFile;

	fs.readFile(__dirname + '/data/posts.json', function (error, file) {
		var parsedFile = JSON.parse(file);
    	console.log("currently in the file:", parsedFile);
		parsedFile[Date.now()] = request.body.blogpost;
    	fs.writeFile(__dirname + '/data/posts.json', JSON.stringify(parsedFile), (err) => {
			if (err) throw err;
			console.log('It\'s saved!');
			response.redirect('/');

		});
	});


});

fs.readFile(__dirname + '/data/posts.json', function (error, file) {
	var parsedFile = JSON.parse(file);
    console.log(file.toString());
});