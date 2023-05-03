const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config/env');

const AuthorModel = require("../model/author.model");

const { compareHash } = require("../utils/hashProvider");

const login = async (request, response) => {
    const { email, password } = request.body;

    const author = await AuthorModel.findOne({ email }).lean();

    const loginErrorMessage = {
        error: '@authenticate/login',
        message: "Invalid author or password",
    };

    if(!author) {
        return response.status(400).json({loginErrorMessage});
    };

    const isValidPassword = await compareHash(password, author.password);

    if(!isValidPassword) {
        return response.status(400).json(loginErrorMessage);
    };

    const token = jwt.sign(author, JWT_SECRET, {
        expiresIn: "1h",
    });

    delete author.password;

    return response.json({ ...author, token });
};

module.exports = {
    login,
};