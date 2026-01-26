import { GameStore } from "../stores/game.store.ts"
import { LobbyStore } from "../stores/lobby.store.ts"

const list = document.getElementById("game-list")!
const duelDiv = document.getElementById("duels")!

LobbyStore.subscribe(({ gamePendings }) =>
{
	list.innerHTML = ""

	for (const game of gamePendings)
	{
		const li = document.createElement("li")
		li.textContent = `Game ${game.id} (${game.nbPlayerReady}/${game.nbPlayerMax})`
		li.style.cursor = "pointer"

		li.onclick = () =>
		{
			GameStore.send({
				type: "join-game",
				sessionId: game.id
			})
		}

		list.appendChild(li)
	}
})

LobbyStore.subscribe(({ duels }) =>
{
	duelDiv.innerHTML = ""

	for (const duel of duels)
	{
		const row = document.createElement("div")
		row.textContent = `${duel.from} wants to duel you `

		const accept = document.createElement("button")
		accept.textContent = "Accept"
		accept.onclick = () =>
		{
			GameStore.send({
				type: 'duel',
				to: duel.from,
				action: 'accept'
			})
			LobbyStore.removeDuel(duel.from)
		}

		const decline = document.createElement("button")
		decline.textContent = "Decline"
		decline.onclick = () =>
		{
			GameStore.send({
				type: 'duel',
				to: duel.from,
				action: 'decline'
			})
			LobbyStore.removeDuel(duel.from)
		}

		row.appendChild(accept)
		row.appendChild(decline)
		duelDiv.appendChild(row)
	}
})

