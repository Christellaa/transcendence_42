import { dbPostQuery } from '../services/db.service'
import { clientsList } from '../state/clients.state'
import { BunSocketType } from '../types/bunSocket.type'
import { ClientType } from '../types/client.type'
import { SocketDataType } from '../types/socketData.type'

export async function blockUserChannel(ws: BunSocketType, data: SocketDataType) {
	let clientFound: ClientType
	console.log('Block user')
	for (let client of clientsList) {
		if (client.username === data.msg) {
			clientFound = client
		}
	}
	console.log('Client Found: ', clientFound)
	if (clientFound) {
		// if client already blocked, deblock
		// if client is in friendships or friend_requests, delete those entries and block
		const res = await dbPostQuery({
			endpoint: 'dbRun',
			query: {
				verb: 'INSERT',
				sql: 'INSERT INTO blocks (blocker_username, blocked_username) VALUES (?, ?)',
				data: [ws.data.username, clientFound.username]
			}
		})
		if (res.status >= 400) console.log('status: ', res.status, 'message: ', res.message)
		console.log('Blocked user added to DB: ', res)
		data.msg = `User ${clientFound.username} has been blocked`
		data.type = 'notification'
		data.notificationLevel = 'error'
		ws.send(JSON.stringify(data))
	} else {
		data.msg = 'Player not found'
		data.type = 'error'
		ws.send(JSON.stringify(data))
	}
}
