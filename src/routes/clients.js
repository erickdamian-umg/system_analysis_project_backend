const express = require('express');
const router = express.Router();
const ClientController = require('../controllers/clientController');
const { clientValidators } = require('../middleware/validators');
const { authenticate } = require('../middleware/auth');

// Apply authentication middleware to all routes
router.use(authenticate);

// Client routes
router.get('/', ClientController.getAllClients);
router.get('/search', ClientController.searchClients);
router.get('/:id', ClientController.getClientById);
router.post('/', clientValidators.create, ClientController.createClient);
router.put('/:id', clientValidators.update, ClientController.updateClient);
router.delete('/:id', ClientController.deleteClient);

module.exports = router; 