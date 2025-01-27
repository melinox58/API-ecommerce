const db = require('./db');

// Récupérer tous les utilisateurs
const getAllUsers = (callback) => {
  db.query('SELECT * FROM Users', (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Récupérer un utilisateur par ID
const getUserById = (id, callback) => {
  db.query('SELECT * FROM Users WHERE id = ?', [id], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results[0]);
  });
};

// Ajouter un utilisateur
const createUser = (name, email, password, callback) => {
  db.query('INSERT INTO Users (name, email, password) VALUES (?, ?, ?)', [name, email, password], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results.insertId);
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser
};
