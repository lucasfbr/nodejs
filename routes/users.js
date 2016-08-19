var express = require('express');
var router = express.Router();
var db = require('./../models');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/auth', function (req, res) {
    res.render('login');
});

router.post('/auth', function (req, res) {
    db.Users.findOne({
        where: {
            username: req.body.username,
            password: req.body.password
        }
    })
        .then(function (result) {

            if(!result){
                res.redirect('/users/auth')
            }
            res.redirect('/tasks');
        })
        .catch(function (err) {
            console.log('Ocorreu um erro => ' + err);
        })

});


module.exports = router;
