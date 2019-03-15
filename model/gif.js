const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gifSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }],
    gif: {
        type: String,
    },
    createdAt: {
        type: Date,
        required: true
    }
});

const Gif = mongoose.model('Gif', gifSchema)

module.exports = Gif