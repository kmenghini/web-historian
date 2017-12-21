var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var htmlFetcher = require('../workers/htmlfetcher.js')

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  // var content = [];
  fs.readFile(exports.paths.list, 'utf8', function(err, data) {
    // console.log('testing3... ', JSON.parse(JSON.stringify(data)).split('\n'));
    // content = data.split('\n');  
    callback(data.split('\n'));
  });
// console.log('CONTENT', content);
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(urls) {
    var result = false;
    for (var i = 0; i < urls.length; i++) { 
      if (urls[i] === url) {
        result = true;
      } 
    }
    callback(result);
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, url, callback);
};

exports.isUrlArchived = function(url, callback) {
  fs.exists(exports.paths.archivedSites + '/' + url, callback);
};

exports.downloadUrls = function(urls) {
  for (var i = 0; i < urls.length; i++) {
    var url = urls[i];
    exports.isUrlArchived(url, function(exists) {
      if (!exists) {  
        htmlFetcher.fetchHtml(url, function(content) {
          console.log('content....', content);
          fs.writeFile(exports.paths.archivedSites + '/' + url, content, 'utf8', function(err) {
            if (err) {
              throw err;
            }
          });
        });  
      }
    });
  }
};
