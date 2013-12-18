var async = require('async');
var util = require('util');
var mime = require('mime');
var fs = require('fs');

var mongoose = require('libs/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    ownerId: Schema.Types.ObjectId,
    name: String,
    path: String,
    size: Number,
    mimeType: String,
    uploaded: {
        type: Date,
        default: Date.now
    }
});

schema.pre('remove', function(next) {
    fs.unlink(this.path, next);
});
schema.pre('save', function(next) {
    this.mimeType = this.mimeType || mime.lookup(this.name);
    next();
});

exports.File = mongoose.model('File', schema);
