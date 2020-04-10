const Server = use('Server')
const io = use('socket.io')(Server.getInstance())
const axios = require('axios')
const Env = use('Env')

io.on('connection', async (socket) => {
  const room = socket.handshake['query']['match'];
  socket.join(room);
  console.log(`user joined room #: ${room}`);
  io.to(room).emit('player joined', '') // Idk if we have anything to send

  socket.on('dealt a card', (match) => {
    axios.post(`${Env.get('APP_URL')}/match/deal`, { match: match }).then((response) => {
      io.to(room).emit('dealt a card', response.data);
    }).catch((error) => { console.log(error) })
  })

  // TODO: Remove player from match when user disconnects
  socket.on('disconnect', () => {
    console.log('User disconnected')
  })
});
