import type { Impact } from "../types/game.type.js"

export type PlayerAction = "left" | "right" | "idle"

export interface PlayerController
{
	getInput(predictions: Impact[]): PlayerAction
	isHuman(): boolean
}
