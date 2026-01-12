import { StateStore } from './state.store'

type Subscriber = (user: UserType) => void

export type UserType = {
	email: string
	username: string
	isValid: boolean
}

let user: any = {
	email: '',
	username: '',
	get isValid() {
		return Boolean(this.email && this.username)
	}
}

function createUserStore() {
	const subscribers = new Set<Subscriber>()

	function subscribe(fn: Subscriber) {
		subscribers.add(fn)
		fn(user)
		return () => subscribers.delete(fn)
	}

	function emit(newUser: UserType) {
		if (!newUser) return
		user.email = newUser.email
		user.username = newUser.username

		StateStore.update({ username: user.username })

		for (const fn of subscribers) fn(user)
	}

	return { subscribe, emit }
}

declare global {
	interface Window {
		UserStore?: ReturnType<typeof createUserStore>
	}
}

export const UserStore = (window.UserStore ??= createUserStore())
