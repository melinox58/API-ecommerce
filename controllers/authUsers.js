const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const connection = require('../models/db'); // Connexion à la base de données

// Configuration de express-session pour la gestion de la session utilisateur
const session = require('express-session');
router.use(session({
  secret: 'votre-clé-secrète', // Remplace par une clé secrète pour sécuriser la session
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // En production, il faut que secure soit true si HTTPS
}));

// Limite des tentatives de connexion (par exemple, 5 tentatives)
let loginAttempts = {};  // Stocke les tentatives pour chaque utilisateur

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Limite du nombre de tentatives (par exemple, après 5 tentatives échouées, l'utilisateur est bloqué pendant un certain temps)
  if (loginAttempts[email] && loginAttempts[email] >= 5) {
    return res.status(429).json({ error: 'Trop de tentatives, veuillez réessayer plus tard.' });
  }

  const query = 'SELECT * FROM users WHERE email = ?';
  
  try {
    // Requête SQL pour trouver l'utilisateur par email
    connection.query(query, [email], async (err, results) => {
      if (err || results.length === 0) {
        // Incrémente le nombre de tentatives en cas d'échec
        loginAttempts[email] = (loginAttempts[email] || 0) + 1;
        return res.status(401).json({ error: 'Identifiants invalides.' });  // Message générique
      }

      const user = results[0];

      // Comparaison du mot de passe avec le hash stocké
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        // Connexion réussie, création d'un token JWT
        const payload = { id: user.id, email: user.email }; // Données à inclure dans le token
        const token = jwt.sign(payload, 'votre-clé-secrète', { expiresIn: '1h' }); // Remplace 'votre-clé-secrète' par une clé secrète robuste

        // Optionnel : stocker l'utilisateur dans la session
        req.session.user = user;

        res.status(200).json({ message: 'Connexion réussie.', token, user });
      } else {
        // Incrémente le nombre de tentatives en cas d'échec de mot de passe
        loginAttempts[email] = (loginAttempts[email] || 0) + 1;
        res.status(401).json({ error: 'Identifiants invalides.' });  // Message générique
      }
    });
  } catch (err) {
    // Gère les erreurs internes
    res.status(500).json({ error: 'Erreur interne.' });
  }
});

module.exports = router;
