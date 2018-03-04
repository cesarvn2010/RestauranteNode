var mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://localhost/restaurante")
    .then(conn => global.conn = conn.db("restaurante"))
    .catch(err => console.log(err))

function findAllRestaurantes(callback){
    global.conn.collection("restaurantes").find({}).toArray(callback);
}

function findAllPratos(callback){
    global.conn.collection("pratos").find({}).toArray(callback);
}

function insertRestaurante(restaurante, callback){
    global.conn.collection("restaurantes").insert(restaurante, callback);
}

function insertPrato(prato, callback){
    global.conn.collection("pratos").insert(prato, callback);
}

var ObjectId = require("mongodb").ObjectId;
function findOneRestaurante(id, callback){  
    global.conn.collection("restaurantes").find(new ObjectId(id)).toArray(callback);
}

function findOnePrato(id, callback){  
    global.conn.collection("pratos").find(new ObjectId(id)).toArray(callback);
}

function updateRestaurante(id, restaurante, callback){
    global.conn.collection("restaurantes").updateOne({_id:new ObjectId(id)}, {$set:{nomeRestaurante:restaurante.nomeRestaurante}}, callback);
}

function updatePrato(id, restaurante, callback){
    global.conn.collection("pratos").updateOne({_id:new ObjectId(id)}, {$set:{nomeRestaurante:restaurante.nomeRestaurante}}, callback);
}

function deleteOneRestaurante(id, callback){
    global.conn.collection("restaurantes").deleteOne({_id: new ObjectId(id)}, callback);
}

function deleteOnePrato(id, callback){
    global.conn.collection("pratos").deleteOne({_id: new ObjectId(id)}, callback);
}

module.exports = { findAllRestaurantes,
    findAllPratos,
    insertRestaurante,
    insertPrato, 
    findOneRestaurante,
    findOnePrato, 
    updateRestaurante,
    updatePrato,
    deleteOneRestaurante,
    deleteOnePrato
}