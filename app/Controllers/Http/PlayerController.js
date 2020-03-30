'use strict'
const Player = use('App/Models/Player')

class PlayerController {

  async store({ request }) {
    const player = await Player.create({ name: request.input('name') })

    return { player }
  }
}

module.exports = PlayerController
