import { FastifyRequest, FastifyReply } from 'fastify'
import { v4 as uuidv4 } from 'uuid'
import { json_parse } from '../../frontend/functions/json_wrapper.js'
import { fetch42User } from '../crud/auth.crud.js'

export async function handlePOSTApiAuthRegister(req: FastifyRequest, reply: FastifyReply) {
	const { code } = json_parse(req.body)

	const url =
		'https://api.intra.42.fr/oauth/token?' +
		new URLSearchParams({
			client_id: 'u-s4t2ud-9f30b2430e51c381ae5e38158295eef89230a74b070231a798bd1bcb7a01709c',
			grant_type: 'authorization_code',
			client_secret: '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',
			code,
			redirect_uri: 'https://localhost/register',
			state: uuidv4()
		})

	const infoFetch = await fetch42User(url, true)
	if (!infoFetch) return reply.status(403).send({ error: 'Invalid credentials' })
	return reply.send(infoFetch)
}

export async function handlePOSTApiAuthLogin(req: FastifyRequest, reply: FastifyReply) {
	const { code } = json_parse(req.body)

	const url =
		'https://api.intra.42.fr/oauth/token?' +
		new URLSearchParams({
			client_id: 'u-s4t2ud-9f30b2430e51c381ae5e38158295eef89230a74b070231a798bd1bcb7a01709c',
			grant_type: 'authorization_code',
			client_secret: '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',
			code,
			redirect_uri: 'https://localhost/login',
			state: uuidv4()
		})

	const infoFetch = await fetch42User(url, false)
	if (!infoFetch) return reply.status(403).send({ error: 'Invalid credentials' })
	return reply.send(infoFetch)
}
