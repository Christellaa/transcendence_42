const langs = ['En', 'Fr', 'Es']

function updateLanguage(origin: 'init' | 'event') {
	const $languageOption = document.querySelector('span[data-action="updateLanguage"]') as HTMLSpanElement
	const currentOption: number | undefined = Number($languageOption?.dataset?.currentoption)
	let lang

	if (currentOption !== undefined) lang = langs[currentOption] || langs[0]

	if (origin === 'init') lang = localStorage.getItem('lang')

	$languageOption.innerText = `Language (${lang})`
	localStorage.setItem('lang', lang)
}

function handleOptionClick(evt: any) {
	let dataset = evt.target.dataset

	if (dataset.action === 'updateLanguage') updateLanguage('event')
}

export function initOptionEvents() {
	document.querySelectorAll<HTMLElement>('span.traverse').forEach($el => {
		$el.addEventListener('click', handleOptionClick)
	})
	updateLanguage('init')
}

export function cleanOptionEvents() {
	document.querySelectorAll<HTMLElement>('span.traverse').forEach($el => {
		$el.removeEventListener('click', handleOptionClick)
	})
}
