'use strict'

const { test, trait } = use('Test/Suite')('Game')
const Game = use('App/Models/Game')

trait('Test/ApiClient')

test('get list of games', async ({ client }) => {
  await Game.create({
    name: 'Your Mom'
  })

  const response = await client.get('/games').end()

  response.assertStatus(200)
  response.assertJSONSubset([{
    name: 'Your Mom'
  }])
})