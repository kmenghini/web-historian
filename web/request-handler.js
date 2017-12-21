var path = require('path');
var archive = require('../helpers/archive-helpers');
var http = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!


exports.handleRequest = function (req, res) {
  var {headers, method, url} = req;
  console.log('Method...', method);
  // var filePath = '.' + url;
  var headers = http.headers;
  
  // if (filePath === './') {
  //   fs.readFile(archive.paths.siteAssets + '/index.html', 'utf8', function(err, data) {
  //     if (err) {
  //       console.log('ERROR!');
  //       throw err;
  //     }   
  //     res.writeHead(200, headers);
  //     res.write(data);
  //     res.end();
  //   });
  // }

  // http.serveAssets(res, archive.paths.siteAssets + '/index.html', function() {
  //   console.log('done serving asset!');
  // });
  if (method === 'GET') {
    if (url === '/') {
      http.serveAssets(res, archive.paths.siteAssets + '/index.html', function() {
        console.log('done!');
      }, method);
    } else {
      http.serveAssets(res, url, function() {
        console.log('done!');
      }, method);
    }
  } else if (method === 'POST') {
    var body = '';
    req.on('data', function(data) {
      body += data;
    });
    req.on('end', function() {
      body = body.slice(4);
      http.serveAssets(res, body, function() {
        console.log('done!');
      }, method);
    });
  }
};
