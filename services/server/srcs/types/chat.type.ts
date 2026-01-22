export type MessageType = {
	type:
		| 'global'
		| 'mp'
		| 'auth'
		| 'info'
		| 'error'
		| 'users'
		| 'req-friend'
		| 'notification'
		| 'block-user'
		| 'duel-user'
		| 'update-username'
	to?: number | string
	id?: string
	msg: string
	timestamp: number
	user: string
}
