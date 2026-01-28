import { UUID } from 'crypto'
import { RemoteGame } from './RemoteGame.js'
import User from './User.js'
import { GameSession } from './GameSession.js'
import { GameInitType, GamePending } from '../types/message.type.js'

export class GameManager
{

private sessions = new Map<UUID, GameSession>()

createGame(users: User[]) : RemoteGame
{
	const game = new RemoteGame(users, (g) => this.removeGame(g))
	for (const user of users)
	{
		user.send({ type: 'start-game', text: "" })
	}
	return game
}

getSessionByUser(user: User): GameSession | undefined
{
	for (const session of this.sessions.values())
	{
		if (session.hasHuman(user))
			return session
	}
	return undefined
}


getSessionById(id: string): GameSession | undefined
{
	return this.sessions.get(id as any)
}

removeGame(game: RemoteGame)
{
	game.destroy()
}

createSession(options : GameInitType): GameSession
{
	const session = new GameSession(this, options)
	this.sessions.set(session.id, session)
	return session
}

removeSession(session: GameSession)
{
	this.sessions.delete(session.id)
}

getJoinableSessions(): GameSession[]
{
	return [...this.sessions.values()]
		.filter(session => session.canJoin())
}

getJoinableSessionsInfo() : GamePending[]
{
	return this.getJoinableSessions().map(session => ({
		id: session.id,
		nbPlayerReady: session.getPlayerReady(),
		nbPlayerMax: session.getPlayerMax()
	}))
}

leaveSession(user: User): boolean
{
	const session = this.getSessionByUser(user)
	if (!session) return false

	if (!session.removeHuman(user)) return false

	if (session.isWaiting() && session.getHumanCount() === 0)
	{
		this.removeSession(session)
	}

	return true
}

}
