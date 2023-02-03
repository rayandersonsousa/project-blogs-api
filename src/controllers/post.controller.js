const postService = require('../services/post.service');

const addPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;

  const { type, message } = await postService
  .addPost(title, content, req.email, categoryIds);

  if (type) {
    return res.status(type).json({ message });
  }

  return res.status(201).json(message);
};

module.exports = {
  addPost,
};