'use strict'
const Game = use('App/Models/Game')

class GameController {

  async index() {
    return await Game.all()
  }

}

module.exports = GameController
