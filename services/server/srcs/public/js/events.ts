import { KeyboardStore } from '../stores/keyboard.store.js'

document.addEventListener('keydown', (evt: KeyboardEvent) => {
	KeyboardStore.emit({
		value: evt.key,
		isShift: evt.shiftKey
	})
})
