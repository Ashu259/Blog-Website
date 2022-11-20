const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This field is required.'
    },
    description: {
        type: String,
        required: 'This field is required.'
    },
    difficulty: {
        type: String,
        required: 'This field is required.'
    },
    category: {
        type: String,
        enum: ['FrontEnd', 'BackEnd', 'Languages', 'Interview Experiences', 'DSA'],
        required: 'This field is required.'
    },
    image: {
        type: String,
        required: 'This field is required.'
    }
});

postSchema.index({ name: 'text', difficulty: 'text' });

module.exports = mongoose.model('Post', postSchema);    