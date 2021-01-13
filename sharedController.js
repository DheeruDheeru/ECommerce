var {Product} = require('./model/productModel');
var {Category} = require('./model/productModel');

async function getproducts(req,res) {
    Product.find().then(result=>{
        res.status(200).json(result);
    }).catch(err => {
        res.status(400).json(err);
    });
}

async function getproductsbyCategory(req,res) {
    Product.find().then(result=>{
        res.status(200).json(result);
    }).catch(err => {
        res.status(400).json(err);
    });
}

async function getCategory(req,res) {
    Category.find().then(result=>{
        res.status(200).json(result);
    }).catch(err => {
        res.status(400).json(err);
    });
}

module.exports = {
    getCategory,
    getproducts
}