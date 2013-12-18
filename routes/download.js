var uuid = require('node-uuid');
var File = require('models/file').File;
var path = require('path');

exports.getIndex = function (req, res) {
	if (!req.params.file) {
		res.render('download', {ourFile: null});
		return;
	}
	File.findOne({_id: req.params.file}, function (err, file) {
		res.render('download', {ourFile: (err ? null : file)});
	});
};

exports.getFile = function (req, res) {
	File.findOne({_id: req.params.file}, function (err, file) {
		res.download(path.resolve(__dirname + "/.." + file.path), file.name);
	});
}

exports.getThumbnail = function (req, res) {
	File.findOne({_id: req.params.file}, function (err, file) {
		res.sendfile(path.resolve(__dirname + "/.." + file.path));
	});
}