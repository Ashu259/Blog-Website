const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

/**
 * App Routes
*/
router.get('/', postController.homepage);
router.get('/post/:id', postController.explorePosts);
router.get('/categories', postController.exploreCategories);
router.get('/categories/:id', postController.exploreCategoriesByID);
router.post('/search', postController.searchPost);
router.get('/explore-latest', postController.exploreLatest);
router.get('/explore-random', postController.exploreRandom);
router.get('/submit-blog', postController.submitPost);
router.post('/submit-blog', postController.submitPostonBlog);


module.exports = router;