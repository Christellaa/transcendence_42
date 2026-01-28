import { json_stringify } from "./json_wrapper"

export type MatchTypeToSave = {
    matchType: 'tournament' | 'classic' | 'duel',
    players: {username: string, gameRes: "win" | "lose"}[]
}

export async function saveMatchFromGameService(match : MatchTypeToSave)
{
    const res = await fetch('http://server:3000/add_match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: json_stringify(match)
    })
    if (res.status >= 400) console.log('Error saving match')
}
