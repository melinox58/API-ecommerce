
DROP DATABASE IF EXISTS melinox_ecommerce;

-- Création de la base de données
CREATE DATABASE IF NOT EXISTS melinox_ecommerce;
USE melinox_ecommerce;

-- Table des utilisateurs
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Table des catégories
CREATE TABLE Categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

-- Table des produits
CREATE TABLE Products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    image_id VARCHAR(255),  -- Utilisé pour stocker un identifiant MongoDB (ObjectId)
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES Categories(id) ON DELETE SET NULL
);


-- Table des commandes
CREATE TABLE Orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'processing', 'shipped', 'completed', 'cancelled') DEFAULT 'pending',
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- Table des détails de commande
CREATE TABLE Order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Products(id) ON DELETE CASCADE
);



-- Ajout de catégories de vêtements
INSERT INTO Categories (name, description) VALUES
('Hauts', 'Vêtements pour le haut du corps, comme des chemises, t-shirts, pulls'),
('Bas', 'Vêtements pour le bas du corps, comme des pantalons, jupes, shorts'),
('Chaussures', 'Différents types de chaussures, y compris baskets et bottes'),
('Accessoires', 'Articles comme des ceintures, chapeaux, et bijoux'),
('Vêtements d\'extérieur', 'Manteaux, vestes et autres vêtements pour se protéger du froid'),
('Sous-vêtements', 'Sous-vêtements et vêtements de nuit'),
('Sportswear', 'Vêtements de sport et vêtements décontractés'),
('Vêtements de cérémonie', 'Costumes, robes de soirée et autres tenues formelles');

-- Ajout de produits
INSERT INTO Products (name, description, price, stock, image_id, category_id) VALUES
('T-shirt coton blanc', 'T-shirt en coton bio blanc de haute qualité', 19.99, 50, 'image1.jpg', 1),
('Jean slim', 'Jean slim pour homme, coupe moderne', 49.99, 30, 'image2.jpg', 2),
('Chaussures de sport', 'Chaussures de sport confortables pour le jogging', 59.99, 20, 'image3.jpg', 3),
('Montre en acier inoxydable', 'Montre avec bracelet en acier inoxydable', 89.99, 10, 'image4.jpg', 4),
('Veste en cuir', 'Veste en cuir véritable, style classique', 129.99, 15, 'image5.jpg', 5),
('Short de sport', 'Short de sport léger pour l\'été', 24.99, 25, 'image6.jpg', 7);

-- Ajout de commandes
INSERT INTO Orders (user_id, total, status) VALUES
(1, 99.97, 'completed'),
(2, 49.99, 'shipped'),
(3, 24.99, 'processing'),
(4, 129.99, 'pending'),
(5, 59.99, 'cancelled');

-- Ajout de commandes avec détails
INSERT INTO Order_items (order_id, product_id, quantity, price) VALUES
(1, 1, 2, 19.99),
(1, 2, 1, 49.99),
(2, 3, 1, 59.99),
(3, 6, 1, 24.99),
(4, 5, 1, 129.99),
(5, 4, 1, 59.99);

SHOW DATABASES;

SELECT * FROM Users;
SELECT * FROM Categories;
SELECT * FROM Products;
SELECT * FROM Orders;
SELECT * FROM Order_items;
