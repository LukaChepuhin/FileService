var uuid = require('node-uuid');
var File = require('models/file').File;

exports.get = function(req, res) {
    res.render('upload', {status: ''});
};

exports.post = function(req, res) {
	fs = require('fs');
	fs.readFile(req.files.upload.path, function (err, data) {
		var newFileName = uuid.v4();
		fs.writeFile(__dirname + "/../uploads/" + newFileName, data, function (err) {
			var file = new File({
				ownerId: req.user._id,
				name: req.files.upload.name,
				path: "/uploads/" + newFileName,
				size: req.files.upload.size
			});
			file.save(function (err) {
				res.render('upload', {status: 'Файл загружен: ' + req.files.upload.name});
			});
		});
	});
}
