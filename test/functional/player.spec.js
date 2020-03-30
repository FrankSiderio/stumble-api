'use strict'

const { test, trait } = use('Test/Suite')('Player')
const Post = use('App/Models/Player')

trait('Test/ApiClient')

test('create a player', async ({ client }) => {
  const response = await client.post('/player')
    .send({'name': 'Fletcher Cox'})
    .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    player: {
      name: 'Fletcher Cox'
    }
  })
})