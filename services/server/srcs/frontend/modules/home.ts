import { CurrentButtonStore } from '../stores/current_button.store'
import { KeyboardStore } from '../stores/keyboard.store'
import { UserStore, type UserType } from '../stores/user.store'
import { navigate } from '../js/routing'
import { StateStore } from '../stores/state.store'
import { PageUpdateStore } from '../stores/page_state'
import { ChatStore } from '../stores/chat.store'
import { GameStore } from '../stores/game.store'
import { NotificationStore } from '../stores/notification.store'

type LoginButtonValues = {
	[key: string]: {
		id: string
		inner: string
		route: string
		next: string
	}
}

const loginButtonValues: LoginButtonValues = {
	registerButton: {
		id: 'registerButton',
		inner: 'Register',
		route: 'register',
		next: 'loginButton'
	},
	loginButton: {
		id: 'loginButton',
		inner: 'Login',
		route: 'login',
		next: 'registerButton'
	}
}

const $page: HTMLElement = document.querySelector('page[type=index]')!
const $loginButton: HTMLElement = document.querySelector('nav-button[data-route="login"]')!
const $logoutButton: HTMLElement = document.getElementById('logout_btn')!
const $loginButtonParent: HTMLElement = $loginButton.parentElement!
const $logoutButtonParent: HTMLElement = $logoutButton.parentElement!
let currentButton: HTMLElement

$logoutButton.addEventListener('click', async () => {
	await fetch('/logout', {
		method: 'POST',
		credentials: 'include'
	})
	ChatStore.removeWebsocket()
	GameStore.removeWebGameSocket()
	UserStore.clear()
	navigate('')
})

async function saveMatch() {
	const res = await fetch('/add_match', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			matchType: 'classic',
			players: [
				{
					username: 'alice',
					gameRes: 'win'
				},
				{
					username: 'bob',
					gameRes: 'lose'
				},
				{
					username: 'trent',
					gameRes: 'lose'
				},
				{
					username: 'carol',
					gameRes: 'lose'
				}
			]
		})
	})
	if (res.status >= 400) NotificationStore.notify('Error saving match', 'ERROR')
}

const unsubCurrentButtonStore = CurrentButtonStore.subscribe(el => (currentButton = el))

const unsubKeyStore = KeyboardStore.subscribe(key => {
	if (['ArrowLeft', 'ArrowRight'].includes(key.value)) {
		const nextValue = loginButtonValues[loginButtonValues[currentButton.id]?.next]

		if (nextValue) {
			const $navLeft = document.createElement('nav-left')
			const $navRight = document.createElement('nav-right')
			const $span = document.createElement('span')

			$navLeft.innerText = ' < '
			$navRight.innerText = ' > '
			$span.innerText = nextValue.inner
			currentButton.innerText = ''

			currentButton.appendChild($navLeft)
			currentButton.appendChild($span)
			currentButton.appendChild($navRight)

			currentButton.id = nextValue.id
			currentButton.dataset.route = nextValue.route
		}
	}
})

let $elementBackup: HTMLElement | null = null

const unsubUserStore = UserStore.subscribe((user: UserType) => {
	if (user.isValid) {
		if ($elementBackup) $logoutButtonParent.appendChild($elementBackup)
		$elementBackup = $loginButton
		$loginButton.remove()

		StateStore.update({ username: user.username })
		PageUpdateStore.emit('user valid')
	} else {
		if ($elementBackup) $loginButtonParent.appendChild($elementBackup)
		$elementBackup = $logoutButton
		$logoutButton.remove()
		PageUpdateStore.emit('user invalid')
	}
})

const cleanPage = () => {
	$page.removeEventListener('cleanup', cleanPage)
	unsubCurrentButtonStore()
	unsubKeyStore()
	unsubUserStore()
}

$page.addEventListener('cleanup', cleanPage)
