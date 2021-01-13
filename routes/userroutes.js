var express = require('express');
var router = express.Router();

var multer = require('multer');

var usercontrol = require('../controller');

var SharedControl = require('../sharedController');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now()+'-'+ file.originalname);
    }
});

var upload = multer({ storage: storage });

router.post('/login',usercontrol.login);

router.post('/register',upload.single('profile'),usercontrol.register);

router.get('/shared/getCategory',SharedControl.getCategory);

router.get('/shared/getProduct',SharedControl.getproducts);

module.exports = router;