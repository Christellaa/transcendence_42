import type { PlayerController, PlayerAction } from "./PlayerController.js"
import type { Impact } from "../types/game.type.js"
import type User from "../classes/User.js"

export class HumanController implements PlayerController
{
	constructor(private user: User) {}

	isHuman(): boolean
	{
		return true
	}

	getInput(_: Impact[]): PlayerAction
	{
		const key = this.user.key
		this.user.key = "none"

		if (key === "+") return "right"
		if (key === "-") return "left"
		return "idle"
	}
}
