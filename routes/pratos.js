var express = require('express');
var router = express.Router();

/* GET restaurante page. */
router.get('/', function(req, res) {
  global.db.findAllPratos((e, docs) => {
      if(e) { return console.log(e); }
      res.render('pratos', { title: 'Lista de Pratos', docs: docs });
  })
})
  
  router.get('/newPrato', function(req, res, next) {
    res.render('newPrato', { title: 'Cadastro de Pratos', doc: { "nomePrato": "", "preco":""}, action: '/pratos/newPrato/'});
  });
  
  router.get('/editPrato/:id', function(req, res, next) {
    var id = req.params.id;
    global.db.findOnePrato(id, (e, docs) => {
        if(e) { return console.log(e); }
        res.render('newPrato', { title: 'Edição de Prato', doc: docs[0], action: '/editPrato/' + docs[0]._id });
      });
  })
  
  /*
  Obviamente no mundo real você irá querer colocar validações, 
  tratamento de erros e tudo mais. Aqui, apenas pego os dados que 
  foram postados no body da requisição HTTP usando o objeto req 
  (request/requisição). Crio um JSON com essas duas variáveis e 
  envio para função insert que criamos agora a pouco.
  */
  
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
    var nomeRestaurante = req.body.nomeRestaurante;
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