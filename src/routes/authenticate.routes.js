const { Router } = require('express');

const authenticatorController = require('../controllers/authenticate.controller');

const routes = Router();

routes.post('/authenticate', authenticatorController.login);

module.exports = routes;