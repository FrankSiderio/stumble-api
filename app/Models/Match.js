'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Match extends Model {

  static get hidden () {
    return ['game', 'id', 'owner']
  }

  createdBy() {
    return this.belongsTo('App/Models/Player', 'owner')
  }

  drinkingGame() {
    return this.belongsTo('App/Models/Game', 'game')
  }

  players() {
    return this.belongsToMany('App/Models/Player').pivotTable('player_matches')
  }

  latestCard() {
    return this.belongsTo('App/Models/Rule', 'latestRule')
  }

  drinks() {
    return this.hasMany('App/Models/Drink')
  }

}

module.exports = Match
