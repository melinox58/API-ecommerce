const categoryModel = require('../models/categoriesModel');

// Récupérer toutes les catégories
const getAllCategories = (req, res) => {
  categoryModel.getAllCategories((err, categories) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la récupération des catégories' });
    }
    res.status(200).json(categories);
  });
};

// Récupérer une catégorie par ID
const getCategoryById = (req, res) => {
  const id = req.params.id;
  categoryModel.getCategoryById(id, (err, category) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la récupération de la catégorie' });
    }
    if (!category) {
      return res.status(404).json({ error: 'Catégorie non trouvée' });
    }
    res.status(200).json(category);
  });
};

// Créer une nouvelle catégorie
const createCategory = (req, res) => {
  const { name, description } = req.body;
  categoryModel.createCategory(name, description, (err, categoryId) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la création de la catégorie' });
    }
    res.status(201).json({ message: 'Catégorie créée avec succès', id: categoryId });
  });
};

// Mettre à jour une catégorie
const updateCategory = (req, res) => {
  const id = req.params.id;
  const { name, description } = req.body;
  categoryModel.updateCategory(id, name, description, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la mise à jour de la catégorie' });
    }
    res.status(200).json({ message: 'Catégorie mise à jour avec succès' });
  });
};

// Supprimer une catégorie
const deleteCategory = (req, res) => {
  const id = req.params.id;
  categoryModel.deleteCategory(id, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la suppression de la catégorie' });
    }
    res.status(200).json({ message: 'Catégorie supprimée avec succès' });
  });
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};
