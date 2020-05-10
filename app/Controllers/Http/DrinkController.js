'use strict'

const Drink = use('App/Models/Drink')
const Match = use('App/Models/Match')

class DrinkController {
  async store({ request }) {
    console.log(request.input('match'))
    console.log(request.input('player'))
    const match = await Match.findByOrFail('identifier', request.input('match'))

    const drink = await Drink.findOrCreate({
      player_id: request.input('player'),
      match_id: match.id
    }, {
      player_id: request.input('player'),
      match_id: match.id,
      amount: 0
    })

    drink.amount++
    await drink.save()

    return {
      drink
    }
  }
}

module.exports = DrinkController
