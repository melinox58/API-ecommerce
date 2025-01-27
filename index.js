require('dotenv').config({ path: '.env.local' }); // Charger à partir de .env.local

const express = require("express");
const port = process.env.PORT || 5000;
const app = express();

require('dotenv').config();
const db = require('./models/db.js');

// Middleware qui permet de traiter les données des requêtes POST
app.use(express.json());
// Middleware qui permet de traiter les requêtes POST avec des données encodées
app.use(express.urlencoded({ extended: true }));

// Routes
const userRoutes = require('./routes/usersRoutes')
app.use('/users', userRoutes);

const productRoutes = require('./routes/productsRoutes');
app.use('/products', productRoutes);


const categoryRoutes = require('./routes/categoriesRoutes');
app.use('/categories', categoryRoutes);

const orderRoutes = require('./routes/ordersRoutes');
app.use('/orders', orderRoutes);

const orderItemRoutes = require('./routes/orderItemsRoutes');
app.use('/order-items', orderItemRoutes);

// Test route
app.get("/", (req, res) => {
    res.status(200).json({message: "Bienvenue sur mon API en Node JS"})
});

const imagesRoutes = require('./routes/imagesRoutes');
app.use('/images', imagesRoutes);


// Start server
app.listen(port, () => {
    console.log("Server en ligne !");
});
