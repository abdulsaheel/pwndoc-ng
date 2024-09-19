const http = require('http');
const path = require('path');
const fs = require('fs');
const port = 8081;

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, 'dist', 'spa', req.url === '/' ? 'index.html' : req.url);
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end('Error occurred');
    } else {
      res.writeHead(200, { 'Content-Type': getContentType(filePath) });
      res.end(content);
    }
  });
});

function getContentType(filePath) {
  const ext = path.extname(filePath);
  switch (ext) {
    case '.js': return 'text/javascript';
    case '.css': return 'text/css';
    case '.html': return 'text/html';
    case '.png': return 'image/png';
    case '.jpg': return 'image/jpeg';
    default: return 'text/plain';
  }
}

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
