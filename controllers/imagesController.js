const { MongoClient, ObjectId } = require('mongodb');
const mongoUrl = 'mongodb+srv://mel:rootmel@bootcamp.yrsi3.mongodb.net/ecommerce?retryWrites=true&w=majority';
const client = new MongoClient(mongoUrl);
const imagesModel = require('../models/imagesModel');
const db = require('../models/db');

// Récupérer toutes les images
const getAllImages = (req, res) => {
  imagesModel.getAllimages((err, images) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la récupération des images' });
    }
    res.status(200).json(images); // Répondre avec les images récupérées
  });
};

// Récupérer une image par ID
const getImagesById = (req, res) => {
  const { id } = req.params;
  imagesModel.getImageById(id, (err, image) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la récupération de l\'image' });
    }
    if (!image) {
      return res.status(404).json({ error: 'Image non trouvée' });
    }
    res.status(200).json(image);
  });
};

// Créer une nouvelle image
const createImages = (req, res) => {
  const newImage = req.body;

  // Vérification que tous les champs nécessaires sont présents
  if (!newImage.filename || !newImage.path || !newImage.alt_text) {
    return res.status(400).json({ error: 'Tous les champs "filename", "path", "alt_text" sont requis' });
  }

    // Si le produit existe, on peut procéder à la création de l'image
    console.log('Données reçues pour la création de l\'image:', newImage);
    imagesModel.createImage(newImage, (err, image) => {
      if (err) {
        console.error('Erreur dans le modèle lors de la création de l\'image:', err);
        return res.status(500).json({ error: `Erreur lors de la création de l'image: ${err.message || err}` });
      }
      console.log('Image créée avec succès:', image);
      res.status(201).json(image);
    });
};

// Mettre à jour une image par ID
const updateImages = (req, res) => {
  const { id } = req.params;
  const updatedImage = req.body;
  imagesModel.updateImage(id, updatedImage, (err, image) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'image' });
    }
    res.status(200).json(image); // Retourner l'image mise à jour
  });
};

// Supprimer une image par ID
const deleteImages = (req, res) => {
  const { id } = req.params;
  imagesModel.deleteImage(id, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la suppression de l\'image' });
    }
    res.status(204).send(); // Supprimer l'image, aucune donnée à renvoyer
  });
};

module.exports = { 
  getAllImages,
  getImagesById,
  createImages,
  updateImages,
  deleteImages 
};
