var path = require('path');
var archive = require('../helpers/archive-helpers');
var http = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!


exports.handleRequest = function (req, res) {
  var {headers, method, url} = req;
  var filePath = '.' + url;
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
    archive.isUrlInList(filePath, function(exists) {
      if (exists) {
        archive.isUrlArchived(filePath, function(exists) {
          if (exists) {
            fs.readFile(archive.paths.archivedSites + filePath.slice(1), 'utf8', function(err, data) {
              console.log('file path...', archive.paths.archivedSites + filePath.slice(1));
              if (err) {
                console.log('ERROR!');
                throw err;
              }   
              res.writeHead(200, headers);
              res.write(data);
              res.end();
            });
          } else {
            fs.readFile(archive.paths.siteAssets + '/loading.html', 'utf8', function(err, data) {
              if (err) {
                console.log('ERROR!');
                throw err;
              }   
              res.writeHead(200, headers);
              res.write(data);
              res.end();
            });
          }
        });
      } else {
        archive.addUrlToList(filePath, function() {
          fs.readFile(archive.paths.siteAssets + '/loading.html', 'utf8', function(err, data) {
            if (err) {
              console.log('ERROR!');
              throw err;
            }   
            res.writeHead(200, headers);
            res.write(data);
            res.end();
          });
        });
      }
    });
  }

  




};
