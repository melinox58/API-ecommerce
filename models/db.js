require('dotenv').config({ path: '.env.local' });

const mysql = require('mysql2');
const { MongoClient } = require('mongodb');

// Récupération des variables d'environnement pour MongoDB
const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoCluster = process.env.MONGO_CLUSTER;
const mongoDbName = process.env.MONGODB_DB;

// Construction de l'URL de connexion MongoDB
const mongoUrl = `mongodb+srv://${mongoUser}:${mongoPassword}@${mongoCluster}/${mongoDbName}?retryWrites=true&w=majority`;

// Vérification de la chaîne de connexion MongoDB
console.log("Mongo URL:", mongoUrl);

// Création de la connexion MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'melinox_ecommerce',
});

// Connexion MySQL
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à MySQL:', err);
    return;
  }
  console.log('Connexion à MySQL réussie.');
});

// Connexion à MongoDB
MongoClient.connect(mongoUrl)
  .then(client => {
    console.log('Connexion à MongoDB réussie');
    const dbMongo = client.db(mongoDbName);

    dbMongo.command({ ping: 1 })
      .then(result => {
        console.log('Ping MongoDB réussi:', result);
      })
      .catch(err => {
        console.error('Erreur lors du ping MongoDB:', err);
      });
  })
  .catch(err => {
    console.error('Erreur de connexion à MongoDB:', err);
  });

module.exports = db;
