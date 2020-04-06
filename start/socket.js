const Server = use('Server')
const io = use('socket.io')(Server.getInstance())
const axios = require('axios')

io.on('connection', (socket) => {
  console.log('Connected')
  socket.on('chat message', (msg) => {
    console.log(`Got chat message: ${msg}`)
    io.emit('chat message', msg);
  });

  socket.on('dealt a card', (match) => {
    axios.post('http://127.0.0.1:3333/match/deal', {
      match: match
    }).then((res) => {
      console.log(res.data)
      io.emit('dealt a card', res.data)
    }).catch((error) => {
      console.error(error)
    })
  })

  socket.on('disconnect', () => {
    console.log('User disconnected')
  })
});
