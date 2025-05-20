const { validationResult } = require('express-validator');
const ClientService = require('../services/clientService');
const logger = require('../utils/logger');

class ClientController {
  static async getAllClients(req, res) {
    try {
      const clients = await ClientService.getAllClients();
      res.json(clients);
    } catch (error) {
      logger.error('Get all clients controller error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getClientById(req, res) {
    try {
      const client = await ClientService.getClientById(req.params.id);
      res.json(client);
    } catch (error) {
      logger.error('Get client by id controller error:', error);
      if (error.message === 'Client not found') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async createClient(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const client = await ClientService.createClient(req.body);
      res.status(201).json(client);
    } catch (error) {
      logger.error('Create client controller error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async updateClient(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const client = await ClientService.updateClient(req.params.id, req.body);
      res.json(client);
    } catch (error) {
      logger.error('Update client controller error:', error);
      if (error.message === 'Client not found') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async deleteClient(req, res) {
    try {
      await ClientService.deleteClient(req.params.id);
      res.status(204).send();
    } catch (error) {
      logger.error('Delete client controller error:', error);
      if (error.message === 'Client not found') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async searchClients(req, res) {
    try {
      const clients = await ClientService.searchClients(req.query.q);
      res.json(clients);
    } catch (error) {
      logger.error('Search clients controller error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = ClientController; 