var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {
  var readFileCallBack = function(err, data) {
    if (err) {
      console.log('ERROR!');
      throw err;
    }   
    res.writeHead(200, exports.headers);
    res.write(data);
    res.end();
  };

  if (asset === archive.paths.siteAssets + '/index.html') {
    fs.readFile(asset, 'utf8', readFileCallBack);
    return;
  }

  archive.isUrlArchived(asset, function(exists) {
    if (exists) {
      fs.readFile(archive.paths.archivedSites + '/' + asset, 'utf8', readFileCallBack);
    } else {
      fs.readFile(archive.paths.siteAssets + '/loading.html', 'utf8', readFileCallBack);
      archive.isUrlInList(asset, function(exists) {
        if (!exists) {
          archive.addUrlToList(asset, function() {
            archive.readListOfUrls(function(urls) {
              archive.downloadUrls(urls);
            });
          });
        }
      });
    }
  });  

  //   archive.isUrlArchived(asset, function(exists) {
  //     if (exists) {
  //       fs.readFile(archive.paths.archivedSites + asset, 'utf8', readFileCallBack);
  //     } else {
  //       fs.readFile(archive.paths.siteAssets + '/loading.html', 'utf8', readFileCallBack);
  //       archive.isUrlInList(asset, function(exists) {
  //         if (!exists) {
  //           archive.addUrlToList(asset, function() {
  //             console.log('added to list!');
  //           });
  //         }
  //       });
  //     }
  //   });  
  // } else if (method === 'POST') {
  //   console.log('serving ')
  //   archive.isUrlInList(asset, function(exists) {
  //     if (!exists) {
  //       archive.addUrlToList(asset + '\n', function(err, data) {
  //         if (err) {
  //           console.log('ERROR!');
  //           throw err;
  //         }   
  //         res.writeHead(302, exports.headers);
  //         res.end();
  //       });
  //     }
  //   });
  // }
};



// As you progress, keep thinking about what helper functions you can put here!
