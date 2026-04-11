import { randomUUID } from 'node:crypto'
import { sql } from './SQL.js'

export class databasepostgres {
    #videos = new Map()

    async list(search) {
        let videos
        if (search) {
            videos = await sql`select * from videos where title like ${'%' + search + '%'}`
        } else {
            videos = await sql`select * from videos`
        }

        return videos
    }

    async create(video) {
        const videoId = randomUUID()
        const { title, description } = video

        await sql`insert into videos (id, title, description) values (${ videoId }, ${ title }, ${ description })`
    }

    async update(id, video) {
        const { title, description } = video
        await sql`update videos set title = ${ title }, description = ${ description } where id = ${ id }`
    }

    async delete(id) {
        await sql`delete from videos where id = ${ id }`
    }
}