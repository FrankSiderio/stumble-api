'use strict'

const { test, trait } = use('Test/Suite')('Match')
const Player = use('App/Models/Player')
const Post = use('App/Models/Match')
const Game = use('App/Models/Game')
const Match = use('App/Models/Match')

trait('Test/ApiClient')

test('create a match', async ({ client }) => {
  const game = await Game.create({ name: 'Deathbox' })
  const player = await Player.create({ name: 'Bob Dylan' })

  const response = await client.post('/match')
    .send({
      'game': game.id,
      'owner': player.id
    }).end()
  
  response.assertStatus(200)
  response.assertJSONSubset({
    match: {
      game: game.id,
      owner: player.id,
      turnIndex: 0,
      players: JSON.stringify([player.id])
    }
  })
})

test('get a match', async ({ client }) => {
  const game = await Game.create({ name: 'Trash Man' })
  const player = await Player.create({ name: 'Fletcher Cox In Your Face' })
  const match = await Match.create({
    game: game.id,
    owner: player.id,
    cards: JSON.stringify(['']),
    players: JSON.stringify([player.id]),
    turnIndex: 0,
    identifier: '1234'
  })

  const response = await client.get(`/match/${match.identifier}`).end()
  response.assertStatus(200)

  console.log(response)
  console.log(player)
  response.assertJSONSubset({
    game: game.id,
    owner: player.id,
    turnIndex: 0,
    players: JSON.stringify([player.id])
  })
})