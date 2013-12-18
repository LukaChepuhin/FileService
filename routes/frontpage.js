var File = require('models/file').File;

exports.get = function(req, res) {
	File.find(function (err, files) {
		res.render('frontpage', {files: files});
	});
};