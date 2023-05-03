const moment = require('moment');

const { compareHash } = require('../utils/hashProvider');

const AuthorModel = require("../model/author.model");

const list = async (request, response) => {
    try {
        const authors = await AuthorModel.find({}, { password: 0 });

         return response.json(authors);
    } catch(err) {
        return response.status(400).json({
            error: "@authors/list",
            message: err.message || "Failed to list authors",
        });
    }
};

const getById = async (request, response) => {
    const { id } = request.params;

    try{
        const author = await AuthorModel.findById(id, { password: 0 });
        
        if(!author) {
            throw new Error();
        };

        return response.json(author);
    } catch(err) {
        return response.status(400).json({
            error: '@authors/getByID',
            message: err.message || `Author not found ${id}`,
            });
        }
    };

const create = async (request, response) => {
    const { name , biography, email, password } = request.body;

    try {
        const createdAt = moment().utcOffset('-03:00');
        const formattedDate = createdAt.format('MM/DD/YYYY, h:mm:ss A');

        const author = await AuthorModel.create({
            name,
            biography,
            email,
            password,
            createdAt: formattedDate,
            modifiedAt: null
        });
        return response.status(201).json(author);
    } catch(err) {
        return response.status(400).json({
            error: "@authors/create",
            message: err.message || "Failed to create author",
        }); 
    };
};

const update = async (request, response) => {
    const { id } = request.params;
    const { name, biography, email, password } = request.body;

    try{
        const modifiedAt = moment().utcOffset('-03:00');
        const formattedDate = modifiedAt.format('MM/DD/YYYY, h:mm:ss A');

        const authorDB = await AuthorModel.findById(id).select('password');

        const isSamePassword = await compareHash(password, authorDB.password);

        const authorUpdated = await AuthorModel.findByIdAndUpdate(id, {
                name,
                biography,
                email,
                password,
                modifiedAt: formattedDate
            },
            {  
                new: true,
                isSamePassword: isSamePassword
            }
        );

        if(!authorUpdated) {
            throw new Error();
        }
        
        return response.json(authorUpdated);
    } catch(err) {
         return response.status(400).json({
            error: '@authors/update',
            message: err.message || `Author not found ${id}`
        });
    }
};

const remove = async (request, response) => {
    const { id } = request.params;

    try {
        const authorDeleted = await AuthorModel.findByIdAndDelete(id);

        if(!authorDeleted) {
            throw new Error();
        }

        return response.status(204).send();
    } catch(err) {
        return response.status(400).json({
            error: '@authors/remove',
            message: err.message || `Author not found ${id}`
        });
    }
};

module.exports = {
    list,
    getById,
    create,
    update,
    remove,
};