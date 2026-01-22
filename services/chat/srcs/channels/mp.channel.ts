import { isAtLeastOneBlocked } from '../crud/block.crud'
import { clientsSocket } from '../state/clients.state'
import { BunSocketType } from '../types/bunSocket.type'
import { SocketDataType } from '../types/socketData.type'

export async function mpChannel(ws: BunSocketType, data: SocketDataType, message: string | Buffer<ArrayBuffer>) {
	let clientFound: BunSocketType
	for (let client of clientsSocket) {
		if (client.data.username === data.to) {
			clientFound = client
		}
	}
	if (clientFound && !(await isAtLeastOneBlocked(ws, data.to, data))) {
		clientFound.send(message)
		ws.send(message)
	} else if (!clientFound) {
		data.msg = 'Player not found'
		data.type = 'error'
		ws.send(JSON.stringify(data))
	}
}
