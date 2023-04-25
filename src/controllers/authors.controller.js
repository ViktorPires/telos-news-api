const uuid = require('uuid');

const authors = [
    {
        "id": "c6e54744-b44d-45a2-8391-b46b2f5dabdb",
        "name": "John Smith",
        "biography": "John Smith is an acclaimed author with over 10 years of experience in writing science fiction. He has published several award-winning books and is known for his engaging plots and captivating characters.",
        "email": "john.smith@email.com",
        "password": "password123",
        "createdAt": "2/28/2023, 12:30:20 PM",
        "modifiedAt": "4/17/2023, 08:55:46 PM"
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

    const createdAt = new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' });

    const author = {
        id,
        name,
        biography,
        email,
        password,
        createdAt,
        modifiedAt: null,
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
    const modifiedAt = new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' });

    const authorUpdated = {
        id,
        name,
        biography,
        email,
        password,
        createdAt,
        modifiedAt,
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