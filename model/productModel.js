const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryname: {
        type: String,
        required: true,
        maxlength: 32,
        unique: true
    },
    categoryimage: {
        data:Buffer,
        contentType:String
    }
    // categoryimage:{type:String}
},
{ 
    collection: 'category'
});

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000
    },
    price: {
        type: Number,
        required: true,
        maxlength: 32
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    sold: {
        type: Number,
        default: 0
    },
    productimage: {
        data: Buffer,
        contentType:String
    },
    isAvailable:{
        type:Boolean,
        default:1
    }
},
{ 
    collection: "products"
});

const category = mongoose.model('categories', categorySchema)
const product = mongoose.model('Products', productSchema);

module.exports = {
    Category: category,
    Product: product
}