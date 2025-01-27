const productModel = require('../models/productsModel');

// Récupérer tous les produits
const getAllProducts = (req, res) => {
  productModel.getAllProducts((err, products) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
    }
    res.status(200).json(products);
  });
};

// Récupérer un produit par ID
const getProductById = (req, res) => {
  const id = req.params.id;
  productModel.getProductById(id, (err, product) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la récupération du produit' });
    }
    if (!product) {
      return res.status(404).json({ error: 'Produit non trouvé' });
    }
    res.status(200).json(product);
  });
};

// Créer un nouveau produit
const createProduct = (req, res) => {
  const { name, description, price, stock, image_id, category_id } = req.body;
  productModel.createProduct(name, description, price, stock, image_id, category_id, (err, productId) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la création du produit' });
    }
    res.status(201).json({ message: 'Produit créé avec succès', id: productId });
  });
};

// Mettre à jour un produit
const updateProduct = (req, res) => {
  const id = req.params.id;
  const { name, description, price, stock, image_id, category_id } = req.body;
  productModel.updateProduct(id, name, description, price, stock, image_id, category_id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la mise à jour du produit' });
    }
    res.status(200).json({ message: 'Produit mis à jour avec succès' });
  });
};

// Supprimer un produit
const deleteProduct = (req, res) => {
  const id = req.params.id;
  productModel.deleteProduct(id, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la suppression du produit' });
    }
    res.status(200).json({ message: 'Produit supprimé avec succès' });
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
