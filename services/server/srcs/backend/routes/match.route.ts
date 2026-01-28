import { dbPostQuery } from '../services/db.service.js'
import { FastifyReply, FastifyRequest } from 'fastify'
import httpErrors from 'http-errors'

export async function addMatch(req: FastifyRequest, reply: FastifyReply) {
	const { matchType, players } = req.body

	const matchRes = await dbPostQuery({
		endpoint: 'dbRun',
		query: {
			verb: 'create',
			sql: 'INSERT INTO matches (type) VALUES (?)',
			data: [matchType]
		}
	})
	if (matchRes.status >= 400) throw httpErrors(matchRes.status, matchRes.message)

	for (const player of players) {
		console.log('hello: ', player)
		const playersRes = await dbPostQuery({
			endpoint: 'dbRun',
			query: {
				verb: 'create',
				sql: 'INSERT INTO match_players (match_id, username, result) VALUES (?, ?, ?)',
				data: [matchRes.data.lastID, player.username, player.gameRes]
			}
		})
		if (playersRes >= 400) throw httpErrors(matchRes.status, matchRes.message)
	}
	return reply.status(200).send({ message: 'OK' })
}
