'use strict';

var PORT = 2000;
var http = require("http");
var express = require('express');
var myApp = express();

myApp.get("/", function(req, res){

    res.send("Hello World!");

});

require("./blog1")(myApp);
require("./blog2")(myApp);

var myServer = http.createServer(myApp);
myServer.listen(PORT, function(err){

    if(err) throw new Error(err);
    console.log("Server is running at http://localhost:" + PORT);

    setTimeout(function(){

        process.exit(0);

    },1000);

});