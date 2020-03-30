'use strict'
const Match = use('App/Models/Match')
const Deck = use('App/Deck')
const characters = '123456789abcdefghijklmnop'

class MatchController {

  async show({ params }) {
    const match = await Match.query()
      .where('identifier', '=', params.identifier)
      .with('player')
      .with('drinkingGame')
      .fetch()

    return match.first()
  }

  async store({ request }) {
    const match = await Match.create({
      game: request.input('game'),
      owner: request.input('owner'),
      turnIndex: 0,
      cards: new Deck().toJson(),
      players: JSON.stringify([request.input('owner')]), // only player in the game so far
      identifier: this.randomString(20, characters)
    })

    return { match }
  }

  randomString(length, characters) { 
    var randomString = ''
    for (var i = length; i > 0; i--) { 
      randomString += characters[Math.floor(Math.random() * characters.length)]
    } 
    return randomString
}
}

module.exports = MatchController
