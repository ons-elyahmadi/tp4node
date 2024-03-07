const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const productController = require('../Controllers/productController');

// Ajouter un produit à une catégorie existante
router.post('/addp', authMiddleware.authenticateToken , productController.addProductToCategory);
router.get('/addp', (req, res) => {
    res.render('addProduct');
});
// Modifier les détails d'un produit (nom, prix, description, etc.)
router.put('/:productId', authMiddleware.authenticateToken , productController.updateProduct);

// Supprimer un produit
router.delete('/:productId', authMiddleware.authenticateToken , productController.deleteProduct);

// Lister tous les produits avec leurs détails et leur catégorie associée
router.get('/', authMiddleware.authenticateToken , productController.getAllProductsWithCategories);

module.exports = router;
