'use strict'

/*
|--------------------------------------------------------------------------
| GameSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
// const Factory = use('Factory') // dont need this yet 
const Game = use('App/Models/Game')
const Rule = use('App/Models/Rule')
const Deck = use('App/Deck')

class GameSeeder {
  async run() {
    const game = await Game.findOrCreate({ name: 'Kings' }, { name: 'Kings' }) // Only supported game

    await Rule.createMany(this.createRulesForKings(game))
  }

  createRulesForKings(game) {
    const deck = new Deck()

    let rules = []
    deck.suits.forEach(suit => {
      deck.values.forEach(card => {
        switch (card) {
          case 'Ace':
            rules.push({ game: game.id, card: `${card} of ${suit}`, description: 'Waterfall' })
            break
          case 2:
            rules.push({ game: game.id, card: `${card} of ${suit}`, description: 'You' })
            break
          case 3:
            rules.push({ game: game.id, card: `${card} of ${suit}`, description: 'Me' })
            break
          case 4:
            rules.push({ game: game.id, card: `${card} of ${suit}`, description: 'Floor' })
            break
          case 5:
            rules.push({ game: game.id, card: `${card} of ${suit}`, description: 'Guys' })
            break
          case 6:
            rules.push({ game: game.id, card: `${card} of ${suit}`, description: 'Chicks' })
            break
          case 7:
            rules.push({ game: game.id, card: `${card} of ${suit}`, description: 'Heaven' })
            break
          case 8:
            rules.push({ game: game.id, card: `${card} of ${suit}`, description: 'Mate' })
            break
          case 9:
            rules.push({ game: game.id, card: `${card} of ${suit}`, description: 'Rhyme' })
            break
          case 10:
            rules.push({ game: game.id, card: `${card} of ${suit}`, description: 'Categories' })
            break
          case 'Jack':
            rules.push({ game: game.id, card: `${card} of ${suit}`, description: 'Never Have I Ever' })
            break
          case 'Queen':
            rules.push({ game: game.id, card: `${card} of ${suit}`, description: 'Question Master' })
            break
          case 'King':
            rules.push({ game: game.id, card: `${card} of ${suit}`, description: 'Make a Rule' })
            break
        }
      })
    })

    return rules
  }
}

module.exports = GameSeeder
