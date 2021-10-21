var http = require("http");
http.createServer(function(res,req){
    res.write("Hello World!Welcome to this page");
    res.end();
}).listen(8080);