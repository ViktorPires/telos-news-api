const mongoose = require('mongoose');

const { generateHash } = require('../utils/hashProvider');

const AuthorSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        biography: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        createdAt: {
            type: String,
        },
        modifiedAt: {
            type: String,
        }
    }, 
    {
        timestamps: false,
    }
);

AuthorSchema.pre("save", async function(next) {
    const author = this;

    author.password = await generateHash(author.password);

    return next();
});

AuthorSchema.pre("findOneAndUpdate", async function(next, options) {
    const doc = this;

    const authorUpdated = doc.getUpdate();

    !doc.options.isSamePassword ? authorUpdated.password = await generateHash(authorUpdated.password) : delete authorUpdated.password;

    return next();
});

module.exports = mongoose.model("authors", AuthorSchema);