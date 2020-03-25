'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RuleSchema extends Schema {
  up () {
    this.create('rules', (table) => {
      table.increments()
      table.text('description')
      table.json('card')
      table.integer('game').unsigned().references('id').on('games')
      table.timestamps()
    })
  }

  down () {
    this.drop('rules')
  }
}

module.exports = RuleSchema
