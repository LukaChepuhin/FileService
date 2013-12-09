var uuid = require('node-uuid');

exports.get = function(req, res) {
    res.render('upload', {status: ''});
};

exports.post = function(req, res) {
	fs = require('fs');
	fs.readFile(req.files.upload.path, function (err, data) {
		var newFileName = uuid.v4();
		var newPath = __dirname + "/../uploads/" + newFileName;
		fs.writeFile(newPath, data, function (err) {
			res.render('upload', {status: 'Файл загружен: ' + req.files.upload.name});
		});
	});
}
