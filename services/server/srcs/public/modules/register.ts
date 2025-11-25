console.log('This is register')

/////////// REGISTER ///////////
fetch('/register', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify({
		name: '2',
		pwd: 'password123',
		checkpwd: 'password123',
		email: '2@example.com',
		checkmail: '2@example.com',
		username: '2'
	})
})
	.then(res => res.json())
	.then(data => console.log('Register response:', data))
