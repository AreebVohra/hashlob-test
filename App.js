const express = require("express");
const app = express();
const mongojs = require("mongojs");
const db = mongojs(process.env.MONGO_URL || 'mongodb+srv://areeb001:gUV3eSiu4X3GrHIY@cluster0.bgspv.mongodb.net/node_crud?retryWrites=true&w=majority');
const port = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// get all the data
app.get('/', (req, res) => {
    db.collection('posts').find().toArray((err, result) => {
        if (err) return console.log(err)
        res.json({ result })
    })
})

// insert the data in the database
app.post('/insert', (req, res) => {
    db.collection('posts').save(req.body, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.json({ result })
    })
});

// update the data in the table
app.post('/update', (req, res) => {
    db.collection('posts').updateOne({ author: req.body.author }, {
        $set: {
            title: req.body.title,
            desc: req.body.desc
        },
    }, (err, result) => {
        if (err) return res.send(err)
        res.json({ result })
    })
});

// delete a post from the database
app.post('/delete', (req, res) => {
    db.collection('posts').remove({ author: req.body.author }, (err, result) => {
        if (err) return res.send(err)
        res.json({ result })
    })
});


app.listen(port, () => {
    console.log("server running on port http://localhost:" + port)
})