const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/crud_1')

const schema = mongoose.Schema({
    name : String,
    email : String,
    url : String
})

module.exports = mongoose.model("user" , schema)