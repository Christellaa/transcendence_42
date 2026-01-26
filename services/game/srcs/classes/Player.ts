import type { PlayerController, PlayerAction } from "../controllers/PlayerController.js"
import { Impact } from "../types/game.type.js"

const MaxTangenteSpeed = 0.2

export class Player
{
	readonly index: number
	readonly nbPlayer: number
	readonly minAngle: number
	readonly maxAngle: number
	readonly defaultAngle: number

	angle: number
	paddleSize: number
	score: number
	tangenteSpeed = 0

	constructor(
		index: number,
		nbPlayer: number,
		public readonly controller: PlayerController
	)
	{
		this.index = index
		this.nbPlayer = nbPlayer
		this.paddleSize = 0.25 * Math.PI / nbPlayer
		this.score = Math.round(10 / nbPlayer)

		const twoPi = (2 * Math.PI) / nbPlayer
		this.minAngle = index * twoPi
		this.maxAngle = (index + 1) * twoPi
		this.defaultAngle = this.minAngle + twoPi / 2
		this.angle = this.defaultAngle
	}

	update(predictions: Impact[])
	{
		const action : PlayerAction = this.controller.getInput(predictions)

		if (action === "idle") this.decreaseTangenteSpeed()
		else if (action === "left") this.incrementAngle()
		else if (action === "right") this.decrementAngle()
	}

	resetAngle()
	{
		this.angle = this.defaultAngle
		this.tangenteSpeed = 0
	}

	private decreaseTangenteSpeed()
	{
		if (this.tangenteSpeed > 0.02) this.tangenteSpeed -= 0.02
		if (this.tangenteSpeed < -0.02) this.tangenteSpeed += 0.02
	}

	private decrementAngle()
	{
		this.angle -= 0.05
		if (this.angle - this.paddleSize < this.minAngle)
			this.angle = this.minAngle + this.paddleSize
		this.tangenteSpeed = Math.min(this.tangenteSpeed + 0.02, MaxTangenteSpeed)
	}

	private incrementAngle()
	{
		this.angle += 0.05
		if (this.angle + this.paddleSize > this.maxAngle)
			this.angle = this.maxAngle - this.paddleSize
		this.tangenteSpeed = Math.max(this.tangenteSpeed - 0.02, -MaxTangenteSpeed)
	}
}
