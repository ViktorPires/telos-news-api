const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true,
        },
        brief: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        author_id: {
            type: String,
        },
        image: {
            type: String,
            required: true,
        },
        publish_date: {
            type: String,
            required: true,
        },
        createdAt: {
            type: String,
        },
        modifiedAt: {
            type: String,
        },
        modifiedLastBy: {
            type: String,
        },
        modifiedByAuthor: {
            type: Array,
        }
    }, 
    {
        timestamps: false,
    }
);

module.exports = mongoose.model("news", NewsSchema);