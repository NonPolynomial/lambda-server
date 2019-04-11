# Lambda-Server

Run lambda functions with a http server.

## How it works

If you have the following directory structure and files, you can simply import `lambda-server` and start it.
The `lambda-server` expects to parameters: a directory and a port.

```
.
├── lambda
│   ├── foo
│   │   └── bar.js
│   └── hello-world.js
└── index.js
```

```bash
$ npm -g i @nonpolynomial/lambda-server

# or

$ yarn add @nonpolynomial/lambda-server
```

```js
// index.js
const lambda = require('lambda');

const lambdaServer = lambda(`${__dirname}/lambda`, 8080);
```

```js
// lambda/foo/bar.js
module.exports = (req, res) => {
  res.end(JSON.stringify({ foo: 'bar' }));
};
```

```js
// lambda/hello-world.js
module.exports = (req, res) => {
  res.end('hello world');
};
```

Because we started `lambda-server` with `lambda` as directory, you get a `hello world` if you visit http://localhost:8080/hello-world.

The file, that gets loaded, depends on the path you visit.

|   URL-path   | loaded filepath  |
| ------------ | ---------------- |
| /foo/bar     | `foo/bar.js`     |
| /hello-world | `hello-world.js` |

### ...or use lambda server with your CLI

```bash
npm -g i @nonpolynomial/lambda-server

# or

yarn global add @nonpolynomial/lambda-server
```

```bash
$ lambda ./lambda --port 1337
```
