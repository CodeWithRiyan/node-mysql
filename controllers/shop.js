const Product = require('../models/product');
const Cart = require('../models/cart');
exports.getProducts = (req, res, next) => {
    Product.fetchAll().then(([rows]) => {
        res.render('shop/index', {prods:rows, pageTitle:'Index', path:'/'});
    }).catch();
}

exports.getProductById = (req, res, next) => {
    productId = req.params.productId;
    Product.findById(productId).then(
        ([product]) => {
            res.render('shop/product-detail', {product:product[0],pageTitle: product.title, path:'/products' });
        }).catch(err => {
        console.log(err)
    });
}

exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for(product of products){
                const cartProductData = cart.products.find(
                    prod => prod.id === product.id
                );
                if(cartProductData){
                    cartProducts.push({productData:product, qty: cartProductData.qty});
                }
            }
            res.render('shop/cart', {pageTitle:'Cart Shopping', path:'/cart', products: cartProducts});
        })
    })
}

exports.postCart = (req, res, next) => {
    const productId = req.body.productId
    Product.findById(productId, product => {
        Cart.addProduct(productId, product.price);
    })
    res.redirect('/');
}

exports.postCartDelete = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    })
}

exports.ordersProduct = (req, res, next) => {
    res.render('shop/orders', {pageTitle:'Orders Page', path:'/orders'})
}

exports.listProduct = (req, res, next) => {
    Product.fetchAll().then(([rows, fieldData]) => {
        res.render('shop/index', {prods:rows, pageTitle:'Index', path:'/'});
    }).catch(err => console.log(err))
}

exports.checkoutProduct = (req, res, next) => {
    res.render('shop/checkout', {pageTitle:'Checkout Page', path:'/checkout'})
}