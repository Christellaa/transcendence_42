import Lobby from '../classes/Lobby.js'
import User from '../classes/User.js';
import { BunSocketType } from '../types/bunSocket.type'
import { AuthType, UpdateUsernameType } from '../types/message.type.js'

export function updateUsernameChannel(ws: BunSocketType, data: UpdateUsernameType, lobby : Lobby)
{
    const user: User = ws.data.user;
    if (user.updateUsername(data.username))
    {
        lobby.broadcast({type:"list-user", users:lobby.get_users()})
        lobby.broadcast({type:'list-game', games:lobby.gameManager.getJoinableSessionsInfo()})
    }

    // if (ws.data.user && ws.data.user) 
    // ws.data.username = data.username
    // const user = lobby.createUser(data.username)
    // user.socket = ws
    // ws.data.user = user
    // user.send({
    //     type: "list-game",
    //     games: lobby.gameManager.getJoinableSessionsInfo()
    // })
}
