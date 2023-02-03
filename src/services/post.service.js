const { BlogPost, Category, User, PostCategory } = require('../models');

const addPost = async (title, content, email, categoryIds = []) => {
  const user = await User.findOne({ where: { email } });
  const categories = await Category.findAll({ where: { id: categoryIds } });

  if (!title.length || !content.length || !categoryIds.length) {
    return { type: 400, message: 'Some required fields are missing' };
  }

  if (categories.length < categoryIds.length) {
    return { type: 400, message: 'one or more "categoryIds" not found' };
  }

  const newPost = await BlogPost.create({ title,
    content,
    userId: user.id,
    updated: Date.now(),
    published: Date.now(),
  });

  await Promise.all(
    categoryIds.map((categoryId) => PostCategory.create({ postId: newPost.id, categoryId })),
  );

  return { type: null, message: newPost };
};

const getAll = async () => {
  const posts = await BlogPost.findAll({
    attributes: { exclude: ['userId'] },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return posts;
};

module.exports = {
  addPost,
  getAll,
};