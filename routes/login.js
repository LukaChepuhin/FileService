
exports.get=function(req,res){
    res.render('login');
};
exports.post=function(req,res,next){
var username=req.body.username;
    var password=req.body.passwors;
};