import { UserStore } from '../stores/user.store'

const $page: HTMLElement = document.querySelector('page[type=update_profile]')!
const $usernameInput: HTMLInputElement = document.querySelector('input[name="username"]')!

const unsubUserStore = UserStore.subscribe(value => {
	console.log(value)
	console.log(($usernameInput.placeholder = value.login))
})

const cleanPage = () => {
	$page.removeEventListener('cleanup', cleanPage)
	unsubUserStore()
}

$page.addEventListener('cleanup', cleanPage)
