const orderModel = require('../models/ordersModel');

// Récupérer toutes les commandes
const getAllOrders = (req, res) => {
  orderModel.getAllOrders((err, orders) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la récupération des commandes' });
    }
    res.status(200).json(orders);
  });
};

// Récupérer une commande par ID
const getOrderById = (req, res) => {
  const id = req.params.id;
  orderModel.getOrderById(id, (err, order) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la récupération de la commande' });
    }
    if (!order) {
      return res.status(404).json({ error: 'Commande non trouvée' });
    }
    res.status(200).json(order);
  });
};

// Créer une nouvelle commande
const createOrder = (req, res) => {
  const { userId, total, status } = req.body;
  orderModel.createOrder(userId, total, status || 'pending', (err, orderId) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la création de la commande' });
    }
    res.status(201).json({ message: 'Commande créée avec succès', id: orderId });
  });
};

// Mettre à jour le statut d'une commande
const updateOrder = (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  orderModel.updateOrder(id, status, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la mise à jour de la commande' });
    }
    res.status(200).json({ message: 'Commande mise à jour avec succès' });
  });
};

// Supprimer une commande
const deleteOrder = (req, res) => {
  const id = req.params.id;
  orderModel.deleteOrder(id, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la suppression de la commande' });
    }
    res.status(200).json({ message: 'Commande supprimée avec succès' });
  });
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder
};
