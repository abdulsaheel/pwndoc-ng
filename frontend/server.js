const http = require('http');
const path = require('path');
const fs = require('fs');

const port = 8081; // Change this to your preferred port
const distDir = path.join(__dirname, 'dist/spa'); // Adjust path if needed

const server = http.createServer((req, res) => {
  let filePath = path.join(distDir, req.url === '/' ? 'index.html' : req.url);
  const extname = path.extname(filePath);
  const contentType = getContentType(extname) || 'text/html';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        fs.readFile(path.join(distDir, '404.html'), (err, content) => {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end(content, 'utf-8');
        });
      } else {
        res.writeHead(500);
        res.end('Server Error: ' + err.code);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

function getContentType(extname) {
  switch (extname) {
    case '.js': return 'application/javascript';
    case '.css': return 'text/css';
    case '.json': return 'application/json';
    case '.png': return 'image/png';
    case '.jpg': return 'image/jpg';
    case '.gif': return 'image/gif';
    case '.svg': return 'image/svg+xml';
    default: return 'text/html';
  }
}

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

