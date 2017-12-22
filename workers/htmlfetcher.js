// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');
var http = require('http');
var fs = require('fs');

exports.fetchHtml = function (url, callback) {
  var options = {
    host: url,
    port: 80,
    path: '/'
  };

  var content = '';
  var req = http.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
      content += chunk;
    });
    res.on('end', function() {
      callback(content);
    });
  });
  req.end();
};