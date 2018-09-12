const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect('mongodb+srv://marmck:TqfNGDAD83fTapmJ@cluster0-b3unt.mongodb.net/node-angular?retryWrites=true')
	.then(() => {
		console.log("Connection successful");
	})
	.catch(() => {
		console.log("Connection failed");
	})

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
	const post = new Post({
		title: req.body.title,
		content: req.body.content
	})
	console.log(post);
	post.save()
		.then(result => {
			res.status(201).json({
				message: 'post added successfully',
				postId: result._id
			});
		});
	
});

//GET request for getting all posts
app.get('/api/posts', (req, res, next) => {
	Post.find()
		.then(documents => {
			res.status(200).json({
				message: 'Posts fetched successfully',
				posts: documents
			});
			console.log(documents);
		});
	
});

//DELETE request for a post
app.delete('/api/posts/:id', (req, res, next) => {
	console.log(req.params.id);
	Post.deleteOne({ _id: req.params.id })
		.then(result => {
			console.log(result);
			res.status(200).json({
				message: "Post deleted"
			});
		})
		.catch(() => {
			console.log("Delete Failed");
		});
});

module.exports = app;