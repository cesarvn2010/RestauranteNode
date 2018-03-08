var express = require('express');
var router = express.Router();

/* GET restaurante page. */
router.get('/', function(req, res) {
  global.db.findAllPratos((e, docs) => {
      if(e) { return console.log(e); }
      res.render('pratos', { pagina: {title: 'Lista de Pratos', value:'Ir para página de cadastro'}, docs: docs });
  })
})
  
router.get('/newPrato', function(req, res, next) {
  res.render('newPrato', { pagina: {title: 'Cadastro de Pratos', value: 'Cadastrar Prato'}, doc: { "nomePrato": "", "preco":""}, action: '/pratos/newPrato/'});
});

router.get('/editPrato/:id', function(req, res, next) {
  var id = req.params.id;
  global.db.findOnePrato(id, (e, docs) => {
      if(e) { return console.log(e); }
      res.render('newPrato', { pagina: {title: 'Edição de Prato', value: 'Atualizar Prato'}, doc: docs[0], action: '/pratos/editPrato/' + docs[0]._id });
    });
});

router.post('/newPrato', function(req, res) {
  var nomePrato = req.body.nomePrato;
  var preco = parseFloat(req.body.preco);
  global.db.insertPrato({nomePrato, preco}, (err, result) => {
          if(err) { return console.log(err); }
          res.redirect('/pratos');
      })
})

router.post('/editPrato/:id', function(req, res) {
  var id = req.params.id;
  var nomePrato = req.body.nomePrato;
  var preco = parseFloat(req.body.preco);
  global.db.updatePrato(id, {nomePrato, preco}, (e, result) => {
        if(e) { return console.log(e); }
        res.redirect('/pratos');
    });
});

router.get('/deletePrato/:id', function(req, res) {
  var id = req.params.id;
  global.db.deleteOnePrato(id, (e, r) => {
        if(e) { return console.log(e); }
        res.redirect('/');
      });
});

module.exports = router;