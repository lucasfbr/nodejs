var express = require('express');
var router = express.Router();
var db = require('./../models');

router.get('/', function (req, res) {

    db.Tasks.findAll()
        .then(function (result) {
            res.render('tasks', {
                titulo: 'Minhas tarefas',
                tasks: result
            });
        })
        .catch(function (err) {
            console.log('Ocorreu um erro => ' + err);
        })
});

router.get('/create', function (req, res) {
    res.render('new_task')
});

router.post('/create', function (req, res) {
    db.Tasks.create(req.body)
        .then(function () {
            res.redirect('/tasks')
        })
        .catch(function (err) {
            console.log('Ocorreu um erro => ' + err);
        })

});

router.get('/update/:id', function (req, res) {
    db.Tasks.findById(req.params.id)
        .then(function (result) {
            res.render('update_task', {
                task: result
            })
        })
        .catch(function (err) {
            console.log('Ocorreu um erro => ' + err);
        })
});

router.put('/update/:id', function (req, res) {
    db.Tasks.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(function () {
            res.redirect('/tasks')
        })
        .catch(function (err) {
            console.log('Ocorreu um erro => ' + err);
        })
});

router.delete('/delete/:id', function (req, res) {
    db.Tasks.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(function () {
            res.redirect('/tasks')
        })
        .catch(function (err) {
            console.log('Ocorreu um erro => ' + err);
        })
});


module.exports = router;
