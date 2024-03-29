var mongoose = require('mongoose');
var User = mongoose.model('User');

var bookletSchema = new mongoose.Schema({
    _owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: {
        type: String,
        required: true
    },
    content: Object,
    updated_date: Date
});

mongoose.model('Booklet', bookletSchema);
