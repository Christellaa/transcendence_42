async function loadPage(route) {
	const location = `/${route || ''}`
	const res = await fetch(location, { headers: { type: 'hydrate' } })
	const html = await res.text()
	const parser = new DOMParser()
	const htmlDoc = parser.parseFromString(html, 'text/html')

	updateDom(htmlDoc)
}

function updateDom(htmlDoc) {
	const $mainPage = document.querySelector('page')
	const $htmlDocPage = htmlDoc.querySelector('page')
	const $htmlDocTitle = htmlDoc.querySelector('head title')
	const $htmlDocStyle = htmlDoc.querySelector('head style')
	const $htmlDocScript = htmlDoc.querySelector('body script[type="module"]')

	if ($htmlDocTitle) document.title = $htmlDocTitle.innerHTML

	updateStyleModule($htmlDocStyle)

	if ($mainPage && $htmlDocPage) {
		$mainPage.innerHTML = $htmlDocPage.innerHTML
		$mainPage.setAttribute('type', $htmlDocPage.getAttribute('type'))
	}

	runFunction($htmlDocScript)
}

function updateStyleModule(htmlDocStyle) {
	const $head = document.querySelector('head')

	$head.querySelectorAll('style[module]').forEach($el => $el.remove())
	$head.appendChild(htmlDocStyle)
}

function runFunction(htmlDocScript) {
	if (htmlDocScript) {
		const newScript = document.createElement('script')

		if (htmlDocScript.type) newScript.type = htmlDocScript.type
		if (htmlDocScript.src) {
			newScript.src = htmlDocScript.src
		} else {
			newScript.textContent = htmlDocScript.textContent
		}
		document.body.appendChild(newScript)
	}
}

async function navigate(route) {
	history.pushState({}, '', `/${route}`)
	await loadPage(route)
}

window.addEventListener('popstate', () => {
	const route = location.pathname.replace('/', '') || ''
	loadPage(route)
})

document.addEventListener('DOMContentLoaded', _ => {
	document.body.addEventListener('click', e => {
		const target = e.target.closest('a[data-route]')
		if (target) {
			e.preventDefault()
			navigate(target.getAttribute('data-route'))
		}
	})
})
