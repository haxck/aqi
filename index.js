var express = require('express');
var proxy = require('http-proxy-middleware');
var bodyParser = require('body-parser')
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(express.static('public'));
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

app.get('/', function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.sendfile("index.html");
});




app.use("/air", proxy({
  target: "http://web.juhe.cn:8080/environment",
  changeOrigin: true
}))

app.use("/location", proxy({
  target: "http://api.map.baidu.com/",
  changeOrigin: true
}))

//app.listen(8088);