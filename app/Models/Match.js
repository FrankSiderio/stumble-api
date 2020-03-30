'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Match extends Model {

  player() {
    return this.belongsTo('App/Models/Player', 'owner')
  }

  drinkingGame() {
    return this.belongsTo('App/Models/Game', 'game')
  }

}

module.exports = Match
