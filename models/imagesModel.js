const { MongoClient, ObjectId } = require('mongodb');
const mongoUrl = 'mongodb+srv://mel:rootmel@bootcamp.yrsi3.mongodb.net/ecommerce?retryWrites=true&w=majority';
const client = new MongoClient(mongoUrl);

// Récupérer toutes les images
async function getAllimages(callback) {
  try {
    await client.connect();
    const db = client.db('ecommerce');
    const images = await db.collection('images').find({}).toArray();
    callback(null, images);
  } catch (error) {
    console.error('Erreur lors de la récupération des images:', error);
    callback(error);
  } finally {
    client.close();
  }
}

// Récupérer une image par ID
async function getImageById(id, callback) {
  try {
    await client.connect();
    const db = client.db('ecommerce');
    const image = await db.collection('images').findOne({ _id: new ObjectId(id) });
    callback(null, image);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'image par ID:', error);
    callback(error);
  } finally {
    client.close();
  }
}

// Créer une nouvelle image
// Créer une nouvelle image
async function createImage(imageData, callback) {
  try {
    await client.connect();
    const db = client.db('ecommerce');
    const result = await db.collection('images').insertOne(imageData);
    const insertedImage = { _id: result.insertedId, ...imageData }; // Crée un objet avec l'id inséré
    callback(null, insertedImage); // Retourner l'image créée avec l'ID généré
  } catch (error) {
    console.error('Erreur lors de la création de l\'image:', error);
    callback(error);
  } finally {
    client.close();
  }
}


// Mettre à jour une image
async function updateImage(id, updatedImage, callback) {
  try {
    await client.connect();
    const db = client.db('ecommerce');
    const result = await db.collection('images').updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedImage }
    );
    callback(null, result);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'image:', error);
    callback(error);
  } finally {
    client.close();
  }
}

// Supprimer une image
async function deleteImage(id, callback) {
  try {
    await client.connect();
    const db = client.db('ecommerce');
    const result = await db.collection('images').deleteOne({ _id: new ObjectId(id) });
    callback(null, result);
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'image:', error);
    callback(error);
  } finally {
    client.close();
  }
}

module.exports = {
  getAllimages,
  getImageById,
  createImage,
  updateImage,
  deleteImage
};
