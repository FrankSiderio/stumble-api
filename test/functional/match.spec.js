'use strict'

const { test, trait } = use('Test/Suite')('Match')
const Player = use('App/Models/Player')
const Post = use('App/Models/Match')
const Game = use('App/Models/Game')
const Match = use('App/Models/Match')
const Deck = use('App/Deck')
const PlayerMatch = use('App/Models/PlayerMatch')

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
      turnIndex: 0
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
    turnIndex: 0,
    identifier: 1234
  })

  const response = await client.get(`/match/${match.identifier}`).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    turnIndex: 0,
    identifier: 1234
  })
})

test('add a player', async ({ client }) => {
  const game = await Game.create({ name: 'Cheers to the Governor' })
  const player = await Player.create({ name: 'Fletcher Cox In Your Face' })
  const newPlayer = await Player.create({ name: 'Jason Kelce' })
  const match = await Match.create({
    game: game.id,
    owner: player.id,
    cards: JSON.stringify(['']),
    turnIndex: 0,
    identifier: 12345
  })

  const response = await client.post('/match/join')
    .send({ player: newPlayer.id, match: match.identifier })
    .end()

  response.assertStatus(200)
})

test('deal a card', async ({ client }) => {
  const game = await Game.findByOrFail('name', 'Kings')
  const player = await Player.create({ name: 'Fletcher Cox In Your Face' })
  const newPlayer = await Player.create({ name: 'Jason Kelce' })
  const match = await Match.create({
    game: game.id,
    owner: player.id,
    cards: new Deck().toStringJson(),
    turnIndex: 0,
    identifier: 123456
  })
  await PlayerMatch.create({
    player_id: player.id,
    match_id: match.id
  })

  await PlayerMatch.create({
    player_id: newPlayer.id,
    match_id: match.id
  })

  const response = await client.post('/match/deal')
    .send({ match: match.identifier }).end()
  // console.log(response)
  response.assertStatus(200)
})

test('complate a turn', async ({ client }) => {
  const game = await Game.findByOrFail('name', 'Kings')
  const player = await Player.create({ name: 'Fletcher Cox In Your Face' })
  const newPlayer = await Player.create({ name: 'Jason Kelce' })
  const match = await Match.create({
    game: game.id,
    owner: player.id,
    cards: new Deck().toStringJson(),
    turnIndex: 0,
    identifier: 2343
  })
  await PlayerMatch.create({
    player_id: player.id,
    match_id: match.id
  })

  await PlayerMatch.create({
    player_id: newPlayer.id,
    match_id: match.id
  })

  const response = await client.post('/match/complete')
    .send({ match: match.identifier }).end()
  console.log(response)
  response.assertStatus(200)
})

