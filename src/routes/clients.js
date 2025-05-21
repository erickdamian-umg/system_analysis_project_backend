const express = require('express');
const router = express.Router();
const ClientController = require('../controllers/clientController');
const { clientValidators } = require('../middleware/validators');
const authenticate = require('../middleware/auth');
const validate = require('../middleware/validate');

// Apply authentication middleware to all routes
router.use(authenticate);

// Client routes
router.get('/', ClientController.getAllClients);
router.get('/search', ClientController.searchClients);
router.get('/:id', ClientController.getClientById);
router.post('/', clientValidators.create, validate, ClientController.createClient);
router.put('/:id', clientValidators.update, validate, ClientController.updateClient);
router.delete('/:id', ClientController.deleteClient);

module.exports = router; 