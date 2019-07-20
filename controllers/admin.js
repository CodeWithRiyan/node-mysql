const Product = require('../models/product');

exports.getAddProducts = (req, res, next) => {
    res.render('admin/edit-product', {pageTitle:'Add Product', path:'/admin/add-product', editing:false});
}

exports.getEditProducts = (req, res, next) => {
    editMode = req.query.edit
    if(!editMode){
        return res.redirect('/');
    }
    const productId = req.params.productId;
    Product.findById(productId, (product) => {
        res.render('admin/edit-product', {pageTitle:'Edit Product', path:'/admin/edit-product', editing: editMode, product:product});
    });
}

exports.postAddProducts = (req, res, next) => {
    const title = req.body.title
    const imageUrl = req.body.imageUrl
    const price = req.body.price
    const description = req.body.description
    const product = new Product(null, title, imageUrl, price, description);
    product.save().then(() => {
        res.redirect('/');
    }).catch(err => console.log(err));
    res.redirect('/');
}

exports.postEditProducts = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImage = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDesc = req.body.description
    const updatedProduct = new Product(prodId, updatedTitle, updatedImage, updatedPrice, updatedDesc);
    updatedProduct.save();
    res.redirect('/admin/products');
}

exports.postDeleteProducts = (req, res, next) => {
    const productId = req.body.productId
    Product.deleteById(productId);
    res.redirect('/admin/products');
}

exports.listProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {prods:products, pageTitle:'List Product', path:'/admin/products'});
    });
}
