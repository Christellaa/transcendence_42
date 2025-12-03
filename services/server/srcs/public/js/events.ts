import { KeyboardStore } from '../stores/keyboard.store.js'

document.addEventListener('keyup', (evt: KeyboardEvent) => {
	KeyboardStore.emit({
		key: evt.key,
		isShift: evt.shiftKey
	})
})
