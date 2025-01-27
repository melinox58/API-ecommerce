# E-commerce API

Cette application est une API REST pour un site e-commerce de vêtements. Elle permet de gérer les utilisateurs, les produits, les catégories, les commandes et les images.

## Prérequis

- Node.js
- Docker
- Docker Compose

## Installation

1. Clonez le dépôt :
    ```sh
    git clone git@github.com:melinox58/API-ecommerce.git
    cd API-ecommerce
    ```

2. Installez les dépendances :
    ```sh
    npm install
    ```

3. Configurez les variables d'environnement en créant un fichier [.env.local](http://_vscodecontentref_/0) à la racine du projet et en y ajoutant vos variables.

4. Vous pouvez retouver cette API sur :
https://api-e-commerce-7dfc4ab52431.herokuapp.com/

## Utilisation

### Avec Docker

1. Construisez et démarrez les conteneurs Docker :
    ```sh
    docker-compose up --build
    ```

2. L'API sera disponible sur `http://localhost:3000`.

### Sans Docker

1. Démarrez le serveur :
    ```sh
    npm start
    ```

2. L'API sera disponible sur `http://localhost:5000`.

## Endpoints

### Utilisateurs

- `GET /users` : Récupérer tous les utilisateurs
- `GET /users/:id` : Récupérer un utilisateur par ID
- `POST /users` : Créer un nouvel utilisateur
- `PUT /users/:id` : Mettre à jour un utilisateur
- `DELETE /users/:id` : Supprimer un utilisateur

### Produits

- `GET /products` : Récupérer tous les produits
- `GET /products/:id` : Récupérer un produit par ID
- `POST /products` : Créer un nouveau produit
- `PUT /products/:id` : Mettre à jour un produit
- `DELETE /products/:id` : Supprimer un produit

### Catégories

- `GET /categories` : Récupérer toutes les catégories
- `GET /categories/:id` : Récupérer une catégorie par ID
- `POST /categories` : Créer une nouvelle catégorie
- `PUT /categories/:id` : Mettre à jour une catégorie
- `DELETE /categories/:id` : Supprimer une catégorie

### Commandes

- `GET /orders` : Récupérer toutes les commandes
- `GET /orders/:id` : Récupérer une commande par ID
- `POST /orders` : Créer une nouvelle commande
- `PUT /orders/:id` : Mettre à jour une commande
- `DELETE /orders/:id` : Supprimer une commande

### Détails de commande

- `GET /order-items` : Récupérer tous les détails de commande
- `GET /order-items/order/:orderId` : Récupérer les détails d'une commande par ID de commande
- `POST /order-items` : Ajouter un nouvel élément de commande
- `PUT /order-items/:id` : Mettre à jour un élément de commande
- `DELETE /order-items/:id` : Supprimer un élément de commande

### Images

- `GET /images` : Récupérer toutes les images
- `GET /images/:id` : Récupérer une image par ID
- `POST /images` : Créer une nouvelle image
- `PUT /images/:id` : Mettre à jour une image
- `DELETE /images/:id` : Supprimer une image

## Auteur

Martinon Mélanie

## Licence

Ce projet est sous licence MIT.