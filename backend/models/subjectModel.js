const mongo = require('mongoose');

const subjectModel = mongo.Schema({
    title: String,
    listNotes: [{
        title: String,
        body: String
    }],
    personEmail: { type: String, required: true }
}, {
    collection: 'subjects'
});

module.exports = mongo.model('Subject', subjectModel, 'subjects');