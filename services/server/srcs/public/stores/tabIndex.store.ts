type Subscriber = (tabIndex: number) => void

let currentTabIndex = 0

export const TabIndexStore = (function () {
	const subscribers = new Set<Subscriber>()

	function subscribe(fn: Subscriber) {
		subscribers.add(fn)
		return () => subscribers.delete(fn)
	}

	function emit(tabIndex: number) {
		for (const fn of subscribers) fn(tabIndex)
	}

	function reset() {
		currentTabIndex = 0
		emit(currentTabIndex)
	}

	return { subscribe, emit, reset }
})()
