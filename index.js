var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile('./index.html', { root: __dirname });
});

var counter = 0;

io.on('connection', function(socket){
  var name = 'user' + counter;
  counter = counter + 1;
  socket.broadcast.emit('chat message', name + ' connected')
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('disconnect',  function(){
    socket.broadcast.emit('chat message', name + ' connected')
  });
});

io.emit('some event', {for: 'everyone'});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
