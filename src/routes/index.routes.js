const express = require('express');
const routes = express.Router();

const {getHome} = require('../controllers/renderControllers');
const {
  addClient,
  getAllClients,
  getOneClient,
  updateClient,
  deleteClient,
} = require('../controllers/clientsControllers');

routes.get('/', getHome);

routes.post('/add/client', addClient);

routes.get('/clients', getAllClients);

routes.get('/client/:id', getOneClient);

routes.post('/update/client/:id', updateClient);

routes.delete('/delete/client/:id', deleteClient);

module.exports = routes;
