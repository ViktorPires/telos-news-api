const uuid = require('uuid');
const moment = require('moment');

const NewsModel = require('../model/news.model');

const { NotFoundException } = require('../exceptions/NotFoundException');

const news = [
    {
        "id": "ff747c2c-2aea-49fe-86db-edb532835c44",
        "title": "Breaking News",
        "brief": "Short summary of the news",
        "content": "Full content of the news",
        "author_id": "c6e54744-b44d-45a2-8391-b46b2f5dabdb",
        "image": "https://example.com/news/image.jpg",
        "publish_date": "04/25/2023",
        "createdAt": "04/25/2023, 10:30:15 AM",
        "modifiedAt": "04/26/2023, 11:45:20 AM",
        "modifiedLastBy": "c6e54744-b44d-45a2-8391-b46b2f5dabdb",
        "modifiedByAuthor": ["c6e54744-b44d-45a2-8391-b46b2f5dabdb"]
    }     
];

const list = async (request, response) => {
    const { author_id } = request.query;

    try {
        if(author_id) {
                const filteredNews = await NewsModel.find({author_id: author_id});

                if(!filteredNews || filteredNews.length === 0) {
                    throw new NotFoundException(`No news found for author with ID ${author_id}`);
                };

                return response.json(filteredNews);
            };

        const news = await NewsModel.find();

        return response.json(news);
    } catch(err) {
        if (err instanceof NotFoundException) {
            return response.status(404).json({
                error: '@news/list',
                message: err.message,
            });
        }
        return response.status(400).json({
            error: '@news/list',
            message: err.message || "Failed to list news",
        });
    }
};

const getById = (request, response) => {
    const { id } = request.params;

    const info = news.find((n) => n.id === id);

    if(!info) {
        return response.status(400).json({
            error: '@news/getById',
            message: `News not found ${id}`,
        });
    };

    return response.json(info);
};

const create = (request, response) => {
    const { title, brief, content, image, publish_date } = request.body;
    const author_id = request.author.id;

     if(!publish_date || !moment(publish_date, 'MM/DD/YYYY', true).isValid()) {
        return response.status(400).json({
            error: '@news/create',
            message: 'Publish date is required and should be in format MM/DD/YYYY',
        });
    };

    const id = uuid.v4();

    const createdAt = moment().utcOffset('-03:00');
    const formattedDate = createdAt.format('MM/DD/YYYY, h:mm:ss A');

    const info = {
        id,
        title,
        brief,
        content,
        author_id,
        image,
        publish_date,
        createdAt: formattedDate,
        modifiedAt: null,
        modifiedLastBy: null,
        modifiedByAuthor: []
    };

    news.push(info);

    return response.status(201).json(info);
};

const update = (request, response) => {
    const { id } = request.params;
    const { title, brief, content, image, publish_date} = request.body;
    const modifiedLastBy = request.author.id;

    const infoIndex = news.findIndex((n) => n.id === id);

    if(infoIndex < 0) {
        return response.status(400).json({
            error: '@news/update',
            message: `News not found ${id}`
        });
    };

    if(!publish_date || !moment(publish_date, 'MM/DD/YYYY', true).isValid()) {
        return response.status(400).json({
            error: '@news/create',
            message: 'Publish date is required and should be in format MM/DD/YYYY',
        });
    };

    const info = news[infoIndex];
    const author_id = info.author_id;
    const createdAt = info.createdAt;
    const modifiedByAuthor = info.modifiedByAuthor;

    const verifyAuthor = modifiedByAuthor.findIndex((a) => a === modifiedLastBy);

    if(verifyAuthor < 0) {
        modifiedByAuthor.push(modifiedLastBy);
    };

    const modifiedAt = moment().utcOffset('-03:00');
    const formattedDate = modifiedAt.format('MM/DD/YYYY, h:mm:ss A');

    const infoUpdated = {
        id,
        title,
        brief,
        content,
        author_id,
        image,
        publish_date,
        createdAt,
        modifiedAt: formattedDate,
        modifiedLastBy,
        modifiedByAuthor
    };

    news[infoIndex] = infoUpdated;

    return response.json(infoUpdated);
};

const remove = (request, response) => {
    const { id } = request.params;

    const infoIndex = news.findIndex((n) => n.id === id);

    if(infoIndex < 0) {
        return response.status(400).json({
            error: '@news/remove',
            message: `News not found ${id}`
        });
    };

    news.splice(infoIndex, 1);

    return response.send();
};

module.exports = {
    list,
    getById,
    create,
    update,
    remove,
};