async function loadPage(route) {
	const app = document.getElementById('app')
	const location = `/${route || ''}`
	const res = await fetch(location, { headers: { type: 'hydrate' } })
	const html = await res.text()
	console.log(html)
	const parser = new DOMParser()
	const doc = parser.parseFromString(html, 'text/html')
	const newAppBody = doc.querySelector('body page')
	const newAppStyle = doc.querySelector('temp-style')
	const newAppTitle = doc.querySelector('title').innerText

	if (newAppTitle) document.title = newAppTitle

	document.querySelectorAll('head temp-style').forEach(el => el.remove())
	
	if (newAppStyle) {
		const $head = document.querySelector('head')
		$head.append(newAppStyle)
	}

	if (res) {
		app.innerHTML = ''
		app.appendChild(newAppBody)
	} else console.log(location)
}

async function navigate(route) {
	history.pushState({}, '', `/${route}`)
	await loadPage(route)
}

window.addEventListener('popstate', () => {
	const route = location.pathname.replace('/', '') || ''
	loadPage(route)
})

document.addEventListener('DOMContentLoaded', () => {
	// loadPage(location.pathname.replace('/', '') || '')

	document.body.addEventListener('click', e => {
		const target = e.target.closest('a[data-route]')
		if (target) {
			e.preventDefault()
			navigate(target.getAttribute('data-route'))
		}
	})
})
