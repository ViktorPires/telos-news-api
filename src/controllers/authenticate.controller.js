const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config/env');

const { authorDataBase } = require('./authors.controller');

const { compareHash } = require("../utils/hashProvider");

const login = async (request, response) => {
    const { email, password } = request.body;

    const author = authorDataBase.find((a) => a.email === email);

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

    const { id, name, biography, email: authorEmail, createdAt, modifiedAt } = author;

    const token = jwt.sign(author, JWT_SECRET, {
        expiresIn: "1h",
    });

    return response.json({ id, name, biography, email: authorEmail, createdAt, modifiedAt, token });
};

module.exports = {
    login,
};