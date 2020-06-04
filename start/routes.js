'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.post('/player', 'PlayerController.store')
Route.put('/player', 'PlayerController.modify')

Route.get('/games', 'GameController.index')

Route.post('/match', 'MatchController.store')
Route.get('/match/:identifier', 'MatchController.show')
Route.post('/match/join', 'MatchController.modify')
Route.post('/match/deal', 'MatchController.deal')
Route.post('/match/complete', 'MatchController.complete')
Route.post('/match/drink', 'DrinkController.store')
Route.delete('/match/drink', 'DrinkController.destroy')