const db = require('./db');

// Récupérer toutes les catégories
const getAllCategories = (callback) => {
  db.query('SELECT * FROM Categories', (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Récupérer une catégorie par ID
const getCategoryById = (id, callback) => {
  db.query('SELECT * FROM Categories WHERE id = ?', [id], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results[0]);
  });
};

// Créer une nouvelle catégorie
const createCategory = (name, description, callback) => {
  db.query('INSERT INTO Categories (name, description) VALUES (?, ?)', 
    [name, description], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results.insertId);
    }
  );
};

// Mettre à jour une catégorie
const updateCategory = (id, name, description, callback) => {
  db.query('UPDATE Categories SET name = ?, description = ? WHERE id = ?', 
    [name, description, id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    }
  );
};

// Supprimer une catégorie
const deleteCategory = (id, callback) => {
  db.query('DELETE FROM Categories WHERE id = ?', [id], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};
