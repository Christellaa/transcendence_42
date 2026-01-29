import { navigate } from '../js/routing'
import { PageUpdateStore } from '../stores/page_state'

export function redirectIfAuthenticated() {
	fetch('/get_payload', {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(async res => {
		const payload = await res.json()
		if (payload) navigate('')
	})
}

export function redirectIfNotAuthenticated() {
	fetch('/get_payload', {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(async res => {
		const payload = await res.json()
		if (!payload) navigate('')
	})
}

export function inertForm(form: HTMLElement, toInert: boolean) {
	form.querySelectorAll('form-section *[tabindex]').forEach(el => {
		if (toInert === true) {
			el.setAttribute('inert', 'true')
		} else {
			el.removeAttribute('inert')
		}
	})

	const $formType = form.getAttribute('type') === 'login' ? 'login form' : 'register form'
	PageUpdateStore.emit($formType)
}