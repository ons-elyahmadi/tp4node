const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const categoryController = require('../Controllers/categoryController');
router.get('/add', (req, res) => {
    res.render('addCategory');
});

// Créer une nouvelle catégorie avec un nom et une description
router.post('/add', authMiddleware.authenticateToken , categoryController.createCategory);
router.get('/:categoryId', (req, res) => {
    res.render('categiryDetails');
});

// Modifier une catégorie existante (nom et/ou description)
router.put('/:categoryId', authMiddleware.authenticateToken, categoryController.updateCategory);

// Supprimer une catégorie
router.delete('/:categoryId', authMiddleware.authenticateToken, categoryController.deleteCategory);
router.get('/', (req, res) => {
    res.render('categiries');
});
// Lister toutes les catégories avec leurs produits associés
router.get('/', authMiddleware.authenticateToken, categoryController.getAllCategoriesWithProducts);

module.exports = router;
