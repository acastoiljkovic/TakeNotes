const express = require('express');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const DataModel = require('./models/person');

const SubjectModel = require('./models/subjectModel');
const app = express();

mongoose.connect('mongodb://localhost:27017/takeNotes', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to database !");
    })
    .catch((err) => {
        console.error(err);
    });


app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
    next();
});


// TODO hash password


app.post("/api/register", (req, res, next) => {
    const tmp = new DataModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });
    tmp.save();
    res.status(201).json({
        message: "Success",
        person: tmp
    });
});


app.post("/api/login", (req, res, next) => {
    DataModel.findOne({ 'email': req.body.email }, (err, resFind) => {
        if (err) return console.log(err);

        if (resFind) {
            if (resFind.password == req.body.password) {
                res.status(201).json({
                    message: "Success",
                    person: resFind
                });
                return;
            }
            res.status(200).json({
                message: "Wrong Password",
                email: resFind.email
            });
            return;
        }
        res.status(200).json({
            message: "Failed",
            email: ""
        });
    });
});

app.post("/api/addSubject", (req, res, next) => {
    const tmp = new SubjectModel({
        title: req.body.title,
        listNotes: [],
        personEmail: req.body.email
    });

    tmp.save();
    res.status(200).json({
        message: "Success"
    });
});

app.put("/api/editSubject", (req, res, next) => {
    SubjectModel.findOne({ 'title': req.body.title, 'personEmail': req.body.email }).then(res => {
        res.title = req.body.newTitle;
        res.save();
    });
    res.status(200).json({
        message: "Success"
    });
});

app.put("/api/editNote", (req, res, next) => {
    SubjectModel.findOne({ 'title': req.body.title, 'personEmail': req.body.email }).then(res => {

        res.listNotes = res.listNotes.filter(item => {
            if (item.title == noteTitle)
                item.title = newNoteTitle;
            return item;
        });

        res.save();
    });
    res.status(200).json({
        message: "Success"
    });
});

app.post("/api/addNote", (req, res, next) => {
    SubjectModel.findOne({ 'title': req.body.title, 'personEmail': req.body.email }).then(res => {
        res.listNotes.push(req.body.note);
        console.log(res);
        res.save();
    });
    res.status(200).json({
        message: "Success"
    });
});

app.get('/api/get/:email', (req, res, next) => {
    SubjectModel.find({ 'personEmail': req.params.email })
        .then((doc) => {
            const data = doc;
            res.status(200).json({
                message: 'Success',
                subjects: data
            });
        })
        .catch(err => console.log(err));
});


app.delete('/api/deleteSubject/:title/:email', (req, res, next) => {
    SubjectModel.deleteOne({ 'title': req.params.title, 'personEmail': req.params.email }).then(result => {
        if (result) {
            console.log("Sve cool");

            res.status(200).json({
                message: "Success"
            });
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            message: "Failed"
        });
    });
});

app.delete('/api/deleteNote/:title/:email/:noteTitle', (req, res, next) => {
    SubjectModel.findOne({ 'title': req.params.title, 'personEmail': req.params.email }).then(result => {
        result.listNotes = result.listNotes.filter(item => item.title != req.params.noteTitle);
        result.save();

    }).catch(err => {
        console.log(err);
        res.status(500).json({
            message: "Failed"
        });
    });
    res.status(200).json({
        message: "Success"
    });
});

app.put('/api/saveNote', (req, res, next) => {
    SubjectModel.findOne({ 'title': req.body.title, 'personEmail': req.body.email }).then(res => {
        res.listNotes = res.listNotes.filter(item => {
            if (item.title == req.body.noteTitle)
                item.body = req.body.body;
            return item;
        });

        res.save();
    });
    res.status(200).json({
        message: "Success"
    });
});

app.get('/api/getRandomSubjects', (req, res, next) => {
    SubjectModel.aggregate([{ $sample: { size: 10 } }]).then(result => {
        res.status(200).json({
            message: 'Success',
            subjects: result
        });
    });

});

module.exports = app;