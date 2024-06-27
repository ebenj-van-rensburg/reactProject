const Post = require('../models/Post');

exports.createPost = async (req, res) => {
    const { title, content } = req.body;
    const post = new Post({
        title,
        content,
        user: req.user._id,
    });

    const createdPost = await post.save();
    res.status(201).json(createdPost);
};

exports.getPostsByUser = async (req, res) => {
    const posts = await Post.find({ user: req.params.userId });
    res.json(posts);
};

exports.getPostById = async (req, res) => {
    const post = await Post.findById(req.params.id).populate('user', 'username email');

    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
};