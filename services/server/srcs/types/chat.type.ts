export type MessageType = {
	type: 'global' | 'mp' | 'auth' | 'info' | 'error' | 'users'
	to?: number | string
	id?: string
	msg: string
	timestamp: number
	user: string
}
