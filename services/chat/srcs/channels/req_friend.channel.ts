import { BunSocketType } from '../types/bunSocket.type'
import { SocketDataType } from '../types/socketData.type'
import { isAtLeastOneBlocked } from '../crud/block.crud'
import { isFriend, insertFriendship, removeFromFriendships } from '../crud/friend.crud'
import { insertFriendRequest, isDoubleFriendRequest, isInFriendRequests, removeFromFriendRequests } from '../crud/request.crud'
import { clientsSocket } from '../state/clients.state'

export async function reqFriendChannel(ws: BunSocketType, data: SocketDataType) {
	let clientFound: BunSocketType
	console.log('Friends request')
	for (let socket of clientsSocket) {
		if (socket.data.username === data.msg) {
			clientFound = socket
		}
	}
	console.log('Client Found: ', clientFound)
	if (clientFound) {
		if (await isAtLeastOneBlocked(ws, clientFound.data.username, data)) return
		console.log('User not blocked, check if friends')

		const friendStatus = await isFriend(ws, clientFound.data.username, data)
		if (friendStatus == 'error') return
		else if (friendStatus == 'true') {
			console.log('Users are already friends. Removing them from friendships.')
			if (!(await removeFromFriendships(ws, clientFound.data.username, data))) return
			console.log('Users removed from friendships.')
			data.msg = `You have removed ${clientFound.data.username} from your friends list.`
			data.type = 'notification'
			data.notificationLevel = 'info'
			ws.send(JSON.stringify(data))
			return
		}
		console.log('Users are not friends, check if double friend request')

		const doubleFriendRequest = await isDoubleFriendRequest(ws, clientFound.data.username, data)
		if (doubleFriendRequest === 'error' || doubleFriendRequest === 'true') return
		console.log('No double friend request, check if the other user has sent a friend request')
		const inFriendRequests = await isInFriendRequests(ws, clientFound.data.username, data)
		if (inFriendRequests === 'error') return
		else if (inFriendRequests === 'true') {
			console.log('User is in friend requests, add to friendships')

			if (!(await insertFriendship(ws, clientFound, data))) return
			console.log('Friendship added to DB')

			await removeFromFriendRequests(ws, clientFound.data.username, data)
			console.log('Friend request removed from DB')
			return
		}

		console.log('User is not in friend requests, send friend request')
		if (!(await insertFriendRequest(ws, clientFound.data.username, data))) return
		console.log('Friend request sent to DB')

		data.msg = clientFound.data.username
		data.type = 'req-friend'
		clientFound.send(JSON.stringify(data))

		data.type = 'notification'
		data.notificationLevel = 'info'
		data.msg = `User ${ws.data.username} wants to be friends!`
		clientFound.send(JSON.stringify(data))

		data.msg = `Friend request sent to ${ws.data.username}!`
		ws.send(JSON.stringify(data))
	} else {
		data.msg = 'Player not found'
		data.type = 'error'
		ws.send(JSON.stringify(data))
	}
}
