import { sendUserList } from '../functions/sendUserList.fn'
import { clientsSocket } from '../state/clients.state'
import { BunSocketType } from '../types/bunSocket.type'
import { SocketDataType } from '../types/socketData.type'

export function authChannel(ws: BunSocketType, data: SocketDataType) {
	ws.data.username = data.username
	for (let socket of clientsSocket) {
		data.msg = `Player ${data.username} has connected`
		data.type = 'info'
		socket.send(JSON.stringify(data))
	}
	sendUserList()
}
