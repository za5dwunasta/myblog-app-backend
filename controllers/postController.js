const Post = require('../models/Post');

exports.apiCreate = function(req, res) {
	let post = new Post(req.body, req.apiUser._id);
	post
		.create()
		.then(function(newId) {
			res.json(newId);
		})
		.catch(function(errors) {
			res.json(errors);
		});
};

exports.apiUpdate = function(req, res) {
	let post = new Post(req.body, req.apiUser._id, req.params.id);
	post
		.update()
		.then((status) => {
			if (status == 'warning') {
				res.json('warning');
			} else {
				res.json('failure');
			}
		})
		.catch((e) => {
			res.json('Sorry, no permissions');
		});
};

exports.apiDelete = function(req, res) {
	Post.delete(req.params.id, req.apiUser._id)
		.then(() => {
			res.json('warning');
		})
		.catch((e) => {
			res.json('Sorry, you do not have permission.');
		});
};

exports.search = function(req, res) {
	Post.search(req.body.searchTerm)
		.then((posts) => {
			res.json(posts);
		})
		.catch((e) => {
			res.json([]);
		});
};

exports.reactApiViewSingle = async function(req, res) {
	try {
		let post = await Post.findSingleById(req.params.id, 0);
		res.json(post);
	} catch (e) {
		res.json(false);
	}
};
