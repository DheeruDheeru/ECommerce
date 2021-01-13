var users = require('./model/usermodel');
var {Product} = require('./model/productModel');
var {Category} = require('./model/productModel');
// const router = require('./routes');
// const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

var fs = require('fs');
var path = require('path');

async function adminlogin(req,res){
    
  let email = req.body.email;
  let password = req.body.password;

  users.findOne({email: email,role: 'admin'}).select('+password').then((data)=>{
      data.comparePassword(password,(err,isMatch)=>{
         if (isMatch){ 
             jwt.sign({id:data._id,firstName:data.firstName,lastName:data.lastName,email:data.email},'admin',{ expiresIn: '1d' },((err,token)=>{
                 if(err){
                  throw new Error("Internal Server Error")
                 }
                 else{
                  res.status(200).json({
                      Message:"Logged In",
                      accesstoken:token,
                      match:1
                  })
                 }
             }))
          }else{
              res.status(401).json({Message:'Invalid Password',match:0});
          }
      })
  })
  .catch((err)=>{
      res.status(200).json({
          error:"Wrong Password or User Not Found",
          match:0
      })
  })
};

async function getfiveusers(req,res) {
    users.find({role:'user',isDeleted:false}).sort({createdAt:-1}).limit(5).then(data=>{
        res.status(200).json(data);
    }).catch(err=>{
        res.status(200).json({
            error:"Data Not Found"
        })
    })
};

async function getusers(req,res) {
    users.find({role:'user',isDeleted:false}).sort({firstName:1}).then(data=>{
        res.status(200).json(data);
    }).catch(err=>{
        res.status(200).json({
            error:"Data Not Found"
        })
    })
};

async function deleteUser(req,res) {
    let id = req.params.id
    users.findByIdAndUpdate({_id:id},{$set: {isDeleted:true}},{useFindAndModify:true}).then(data=>{
        res.status(200).json({message:"user deleted"});
    }).catch(err=>{
        res.status(200).json({
            error:"error occured"
        })
    })
}

async function addCategory(req,res) {
    var category = new Category({
        categoryname: req.body.categoryname,
        categoryimage     : {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/*'
        },
        // categoryname:req.file.filename
    })
    category.save().then(result => {
        res.status(200).json({message : "category Inserted Successfully"});
    }).catch(err => {
        res.status(400).json(err);
    })
}

async function addproduct(req,res) {
    var product = new Product({
        name : req.body.name,
        description : req.body.description,
        price  : parseFloat(req.body.price),
        category : req.body.category,
        quantity : parseInt(req.body.quantity),
        productimage     : {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/*'
        }
    })
    product.save().then(result => {
        res.status(200).json({message : "product Inserted Successfully"});
    }).catch(err => {
        res.status(400).json(err);
    })
}

module.exports = {
    getusers,
    getfiveusers,
    deleteUser,
    adminlogin,
    addCategory,
    addproduct
}