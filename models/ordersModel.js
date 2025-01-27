const db = require('./db');

// Récupérer toutes les commandes
const getAllOrders = (callback) => {
  db.query('SELECT * FROM Orders', (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Récupérer une commande par ID
const getOrderById = (id, callback) => {
  db.query('SELECT * FROM Orders WHERE id = ?', [id], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results[0]);
  });
};

// Créer une nouvelle commande
const createOrder = (userId, total, status, callback) => {
  db.query('INSERT INTO Orders (user_id, total, status) VALUES (?, ?, ?)', 
    [userId, total, status], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results.insertId);
    }
  );
};

// Mettre à jour une commande
const updateOrder = (id, status, callback) => {
  db.query('UPDATE Orders SET status = ? WHERE id = ?', 
    [status, id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    }
  );
};

// Supprimer une commande
const deleteOrder = (id, callback) => {
  db.query('DELETE FROM Orders WHERE id = ?', [id], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder
};
