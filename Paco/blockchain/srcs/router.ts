import { RouteType } from './types/route.type'

const slashRoute = {
	'/': {
		GET: () => new Response('This is / GET'),
		POST: () => new Response('This is / POST')
	}
}

const idRoute = {
	'/:id': {
		GET: (req: Request) => {
			console.log('This is a new request')
			console.log(req)
			return new Response('This is a new / GET')
		},
		POST: () => new Response('This is / POST')
	}
}

export const routes = {
	...slashRoute,
	...idRoute
}
