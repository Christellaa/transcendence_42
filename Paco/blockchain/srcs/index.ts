import { routes } from './router'
import { BunRequest } from 'bun'

Bun.serve({
	port: 3001,
	routes
})
