import { randomUUID, UUID } from "crypto"
import User from "./User.js"
import { RemoteGame } from "./RemoteGame.js"
import { GameManager } from "./GameManager.js"

export type SessionState =
	| "waiting"
	| "countdown"
	| "playing"
	| "ended"

export type SessionOption = { minPlayers:number, maxPlayers:number, bots?:number}


export class GameSession
{
public readonly id: UUID
public readonly maxPlayers: number
public readonly minPlayers: number

private humans: User[] = []
private bots: number = 0
private spectators: User[] = []

private game?: RemoteGame
private state: SessionState = "waiting"

constructor(
	private readonly gameManager: GameManager,
	options: SessionOption
)
{
	this.id = randomUUID()
	this.minPlayers = options.minPlayers
	this.maxPlayers = options.maxPlayers
	this.bots = options.bots ?? 0
}

addHuman(user: User): boolean
{
	if (this.state !== "waiting") return false
	if (this.humans.includes(user)) return false
	if (this.humans.length >= this.maxPlayers) return false

	this.humans.push(user)
	user.status = "game"
	user.navigate = "remote_game"

	this.checkAutoStart()
	return true
}

addSpectator(user: User)
{
	if (this.spectators.includes(user)) return
	this.spectators.push(user)
}

private checkAutoStart()
{
	if (this.state !== "waiting") return
	if (this.humans.length < this.minPlayers) return

	this.startGame()
}

private startGame()
{
	this.state = "countdown"

	const users: User[] = [...this.humans]

	for (let i = 0; i < this.bots; i++)
	{
		users.push(new User("", `bot_${i}`))
	}

	this.game = this.gameManager.createGame(users)

	this.state = "playing"
}

onGameEnded()
{
	this.state = "ended"

	for (const user of this.humans)
	{
		user.status = "chat"
		user.navigate = "home"
	}

	this.humans = []
	this.bots = 0
	this.spectators = []
	this.game = undefined
}

}
