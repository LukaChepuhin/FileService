
var checkAuth = require('middleware/checkAuth');

module.exports = function(app) {

    app.get('/', require('./frontpage').get);

    app.get('/login', require('./login').get);
    app.post('/login', require('./login').post);

    app.get('/registration', require('./registration').get);
    app.post('/registration', require('./registration').post);

    app.post('/logout', require('./logout').post);

    app.get('/chat', checkAuth, require('./frontpage').get);
    app.get('/upload', checkAuth, require('./upload').get);
    app.post('/upload', checkAuth, require('./upload').post);

    app.get('/download/:file/', checkAuth, require('./download').getIndex);
    app.get('/download/:file/get', checkAuth, require('./download').getFile);
    app.get('/download/:file/thumb', require('./download').getThumbnail);

};