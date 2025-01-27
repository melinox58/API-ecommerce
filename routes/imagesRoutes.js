const express = require('express');
const router = express.Router();
const imagesController = require('../controllers/imagesController');

// Vérifiez que les méthodes existent
console.log(imagesController); // Ceci affichera les méthodes du contrôleur pour validation

// Définir les routes et lier chaque route à la méthode correspondante dans le contrôleur
router.get('/', imagesController.getAllImages);
router.get('/:id', imagesController.getImagesById);
router.post('/', imagesController.createImages);
router.put('/:id', imagesController.updateImages);
router.delete('/:id', imagesController.deleteImages);

module.exports = router;
