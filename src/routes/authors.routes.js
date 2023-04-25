const { Router } = require('express');

const authorsController = require('../controllers/authors.controller');

const routes = Router();

routes.get('/authors', authorsController.list);
routes.get('/authors/:id', authorsController.getById);

routes.post('/authors', authorsController.create);

routes.put('/authors/:id', authorsController.update);

routes.delete('/authors/:id', authorsController.remove);

module.exports = routes;