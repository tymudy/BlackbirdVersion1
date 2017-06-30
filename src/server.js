const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const fs = require('fs');

server.listen(8080);

io.on('connection', function (socket) {

  const readStream = fs.createReadStream("video.webm");

  socket.on('video_stream_req', function (req) {
    if (req === 'get_data') {
      readStream.addListener('data', function (data) {
        socket.emit('chunk', data);
      });
    }
  });

  readStream.on('close', function () {
    socket.emit('finish', true);
  })
});
