var express = require('express');
var router = express.Router();

/* GET restaurante page. */
router.get('/', function(req, res) {
  global.db.findAllRestaurantes((e, docs) => {
      if(e) { return console.log(e); }
      res.render('restaurantes', { title: 'Restaurantes', docs: docs });
  })
})


router.get('/newRestaurante', function(req, res, next) {
res.render('newRestaurante', { title: 'Cadastro de Restaurantes', doc: { "nomeRestaurante": ""}, action: '/restaurantes/newRestaurante'});
});


router.get('/editRestaurante/:id', function(req, res, next) {
    var id = req.params.id;
    global.db.findOneRestaurante(id, (e, docs) => {
        if(e) { return console.log(e); }
        res.render('newRestaurante', { title: 'Edição de Restaurante', doc: docs[0], action: '/editRestaurante/' + docs[0]._id });
      });
})

router.post('/newRestaurante', function(req, res) {
    var nomeRestaurante = req.body.nomeRestaurante;
    global.db.insertRestaurante({nomeRestaurante}, (err, result) => {
            if(err) { return console.log(err); }
            res.redirect('/restaurantes');
        })
  })

router.post('/editRestaurante/:id', function(req, res) {
    var id = req.params.id;
    var nomeRestaurante = req.body.nomeRestaurante;
    global.db.updateRestaurante(id, {nomeRestaurante}, (e, result) => {
          if(e) { return console.log(e); }
          res.redirect('/restaurantes');
      });
  });

  router.get('/deleteRestaurante/:id', function(req, res) {
    var id = req.params.id;
    global.db.deleteOneRestaurante(id, (e, r) => {
          if(e) { return console.log(e); }
          res.redirect('/');
        });
  });

  module.exports = router;