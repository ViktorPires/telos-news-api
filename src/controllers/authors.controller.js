const uuid = require('uuid');
const moment = require('moment');

const authors = [
    {
        "id": "c6e54744-b44d-45a2-8391-b46b2f5dabdb",
        "name": "John Smith",
        "biography": "John Smith is an acclaimed author with over 10 years of experience in writing science fiction. He has published several award-winning books and is known for his engaging plots and captivating characters.",
        "email": "john.smith@email.com",
        "password": "password123",
        "createdAt": "02/28/2023, 12:30:20 PM",
        "modifiedAt": "04/17/2023, 08:55:46 PM"
    }
];

const list = (request, response) => {
   return response.json(authors);
};

const getById = (request, response) => {
    const { id } = request.params;

    const author = authors.find((a) => a.id === id);

    if(!author) {
        return response.status(400).json({
            error: '@authors/getByID',
            message: `Author not found ${id}`
        });
    }

   return response.json(author);
};

const create = (request, response) => {
    const { name , biography, email, password } = request.body;

    const authorExists = authors.find((a) => a.email === email);
      
    if(authorExists) {
        return response.status(400).json({
            error: '@authors/create',
            message: "E-mail already registered" 
        });
    };

    const id = uuid.v4();

    const createdAt = moment().utcOffset('-03:00');
    const formattedDate = createdAt.format('MM/DD/YYYY, h:mm:ss A');

    const author = {
        id,
        name,
        biography,
        email,
        password,
        createdAt: formattedDate,
        modifiedAt: null
    };
    
    authors.push(author);

   return response.status(201).json(author);
};

const update = (request, response) => {
    const { id } = request.params;
    const { name, biography, email, password } = request.body;

    const authorIndex = authors.findIndex((a) => a.id === id);

    if(authorIndex < 0) {
        return response.status(400).json({
            error: '@authors/update',
            message: `Author not found ${id}`
        });
    };

    const author = authors[authorIndex];
    const createdAt = author.createdAt;

    const modifiedAt = moment().utcOffset('-03:00');
    const formattedDate = modifiedAt.format('MM/DD/YYYY, h:mm:ss A');

    const authorUpdated = {
        id,
        name,
        biography,
        email,
        password,
        createdAt,
        modifiedAt: formattedDate
    };

    authors[authorIndex] = authorUpdated;

   return response.json(authorUpdated);
};

const remove = (request, response) => {
    const { id } = request.params;

    const authorIndex = authors.findIndex((a) => a.id === id);

    if(authorIndex < 0) {
        return response.status(400).json({
            error: '@authors/remove',
            message: `Author not found ${id}`
        });
    };

    authors.splice(authorIndex, 1);

    return response.send();
};

module.exports = {
    list,
    getById,
    create,
    update,
    remove,
    authorDataBase: authors,
};