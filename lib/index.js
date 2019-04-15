const fs = require('fs');
const http = require('http');
const path = require('path');
const util = require('util');

const stat = util.promisify(fs.stat);

const respond = (req, res) =>
  res
    .end('ok');

const notFound = (req, res) => {
  res.statusCode = 404;
  res
    .end(JSON.stringify({
      statusCode: 404,
      message: 'Not found!',
    }));
}

const loadScript = (script) => (req, res) =>
  stat(script)
    .then(() =>
      require(script)
        (req, res)
    )
    .catch((err) => {
      console.log(err);
      notFound(req, res);
    });

module.exports = (directory, port) => {
  if (!directory) {
    throw Error('No directory given!');
  }
  if (!port) {
    throw Error('No port given!');
  }
  const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        req.body = body;
        loadScript(path.resolve(directory, `.${req.url}.js`))(req, res);
      });
    } else {
      loadScript(path.resolve(directory, `.${req.url}.js`))(req, res);
    }
  });
  
  server.listen(port);

  return server;
};
