//import { createServer} from 'node:http'

//const server = createServer((request, response) => {
//    response.write('hello word')

//    return response.end()
//})

//server.listen(3333)

import Fastify from 'fastify'
import {databasememory} from './database-memory.js'
import { databasepostgres } from './database_postgres.js'

const server = Fastify()

// GET, POST, PUT, DELETE

// GET - buscar uma informação
// POST - criar uma informação
// PUT - atualizar uma informação
// DELETE - deletar uma informação

// POST: http://localhost:3333/video
// GET: http://localhost:3333/video
// PUT: http://localhost:3333/video

// route parameter

const database = new databasepostgres()

server.post('/video', async (request, reply) => {
    const { title, description, url } = request.body

    await database.create({
        title,
        description,
        url,
    })

    console.log(database.list())

    return reply.status(201).send()
})

server.get('/video', async () => {
    const videos = await database.list()

    return videos
})

server.put('/video/:id', async(request, reply) => {
    const videoId = request.params.id
    const { title, description, url } = request.body

    await database.update(videoId, {
        title,
        description,
        url,
    })

    return reply.status(204).send()
})

server.delete('/video/:id', async (request, reply) => {
    const videoId = request.params.id

    await database.delete(videoId)

    return reply.status(204).send()
})

server.listen ({
    port: 3333,
})
