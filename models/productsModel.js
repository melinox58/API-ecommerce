const db = require('./db');

// Récupérer tous les produits
const getAllProducts = (callback) => {
  db.query('SELECT * FROM Products', (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Récupérer un produit par ID
const getProductById = (id, callback) => {
  db.query('SELECT * FROM Products WHERE id = ?', [id], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results[0]);
  });
};

// Ajouter un nouveau produit
const createProduct = (name, description, price, stock, image_id, category_id, callback) => {
  db.query('INSERT INTO Products (name, description, price, stock, image_id, category_id) VALUES (?, ?, ?, ?, ?, ?)', 
    [name, description, price, stock, image_id, category_id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results.insertId);
    }
  );
};

// Mettre à jour un produit
const updateProduct = (id, name, description, price, stock, image_id, category_id, callback) => {
  db.query('UPDATE Products SET name = ?, description = ?, price = ?, stock = ?, image_id = ?, category_id = ? WHERE id = ?', 
    [name, description, price, stock, image_id, category_id, id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    }
  );
};

// Supprimer un produit
const deleteProduct = (id, callback) => {
  db.query('DELETE FROM Products WHERE id = ?', [id], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
