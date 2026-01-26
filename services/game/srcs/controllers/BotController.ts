import type { PlayerController, PlayerAction } from "./PlayerController.js"
import type { Impact } from "../types/game.type.js"

export class BotController implements PlayerController
{
	constructor(
		private readonly minAngle: number,
		private readonly maxAngle: number,
		private readonly paddleSize: number,
		private readonly defaultAngle: number
	) {}

	isHuman(): boolean
	{
		return false
	}

	getInput(predictions: Impact[]): PlayerAction
	{
		let target = this.defaultAngle

		for (const pr of predictions)
		{
			if (pr.theta > this.minAngle && pr.theta < this.maxAngle)
			{
				target = pr.theta
				break
			}
		}

		if (target < this.defaultAngle - this.paddleSize / 2)
			return "left"

		if (target > this.defaultAngle + this.paddleSize / 2)
			return "right"

		return "idle"
	}
}
