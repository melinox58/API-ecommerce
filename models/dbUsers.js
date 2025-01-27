const bcrypt = require('bcrypt');
const mysql = require('mysql2'); // ou require('mysql') selon votre configuration

// Connexion à la base de données
const connection = mysql.createConnection({
  host: 'mysql-melinox.alwaysdata.net',
  user: 'melinox_ecom',
  password: '4gr9365bf3jui9',
  database: 'melinox_ecommerce'
});

const users = [
  { name: 'Alice Dupont', email: 'alice.dupont@example.com', password: 'password123' },
  { name: 'Jean Martin', email: 'jean.martin@example.com', password: 'securepass' },
  { name: 'Marie Curie', email: 'marie.curie@example.com', password: 'science2024' },
  { name: 'Thomas Edison', email: 'thomas.edison@example.com', password: 'lightbulb' },
  { name: 'Ada Lovelace', email: 'ada.lovelace@example.com', password: 'algorithm2024' }
];

const saltRounds = 10;

async function insertUsers() {
  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    const query = 'INSERT INTO users (name, email, password, created_at) VALUES (?, ?, ?, NOW())';
    connection.query(query, [user.name, user.email, hashedPassword], (err, result) => {
      if (err) {
        console.error('Erreur lors de l\'insertion des utilisateurs :', err);
      } else {
        console.log('Utilisateur inséré avec succès :', result.insertId);
      }
    });
  }
  connection.end();
}

insertUsers();
