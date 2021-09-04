const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.json({ express: 'Hello From Express' });
});
app.post('/api/reg', (req, res) => {
  console.log(req.body);

  
  var myobj = { email: req.body.email, password: req.body.pass};
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb+srv://root:root@cluster0.qbih6.mongodb.net/users1?retryWrites=true&w=majority";
  MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("users1");
        console.log("running");
        dbo.collection("users").insertOne(myobj, function(err, result) {
         if (err) throw err;
            console.log("1 document inserted"); 
            
            db.close();
        });
});

  res.json(
    `I received your POST request. This is what you sent me: ${req.body.email}I received your POST request. This is what you sent me: ${req.body.pass}`
  );
});

app.post('/api/token', (req, res) => { 

const user={id:1,email:"mail@mail.com",password:"pass"};

jwt.sign({user: user}, 'secretkey', (err, token) => {
            res.json({token});
            });

});

app.post('/api/log', (req, res) => {
  console.log(req.body);

  var myobj = { email: req.body.email, password: req.body.pass};
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb+srv://root:root@cluster0.qbih6.mongodb.net/users1?retryWrites=true&w=majority";
  MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("users1");
        console.log("running");
        dbo.collection("users").find(myobj).count({},function(err, result) {
         if (err) throw err;
           
            console.log(result);
            jwt.sign({user: result}, 'secretkey', (err, token) => {
            if(result==1){
            res.json({token});
            }
           else
           {
           res.json("null");
           }
            });
           
            
             
            db.close();
        });
});

});


app.listen(port, () => console.log(`Listening on port ${port}`));