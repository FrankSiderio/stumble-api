'use strict'

const { test, trait } = use('Test/Suite')('Player')
const Player = use('App/Models/Player')

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

test('change player name', async ({ client }) => {
  const currentPlayer = await Player.create({ name: 'Kevin Biscuit' })

  const response = await client.put('/player')
    .send({'currentName': currentPlayer.name, 'newName': 'Bob', 'id': currentPlayer.id})
    .end()

  // console.log(response)
  response.assertStatus(200)
  response.assertJSONSubset({
    player: {
      name: 'Bob'
    }
  })
})