// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');
var http = require('http');
var fs = require('fs');

exports.fetchHtml = function (url, callback) {
  archive.readListOfUrls(archive.downloadUrls);
};