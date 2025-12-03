export type KeyboardKeyEvent = {
	key: string
	isShift: boolean
}

type Subscriber = (keyboardKeyEvent: KeyboardKeyEvent) => void

export const KeyboardStore = (function () {
	const subscribers = new Set<Subscriber>()

	function subscribe(fn: Subscriber) {
		subscribers.add(fn)
		return () => subscribers.delete(fn)
	}

	function emit(keyboardKeyEvent: KeyboardKeyEvent) {
		for (const fn of subscribers) fn(keyboardKeyEvent)
	}

	return { subscribe, emit }
})()
