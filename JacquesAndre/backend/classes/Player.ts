import { WebSocket } from "ws"

import User from "./User.js"
import { arena } from "./board.js";
import type { Impact } from "./Ball.ts";

export class Player
{
	readonly index: number
	readonly nbPlayer : number
	readonly defaultAngle: number
	readonly minAngle: number
	readonly maxAngle: number
	readonly user: User
	paddleSize: number
	angle: number
	score: number
	pause: boolean
	ai: boolean
	pseudo: string
	key: string

	constructor(index: number, nbPlayer: number, user: User)
	{
		this.index = index
		this.nbPlayer = nbPlayer
		this.paddleSize = 0.25 * Math.PI / nbPlayer
		this.user = user
		this.key = "none"
		this.pause = false
		this.ai = true
		this.score = Math.round(21 / nbPlayer)
		this.pseudo = ""
		const twoPiOverPlayers = (2 * Math.PI) / this.nbPlayer
		this.minAngle = this.index * twoPiOverPlayers
		this.maxAngle = (this.index + 1) * twoPiOverPlayers
		this.defaultAngle = this.minAngle + (twoPiOverPlayers / 2)
		this.angle = this.defaultAngle
		console.log(`created player${index} angle ${this.angle} min ${this.minAngle} max ${this.maxAngle}`)
		user.status = "game"
	}


	handleIA(predictionIA:Impact[])
	{
		this.pseudo = "🤖" + this.user.pseudo
		let theta = this.defaultAngle
		predictionIA.forEach(pr=>{
			if (pr.theta > this.minAngle && pr.theta < this.maxAngle)
			{
				theta = pr.theta
				return
			}
		})
		if (this.angle > theta + this.paddleSize / 2) this.angle -= 0.05
		else if (this.angle < theta - this.paddleSize / 2) this.angle += 0.05
		if (this.angle - this.paddleSize < this.minAngle) this.angle = this.minAngle + this.paddleSize
		if (this.angle + this.paddleSize > this.maxAngle) this.angle = this.maxAngle - this.paddleSize
	}

	handleKey(predictionIA: Impact[])
	{
		const key = this.key
		this.key = "none"
		if (key === "space") return this.togglePause()
			if (key === "chatGPT") this.ai = !this.ai
		if (this.ai)  return this.handleIA(predictionIA)
			this.pseudo = this.user.pseudo
		if (this.user.socket && this.user.socket.readyState !== WebSocket.OPEN) return this.togglePause()

		if (key === "none") return
		if (key === "-") this.angle += 0.05
		else if (key === "+") this.angle -= 0.05
		if (this.angle - this.paddleSize < this.minAngle) this.angle = this.minAngle + this.paddleSize
		if (this.angle + this.paddleSize > this.maxAngle) this.angle = this.maxAngle - this.paddleSize
	}

	togglePause()
	{
		this.pause = !this.pause
		if (this.pause) console.log(`⏸️ Joueur ${this.pseudo} toggle pause`)
	}

	resetAngle()
	{
		this.angle = this.defaultAngle
	}
}
