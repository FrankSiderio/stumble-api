'use strict'
const Match = use('App/Models/Match')
const Deck = use('App/Deck')
const PlayerMatch = use('App/Models/PlayerMatch')
const Player = use('App/Models/Player')
const Rule = use('App/Models/Rule')

class MatchController {

  async show({ params }) {
    const match = await Match.query()
      .where('identifier', '=', params.identifier)
      .with('createdBy')
      .with('drinkingGame')
      .with('players')
      .with('latestCard')
      .fetch()

    return match.first()
  }

  async store({ request }) {
    const match = await Match.create({
      game: request.input('game'),
      owner: request.input('owner'),
      turnIndex: 0,
      cards: new Deck().toStringJson(),
      identifier: Math.floor(Math.random() * 10000)
    })

    await PlayerMatch.create({
      match_id: match.id,
      player_id: match.owner
    })

    return { match }
  }

  async modify({ request }) {
    const match = await Match.findByOrFail('identifier', request.input('match'))
    const player = await Player.findOrFail(request.input('player'))

    await PlayerMatch.create({
      match_id: match.id,
      player_id: player.id
    })

    return {
      message: `${player.name} was added to the match!`
    }
  }

  async deal({ request }) {
    // Get the cards with the match
    const match = await Match.findByOrFail('identifier', request.input('match'))
    const deck = new Deck()
    deck.deck = JSON.parse(match.cards)
    // Deal a card
    // Remove that card from the deck 
    // UPDATE THE DECK BRO
    const dealtCard = deck.deal()
    match.cards = JSON.stringify(deck.deck)

    const rule = await Rule.query().where('card', dealtCard).where('game', match.game).fetch()
    match.latestRule = rule.toJSON()[0].id
    await match.save()

    // Return the updated match
    const matchToReturn = await Match.query()
      .where('identifier', '=', match.identifier)
      .with('createdBy')
      .with('drinkingGame')
      .with('players')
      .with('latestCard')
      .fetch()

    return matchToReturn.first()
  }

  async complete({ request }) {
    const match = await Match.findByOrFail('identifier', request.input('match'))

    // Update the turnIndex
    if (await match.players().getCount() == match.turnIndex + 1) {
      match.turnIndex = 0
    } else {
      match.turnIndex++
    }

    await match.save()

    return {
      identifier: match.identifier,
      turnIndex: match.turnIndex,
      createdby: await match.createdBy().fetch(),
      drinkingGame: await match.drinkingGame().fetch(),
      players: await match.players().fetch(),
      latestCard: await match.latestCard().fetch()
    }
  }
}

module.exports = MatchController
