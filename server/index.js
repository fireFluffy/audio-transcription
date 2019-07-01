const http = require('http');
const fs = require('fs');
const path = require('path');

const host = '127.0.0.1';
const port = 3235;

const file1 = 'assets/white_ship.wav';
const file2 = 'assets/audio.wav';

const requestHandler = (request, response) => {
  console.log(request.url);
  if (request.method === 'GET' && request.url === '/track') {
    const filePath = path.join(__dirname, file2);
    console.log(filePath);
    const stat = fs.statSync(filePath);

    response.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'origin, content-type, accept',
      'Accept-Ranges': 'bytes',
      'Content-Disposition': 'filename ="audio.wav"',
      'Content-Type': 'audio/wav',
      'Content-Length': stat.size,
    });

    const readStream = fs.createReadStream(filePath);
    readStream.on('data', function(data) {
      response.write(data);
    });

    readStream.on('end', function() {
      response.end();
    });
  }
};
const server = http.createServer(requestHandler);
server.listen(port, host, err => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${port}`);
});
