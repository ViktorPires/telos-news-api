const { Router } = require('express');

const authorsController = require('../controllers/authors.controller');

const { verifyAuthenticate } = require('../middlewares/verifyAuthentication');

const routes = Router();

// routes.use(verifyAuthenticate);

routes.get('/authors', authorsController.list);
routes.get('/authors/:id', authorsController.getById);

routes.post('/authors', verifyAuthenticate, authorsController.create);

routes.put('/authors/:id', authorsController.update);

routes.delete('/authors/:id', authorsController.remove);

module.exports = routes;