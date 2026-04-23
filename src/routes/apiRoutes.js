const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.route('/categories')
    .get(storeController.getAllCategories)
    .post(authMiddleware.protect, authMiddleware.restrictTo('admin'), storeController.createCategory);
router.route('/products')
    .get(storeController.getAllProducts)
    .post(authMiddleware.protect, authMiddleware.restrictTo('admin'), storeController.createProduct);
router.route('/products/:id')
    .get(storeController.getProductById)
    .put(authMiddleware.protect, authMiddleware.restrictTo('admin'), storeController.updateProduct)
    .delete(authMiddleware.protect, authMiddleware.restrictTo('admin'), storeController.deleteProduct);
router.post('/upload', authMiddleware.protect, upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ status: 'fail', message: 'No file uploaded or invalid format' });
    }
    res.status(200).json({
        status: 'success',
        message: 'File uploaded successfully',
        data: {
            filename: req.file.filename,
            path: `/uploads/${req.file.filename}`,
            size: req.file.size
        }
    });
});
module.exports = router;
