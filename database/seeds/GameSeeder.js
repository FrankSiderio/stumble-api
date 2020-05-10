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
            rules.push({ game: game.id, card: `${card} of ${suit}`, description: 'Waterfall - Time for everyone to drink. In order start chugging and once the person next to you stops you can stop. Ask a general knowledge questiont to determine the direction in which you go.' })
            break
          case 2:
            rules.push({ game: game.id, card: `${card} of ${suit}`, description: 'You - Pick someone to drink. Preferably someone you are trying to flirt with. Try hard.' })
            break
          case 3:
            rules.push({ game: game.id, card: `${card} of ${suit}`, description: 'Me - Drink bitch.' })
            break
          case 4:
            rules.push({ game: game.id, card: `${card} of ${suit}`, description: 'Floor - Everyone point to the floor. Last person to do it drinks.' })
            break
          case 5:
            rules.push({ game: game.id, card: `${card} of ${suit}`, description: 'Guys - Anyone who identifies as a male. This is 2020 we do not discriminate.' })
            break
          case 6:
            rules.push({ game: game.id, card: `${card} of ${suit}`, description: 'Chicks - Anyone who identifies as a female. Putang for the win.' })
            break
          case 7:
            rules.push({ game: game.id, card: `${card} of ${suit}`, description: 'Heaven - Everyone point towards heaven unless you don\'t believe in Jesus. In that case shove it up your butt.' })
            break
          case 8:
            rules.push({ game: game.id, card: `${card} of ${suit}`, description: 'Mate - Pick a mate you want to get blackout with. You must drink together now for the remainder of the game.' })
            break
          case 9:
            rules.push({ game: game.id, card: `${card} of ${suit}`, description: 'Rhyme - Pick a word to rhyme with and take turns spittin.' })
            break
          case 10:
            rules.push({ game: game.id, card: `${card} of ${suit}`, description: 'Categories - Pick a category and each player has to name something in that category. A couple of suggestions: sex positions, your mom, and superheros.' })
            break
          case 'Jack':
            rules.push({ game: game.id, card: `${card} of ${suit}`, description: 'Never Have I Ever - You know how this works.' })
            break
          case 'Queen':
            rules.push({ game: game.id, card: `${card} of ${suit}`, description: 'Question Master - Congrats! Now you are the question master? Everyone has to respond to you with a question? If not, they drink?' })
            break
          case 'King':
            rules.push({ game: game.id, card: `${card} of ${suit}`, description: 'Make a Rule - Make it good.' })
            break
        }
      })
    })

    return rules
  }
}

module.exports = GameSeeder
