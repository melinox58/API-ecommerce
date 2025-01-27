const db = require('./db');

// Récupérer tous les détails de commande
const getAllOrderItems = (callback) => {
  db.query('SELECT * FROM Order_items', (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Récupérer les détails d'une commande par ID de commande
const getOrderItemsByOrderId = (orderId, callback) => {
  db.query('SELECT * FROM Order_items WHERE order_id = ?', [orderId], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Ajouter un nouvel élément de commande
const createOrderItem = (orderId, productId, quantity, price, callback) => {
  db.query(
    'INSERT INTO Order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)', 
    [orderId, productId, quantity, price], 
    (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results.insertId);
    }
  );
};

// Mettre à jour un élément de commande
const updateOrderItem = (id, quantity, price, callback) => {
  db.query(
    'UPDATE Order_items SET quantity = ?, price = ? WHERE id = ?', 
    [quantity, price, id], 
    (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    }
  );
};

// Supprimer un élément de commande
const deleteOrderItem = (id, callback) => {
  db.query('DELETE FROM Order_items WHERE id = ?', [id], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

module.exports = {
  getAllOrderItems,
  getOrderItemsByOrderId,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem
};
