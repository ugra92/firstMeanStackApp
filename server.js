var express = require('express');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var app = express();
var db = mongojs('root:0637339728@ds041164.mongolab.com:41164/contacts_app', ['contacts'], {authMechanism: 'ScramSHA1'});
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());


app.get('/contactList', function(req, res){
   db.contacts.find(function(err,docs){
       res.json(docs);
   });
});

app.post('/contactList', function(req,res){
   console.log(req.body);
    db.contacts.insert(req.body, function(err,doc){
        res.json(doc);
    })
});

app.delete('/contactList/:id', function(req, res){
   var id = req.params.id;
    console.log(id);
    db.contacts.remove({_id: mongojs.ObjectId(id)}, function(err,doc){
        res.json(doc);
    });
});

app.get('/contactList/:id', function(req, res){
    var id = req.params.id;
    db.contacts.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
        res.json(doc);
    });
});

app.put('/contactList/:id', function(req, res){
    var id = req.params.id;
    db.contacts.findAndModify({
        query: {_id: mongojs.ObjectId(id)},
        update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
        new : true},function(err, doc){
        res.json(doc);
    })
})
app.listen('3000');
console.log('server running on 3000');