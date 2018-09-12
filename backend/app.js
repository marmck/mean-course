const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers', 
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	res.setHeader(
		'Access-Control-Allow-Methods', 
		'GET, POST, PATCH, DELETE, OPTIONS'
	);
	next();
});

//POST request for adding new posts
app.post('/api/posts', (req, res, next) => {
	const post = req.body;
	console.log(post);
	res.status(201).json({
		message: 'post added successfully'
	});
});

//GET request for getting all posts
app.get('/api/posts', (req, res, next) => {
	const posts = [
		{id: "ehwfiojweaif", 
		title: "First server post", 
		content: "This is the content of the first post."},
		{id: "skfdskjskjes", 
		title: "Second server post", 
		content: "This is the content of the SECOND post!!!"}
	];
	res.status(200).json({
		message: 'Posts fetched successfully',
		posts: posts
	});
});

module.exports = app;