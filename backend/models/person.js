const mongo = require('mongoose');

const person = mongo.Schema({
    firstName: String,
    lastName: String,
    password: String,
    email: { type: String, required: true }
}, {
    collection: 'users'
});

module.exports = mongo.model('Person', person, 'users');