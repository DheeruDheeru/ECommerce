var express = require('express');
var router = express.Router();

var multer = require('multer')

var admincontrol = require('../adminController');

var sharedControl = require('../sharedController');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now()+'-'+ file.originalname);
    }
});

var upload = multer({ storage: storage });

var verify = require('../middleware/verifyToken');

router.post('/adminlogin',admincontrol.adminlogin);

router.get('/getfiveUsers',verify.verifyadminToken,admincontrol.getfiveusers);

router.get('/getUsers',verify.verifyadminToken,admincontrol.getusers);

router.delete('/deluser/:id', verify.verifyadminToken,admincontrol.deleteUser); 

router.post('/addcategory',upload.single('categoryimage'),verify.verifyadminToken,admincontrol.addCategory);

router.post('/addproduct',upload.single('productimage'),verify.verifyadminToken,admincontrol.addproduct);

router.get('/getProducts',verify.verifyadminToken,sharedControl.getproducts);

router.get('/getcategory',verify.verifyadminToken,sharedControl.getCategory);

module.exports = router;