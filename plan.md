150 POINTS!!!!! 🥳🥳🥳🥳
Add responsive
Add SEO

Send proper constraint message from backend
	auth.route.ts > line 86

When updating profile name, chat gets messed up
	Fix, close previous socket, and refresh front edn socket

Chat Click Block User:
	User blocking is notified if user properly blocked or error
	
	If the Blocked user send an mp to User Blocking, send a notification that the user has blocked him/her

	When Loading chat room, show the blocked user as blocked in user list

Chat Click Unblock User:
	User unblocking is notified if user properly unblocked or error

Chat click remove friend:
	Notify user requesting that friendship is now removed

Login:
	Still a bunch of visual issues showing the wrong elements
	When login in with 42 auth and not in db -> Interface is messed up (shows user form and block to log in 42oauth at the same time)
	When pressing login with the form or 42oauth and not registered, add a notification stating that the user isn't registered

Lobby:
	Player clicks on join game
		if remote:
			bind socket user socket to game
			Host goes to waiting list

Remote 1v1

Friends:
	Create remove and mp buttons (friends page)
	Access other player information

BLOQUER ACCES USER (a faire):
- pas registered:
	+ friends
	+ others' match history
+ dans le waf

login -> make -> refresh -> username not shown in home -> move to another page -> come back to home -> user shown

close socket when same user is chatting (double private window same user connected)