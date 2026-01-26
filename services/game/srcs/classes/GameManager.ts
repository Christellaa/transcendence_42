import { UUID } from 'crypto'
import { RemoteGame } from './RemoteGame.js'
import User from './User.js'
import { GameSession, SessionOption } from './GameSession.js'
import { CreateGameType } from '../types/message.type.js'


export class GameManager
{
	private games = new Map<UUID, RemoteGame>()
	private sessions = new Map<UUID, GameSession>()

	createGame(users: User[]) : RemoteGame
	{
		const game = new RemoteGame(users, (g) => this.removeGame(g))

		for (const user of users)
		{
			user.send({ type: 'start-game', text: "" })
		}

		this.games.set(game.id, game)
		return game
	}

	removeGame(game: RemoteGame)
	{
		this.games.delete(game.id)
		game.destroy()
	}

	getGameByUser(user: User): RemoteGame | undefined
	{
	for (const game of this.games.values()) {
		if (game.hasUser(user)) return game
	}
	return undefined;
	}

	createSession(options : SessionOption): GameSession
	{
		const session = new GameSession(this, options)
		this.sessions.set(session.id, session)
		return session
	}

	removeSession(session: GameSession)
	{
		this.sessions.delete(session.id)
	}

}
