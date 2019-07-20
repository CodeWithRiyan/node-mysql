const express = require('express')
const router = express.Router()
const shopController = require('../controllers/shop');

router.get('/',shopController.listProduct)
router.get('/cart', shopController.getCart);
router.post('/cart',shopController.postCart);
router.get('/orders', shopController.ordersProduct);
router.get('/products', shopController.getProducts);
router.get('/checkout', shopController.checkoutProduct);
router.get('/products/:productId', shopController.getProductById);
router.post('/cart-delete-item', shopController.postCartDelete);

module.exports = router;