'use strict'
const Player = use('App/Models/Player')

class PlayerController {

  async store({ request }) {
    const player = await Player.create({ name: request.input('name') })

    return { player }
  }

  async modify({ request }) {
    const player = await Player.findByOrFail({
      name: request.input('currentName'),
      id: request.input('id')
    })

    player.name = request.input('newName')
    await player.save()

    return { player }
  }
}

module.exports = PlayerController
