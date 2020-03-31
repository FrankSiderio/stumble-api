'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PlayerMatchSchema extends Schema {
  up () {
    this.create('player_matches', (table) => {
      table.increments()
      table.integer('player_id').unsigned().references('id').on('players')
      table.integer('match_id').unsigned().references('id').on('matches')
      table.timestamps()
    })
  }

  down () {
    this.drop('player_matches')
  }
}

module.exports = PlayerMatchSchema
