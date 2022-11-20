require('../models/database');
const Category = require('../models/Category');
const Post = require('../models/Post');

/**
 * GET /
 * Homepage
 */
exports.homepage = async(req, res) => {
    try {     
        const limitNumber = 5;
        const categories = await Category.find({}).limit(limitNumber);
        const latest = await Post.find({}).sort({_id: -1}).limit(limitNumber);
        const frontend = await Post.find({ 'category': 'FrontEnd' }).limit(limitNumber);
        const backend = await Post.find({ 'category': 'BackEnd' }).limit(limitNumber);
        const languages = await Post.find({ 'category': 'Languages' }).limit(limitNumber);
        const dsa = await Post.find({ 'category': 'DSA' }).limit(limitNumber);
        const interview = await Post.find({ 'category': 'Interview Experiences' }).limit(limitNumber);
        const recent_post = { latest, frontend, backend, languages, dsa, interview };

        res.render('index', { title: 'Blog - Home', categories, recent_post } );
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured"});
    }
}



/**
 * GET /categories
 * Categories
*/
exports.exploreCategories = async(req, res) => {
    try {     
        const limitNumber = 20;
        const categories = await Category.find({}).limit(limitNumber);
        res.render('categories', { title: 'Blog - Categories', categories } );
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured"});
    }
}


/**
 * GET /categories/:id
 * Categories By ID
 */
exports.exploreCategoriesByID = async(req, res) => {
    try {     
        let categoryId = req.params.id;
        const limitNumber = 20;
        const categoryById = await Post.find({ 'category': categoryId }).limit(limitNumber);
        res.render('categories', { title: 'Blog - Categories', categoryById } );
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured"});
    }
}

/**
 * GET /customposts/:id
 * Blog page
 */
exports.explorePosts = async(req, res) => {
    try {     
        let postID = req.params.id;
        const post = await Post.findById(postID);
        
        res.render('custom_posts', { title: 'Blog', post } );
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured"});
    }
}


/**
 * POST /search
 * Search
*/
exports.searchPost = async(req, res) => {
    try {
        let searchTerm = req.body.searchTerm;
        let post = await Post.find({$text:{$search:searchTerm, $diacriticSensitive: true}});
        res.render('search', { title: 'Blog-Search', post} );
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured"});
    }   
}

/**
 * GET /explore-latest
 * Explore Latest
*/
exports.exploreLatest = async(req, res) => {
    try {     
        const limitNumber = 20;
        const post = await Post.find({}).sort({ _id: -1 }).limit(limitNumber);
        
        res.render('explore-latest', { title: 'Read Latest Blogs', post } );
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured"});
    }
}


/**
 * GET /explore-random
 * Explore Random as JSON
*/
exports.exploreRandom = async(req, res) => {
    try {     
        let count = await Post.find().countDocuments();
        let random = Math.floor(Math.random() * count);
        let post = await Post.findOne().skip(random).exec();
        res.render('explore-random', { title: 'Read Latest Blogs', post } );
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured"});
    }
}


/**
 * GET /submit-post
 * Post Blog onto our website
*/
exports.submitPost = async(req, res) => {
    const infoErrorsObj = req.flash('infoErrors');
    const infoSubmitObj = req.flash('infoSubmit');

    res.render('submit-post', { title: 'Post Blog', infoErrorsObj, infoSubmitObj } );
}

/**
 * POST /submit-post
 * Post Blog onto our website
*/
exports.submitPostonBlog = async(req, res) => {
    try {

        let imageUploadFile;
        let uploadPath;
        let newImageName;

        if(!req.files || Object.keys(req.files).length === 0){
            console.log('No files were uploaded');
        } else {

            imageUploadFile = req.files.image;
            newImageName = imageUploadFile.name;

            uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;
            imageUploadFile.mv(uploadPath, function (err) {
                if (err) return res.status(500).send(err);
            })
        }

        const newBlog = new Post({
            name: req.body.name,
            description: req.body.description,
            difficulty: req.body.difficulty,
            category: req.body.category,
            image: newImageName
        });

        await newBlog.save();

        req.flash('infoSubmit', 'Your blog has been successfully posted.');
        res.redirect('/submit-blog');
    } catch (error) {
        req.flash('infoErrors', error);
        res.redirect('/submit-blog');
    }
    
}

