const Client = require('../models/Client');
const logger = require('../utils/logger');

class ClientService {
  static async getAllClients() {
    try {
      return await Client.findAll();
    } catch (error) {
      logger.error('Error getting all clients:', error);
      throw error;
    }
  }

  static async getClientById(id) {
    try {
      const client = await Client.findById(id);
      if (!client) {
        throw new Error('Client not found');
      }
      return client;
    } catch (error) {
      logger.error('Error getting client by id:', error);
      throw error;
    }
  }

  static async createClient(clientData) {
    try {
      return await Client.create(clientData);
    } catch (error) {
      logger.error('Error creating client:', error);
      throw error;
    }
  }

  static async updateClient(id, clientData) {
    try {
      const client = await Client.findById(id);
      if (!client) {
        throw new Error('Client not found');
      }
      return await Client.update(id, clientData);
    } catch (error) {
      logger.error('Error updating client:', error);
      throw error;
    }
  }

  static async deleteClient(id) {
    try {
      const client = await Client.findById(id);
      if (!client) {
        throw new Error('Client not found');
      }
      return await Client.delete(id);
    } catch (error) {
      logger.error('Error deleting client:', error);
      throw error;
    }
  }

  static async searchClients(query) {
    try {
      return await Client.search(query);
    } catch (error) {
      logger.error('Error searching clients:', error);
      throw error;
    }
  }
}

module.exports = ClientService; 