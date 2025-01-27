const orderItemModel = require('../models/orderItemsModel');

// Récupérer tous les détails de commande
const getAllOrderItems = (req, res) => {
  orderItemModel.getAllOrderItems((err, items) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la récupération des détails de commande' });
    }
    res.status(200).json(items);
  });
};

// Récupérer les détails d'une commande par ID de commande
const getOrderItemsByOrderId = (req, res) => {
  const orderId = req.params.orderId;
  orderItemModel.getOrderItemsByOrderId(orderId, (err, items) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la récupération des éléments de commande' });
    }
    res.status(200).json(items);
  });
};

// Ajouter un nouvel élément de commande
const createOrderItem = (req, res) => {
  const { orderId, productId, quantity, price } = req.body;
  orderItemModel.createOrderItem(orderId, productId, quantity, price, (err, itemId) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de l’ajout de l’élément de commande' });
    }
    res.status(201).json({ message: 'Élément de commande ajouté avec succès', id: itemId });
  });
};

// Mettre à jour un élément de commande
const updateOrderItem = (req, res) => {
  const id = req.params.id;
  const { quantity, price } = req.body;
  orderItemModel.updateOrderItem(id, quantity, price, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la mise à jour de l’élément de commande' });
    }
    res.status(200).json({ message: 'Élément de commande mis à jour avec succès' });
  });
};

// Supprimer un élément de commande
const deleteOrderItem = (req, res) => {
  const id = req.params.id;
  orderItemModel.deleteOrderItem(id, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la suppression de l’élément de commande' });
    }
    res.status(200).json({ message: 'Élément de commande supprimé avec succès' });
  });
};

module.exports = {
  getAllOrderItems,
  getOrderItemsByOrderId,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem
};
