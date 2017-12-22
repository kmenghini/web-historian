var path = require('path');
var archive = require('../helpers/archive-helpers');
var http = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!


exports.handleRequest = function (req, res) {
  var {headers, method, url} = req;
  // var filePath = '.' + url;
  var headers = http.headers;

  if (method === 'GET') {
    if (url === '/') {
      http.serveAssets(res, archive.paths.siteAssets + '/index.html', function() {
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
      });
    });
  }
};
