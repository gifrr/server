var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const mongodb = require('mongodb')

mongoose.connect('mongodb://localhost:27017')

var gifSchema = new Schema({
    title: String,
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }],
    gif: String
});





let Gif = mongoose.model('Gifs', gifSchema)


module.exports = Gif