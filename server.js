const express = require('express');
const bodyParser = require('body-parser');
const fs= require('fs');
const mustacheExpress = require('mustache-express');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');
app.use('/', express.static('public'));


app.listen(4000, function () {
	console.log('Server is listening on port 4000 and ready to accept requests');
});


app.get('/get-posts', function (request, response) {
	response.sendFile(__dirname + '/data/posts.json');
});

app.get('/posts/:postId', function (request, response) {
    //response.send('post id: ', request.params.postId);

    fs.readFile(__dirname + '/data/posts.json', function (error, file) {
		var parsedFile = JSON.parse(file);
		var postBody = parsedFile[request.params.postId]
	    response.render('post', { post: postBody });
	});
});

app.post('/create-post', function (request, response) {
	console.log('/create-post endpoint ======> ', request.body);
	//read current posts in file
	var parsedFile;

	fs.readFile(__dirname + '/data/posts.json', function (error, file) {
		var parsedFile = JSON.parse(file);
    	console.log("currently in the file:", parsedFile);

		//var post = []
		//post.push(({"title":request.body.blogpostTitle,"post":request.body.blogpost}));
		//= '{ title: ' + request.body.blogpostTitle + '},' 
		//						+ '{ post: ' + request.body.blogpost;
		parsedFile[Date.now()] = request.body.blogpost;

    	fs.writeFile(__dirname + '/data/posts.json', JSON.stringify(parsedFile), (err) => {
			if (err) throw err;
			console.log('It\'s saved!');
			response.redirect('/');

		});
	});


});