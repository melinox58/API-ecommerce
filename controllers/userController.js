const db = require('../models/db');

exports.getAllUsers = (req, res) => {
    db.query('SELECT * FROM users', (error, results) => {
        if (error) throw error;
        res.status(200).json(results);
    });
};

exports.getUserById = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM users WHERE id = ?', [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results[0]);
    });
};

exports.createUser = (req, res) => {
    const { name, email, password } = req.body;
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [name, email, password], (error, results) => {
        if (error) throw error;
        res.status(201).json({ message: 'Utilisateur créé avec succès', id: results.insertId });
    });
};

exports.updateUser = (req, res) => {
    const id = req.params.id;
    const { name, email, password } = req.body;
    const query = 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?';
    db.query(query, [name, email, password, id], (error) => {
        if (error) throw error;
        res.status(200).json({ message: 'Utilisateur mis à jour avec succès' });
    });
};

exports.deleteUser = (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM users WHERE id = ?', [id], (error) => {
        if (error) throw error;
        res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    });
};
