'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MatchSchema extends Schema {
  up () {
    this.create('matches', (table) => {
      table.increments()
      table.integer('game').unsigned().references('id').on('games')
      table.integer('owner').unsigned().references('id').on('players')
      table.integer('latestRule').unsigned().references('id').on('rules').nullable()
      table.integer('turnIndex')
      table.integer('identifier').unique()
      table.json('cards')
      table.timestamps()
    })
  }

  down () {
    this.drop('matches')
  }
}

module.exports = MatchSchema
