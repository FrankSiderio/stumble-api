'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DrinkSchema extends Schema {
  up () {
    this.create('drinks', (table) => {
      table.increments()
      table.integer('player_id').unsigned().references('id').on('players')
      table.integer('match_id').unsigned().references('id').on('matches')
      table.integer('amount').unsigned().defaultTo(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('drinks')
  }
}

module.exports = DrinkSchema
