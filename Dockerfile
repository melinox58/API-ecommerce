# Utiliser l'image Node.js officielle
FROM node:18

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de configuration
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code de l'application
COPY . .

# Exposer le port de l'API
EXPOSE 3000

# Commande pour démarrer le serveur
CMD ["node", "index.js"]
