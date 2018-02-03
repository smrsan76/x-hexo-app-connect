
exports = module.exports = function(app){

    var path = require('path');
    var blogDirPath = path.join(process.cwd(), blogName);
    var Hexo = require("hexo");
    var hexo = new Hexo(blogDirPath, {});

    return require('x-hexo-app-connect')(app, hexo);

};