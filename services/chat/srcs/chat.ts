/********************** Fastify **********************/
import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import fastifyWebsocket from '@fastify/websocket'
import cors from '@fastify/cors'

/********************** Libs **********************/
import fs from 'fs'
import path from 'path'

/********************** Functions **********************/
import __dirname, { setDirName } from './functions/dirname.fn.js'

/********************** Services **********************/
import { log } from './logs.js'

/********************** Routes **********************/
// import { gameRoutes } from './routes/game.route.js'

setDirName(path.resolve())

const fastify: FastifyInstance = Fastify({
	https: {
		key: fs.readFileSync(path.join(__dirname(), 'certs/key.pem')),
		cert: fs.readFileSync(path.join(__dirname(), 'certs/cert.pem'))
	}
})

await fastify.register(cors, {
	origin: ['https://localhost']
})

await fastify.register(fastifyWebsocket)

// publicWatcher()

const start = async () => {
	try {
		await fastify.listen({ host: '0.0.0.0', port: 4444 })
		console.log('Server running on http://localhost:4444')
		log('Server running on http://localhost:4444', 'info')
	} catch (err) {
		fastify.log.error(err)
		log(`Server failed to start: ${err}`, 'error')
		process.exit(1)
	}
}

start()
