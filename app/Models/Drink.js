'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Drink extends Model {
  static get hidden () {
    return ['match_id']
  }
}

module.exports = Drink
