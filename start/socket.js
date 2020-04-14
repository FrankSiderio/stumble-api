const Server = use('Server')
const io = use('socket.io')(Server.getInstance())
const axios = require('axios')
const Env = use('Env')
const PlayerMatch = use('App/Models/PlayerMatch')
const Match = use('App/Models/Match')

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

  socket.on('completed a turn', (match) => {
    console.log(`completed turn for match: ${match}`)
    axios.post(`${Env.get('APP_URL')}/match/complete`, { match: match }).then((response) => {
      io.to(room).emit('completed a turn', response.data);
    }).catch((error) => { console.log(error) })
  })

  socket.on('player left', async (data) => {
    console.log('Player left')
    const match = await Match.findByOrFail('identifier', data.match)
    await PlayerMatch.query().where('player_id', data.player.id).where('match_id', match.id).delete()

    io.to(room).emit('player left', '')
  })

  // TODO: Remove player from match when user disconnects
  socket.on('disconnect', () => {
    console.log('User disconnected')
  })
});
