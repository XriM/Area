# Epitech Area
> *This is an Epitech 3rd-year project.*

## About
| Url                                                               | Version | Contact                                                                       | Terms of Service                                                        | License                                                                 |
| ----------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| [127.0.0.1:8080/](http://127.0.0.1:8080/ "API url") | 1.0.0   | [area@epitech.eu](mailto:julian.ladjani@epitech.eu "Contact Email") | [http://swagger.io/terms/](http://swagger.io/terms/ "Terms of Service") | [Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0.html "License") |

## Introduction 👋

The goal of this project is to make a dashboard-style web app to gather feeds from multiple external APIs and centralize them into one interface.

The application is similar to [Netvibes](https://www.netvibes.com/fr)


## The project 🚀

**The project is organized in three parts:**
1. The client_mobile is located under `flutter/`
2. The client_web is located under `client/`
2. The back-server is located under `server/`

## Technologies used ⚙️
- Docker
- Server:
    - JavaScript
    - Express-JS
    - Eslint
    - Swagger
- DB:
    - Postgresql
- Client Web:
    - React
    - React-bootstrap
    - TypeScript
- Mobile:
    - flutter

## Prerequisites

- Docker 🐳
- Android SDK / Xcode

## How to launch the project? 📲

1. Clone the project: `git clone https://github.com/XriM/area`

Then run the following commands to start the app.

```bash
./script.sh
```
Or
```bash
docker-compose --env-file ./backend/.env up --build
```

## Contributors

API (back-end):
- [Briann Gerbaux](https://github.com/)
- [Maxime Sarrès](https://github.com/XriM)

Client mobile:
- [David Nikolic](https://github.com/)

Client web:
- [Jefferson Guiot](https://github.com/jeffersongt)


## Technical part

- services:
    - youtube
    - outlook / onedrive
    - weather
    - steam
    - trello
    - bourse/crypto
    - reddit
    - github
    - discord
- actions reactions:
    - email (action) ✅
    - meteo ville (action) ✅ OK
    - crypto (action) ✅ OK
    - joueurs steam (action) ✅ OK
    - onedrive (action) ✅
    - github (action) ✅ OK
    - youtube (action) ✅ OK
    - reddit (action) ✅ OK
    - carte trello (reaction) ✅
    - outlook send (reaction) ✅
    - discord webhook (reaction) ✅ OK
    - github (reaction) ✅
- connexion:
    - basic auth
    - oauth2 → google

## Routes

# POST /users/signup

---

### Body:

---

```json
{
	email: "test.area@outlook.fr",
	username: "areaTest",
	password: "mypassword"
}
```

### Responses:

---

- Response when signup request is successfull (Status code: 200):

```json
{
	message: "Account created!"
}

```

- Response when signup request failed because an email address is already in use (Status code: 400):

```json
{
	message: "Email address already in use!"
}
```

- Response when signup request failed for other reasons (missing a field, wrong email format... Status code: 400):

```json
{
	message: "Failed to create an account!"
}
```
# POST /users/login

---

### Body:

```json
{
	email: "test.area@outlook.fr",
	password: "mypassword"
}
```

### Responses:

---

- Response when user successfully logged in (status code: 200):

```json
{
	token: "cjhdbfb76579yazdbhzebfd",
	message: "Successfully logged in!",
	username: "username"
}
```

- Response when user password is wrong (status code: 400):

```json
{
	message: "Wrong password!"
}
```

- Response when email doesn’t exist (status code: 400):

```json
{
	message: "Email doesn't exist!"
}
```

- Response when signin request failed for other reasons (missing a field, wrong email format... Status code: 400):

```json
{
	message: "Failed to log in!"
}
```

# POST /users/logout

---

### Header:

```json
{
	Authorization: "Bearer cjhdbfb76579yazdbhzebfd"
}
```

### Responses:

- Response when request succeded

```json
{
	message: "Successfully logged out!"
}
```

- Response when request failed because no token was passed (status code: 401):

```json
{
	message: "You need to signin to an account!"
}
```

- Response when request failed because the token is invalid or expired (status code: 498):

```json
{
	message: "Invalid token!"
}
```

# GET /users

---

### Header:

```json
{
	Authorization: "Bearer cjhdbfb76579yazdbhzebfd"
}
```

### Responses:

---

- Response when request suceeded (status code: 200):

```json
{
	users: [
		{
			username: "maxime"
		},
		{
			username: "david"
		},
		{
			username: "briann"
		},
		{
			username: "jeff"
		},
	]
}
```

- Response when request failed because no token was passed (status code: 401):

```json
{
	message: "You need to signin to an account!"
}
```

- Response when request failed because the token is invalid or expired (status code: 498):

```json
{
	message: "Invalid token!"
}
```

# GET /users/:id

---

### Header:

```json
{
	Authorization: "Bearer cjhdbfb76579yazdbhzebfd"
}
```

### Responses:

---

- Response when request succeeded

```json
{
	username: "david",
	email: "david@area.com"
}
```

- Response when request failed because no token was passed (status code: 401):

```json
{
	message: "You need to signin to an account!"
}
```

- Response when request failed because the token is invalid or expired (status code: 498):

```json
{
	message: "Invalid token!"
}
```

# PATCH /users/:id

---

### Header:

```json
{
	Authorization: "Bearer cjhdbfb76579yazdbhzebfd"
}
```

### Bodies:

```json
{
	email: "test@area.fr"
}
```

```json
{
	password: "myNewPassword"
}
```

```json
{
	username: "myNewUsername"
}
```

```json
{
	email: "my.newEmail@area.fr",
	password: "myNewPassword",
	username: "myNewUsername"
}
```

### Responses:

- Response when request succeeded

```json
{
	message: "User profile successfully modified!"
}
```

- Response when no fields are specified (status code: 401):

```json
{
	message: "No fields specified!"
}
```

- Response when request failed because no token was passed (status code: 401):

```json
{
	message: "You need to signin to an account!"
}
```

- Response when request failed because the token is invalid or expired (status code: 498):

```json
{
	message: "Invalid token!"
}
```

# DELETE /users/:id

---

### Header:

```json
{
	Authorization: "Bearer cjhdbfb76579yazdbhzebfd"
}
```

### Responses:

- Response when request succeded

```json
{
	message: "Successfully deleted user"
}
```

- Response when request failed because no token was passed (status code: 401):

```json
{
	message: "You need to signin to an account!"
}
```

- Response when request failed because the token is invalid or expired (status code: 498):

```json
{
	message: "Invalid token!"
}
```

# GET /users/:id/services

---

### Header:

```json
{
	Authorization: "Bearer cjhdbfb76579yazdbhzebfd"
}
```

### Responses:

- Response when request is successfull (status code: 200)

```json
{
	services: [
		{
			name: "AccuWeather"
		},
		{
			name: "Google Calendar"
		},
		{
			name: "Gmail"
		}
	]
}
```

- Response when request failed because no token was passed (status code: 401):

```json
{
	message: "You need to signin to an account!"
}
```

- Response when request failed because the token is invalid or expired (status code: 498):

```json
{
	message: "Invalid token!"
}
```

# GET /users/:id/services/:id

---

### Header:

```json
{
	Authorization: "Bearer cjhdbfb76579yazdbhzebfd"
}
```

### Responses:

- Response when request is successfull (status code: 200)

```json
{
	name: "Google Calendar",
	actions_id: [
		{
			id: 1
		},
		{
			id: 4
		},
		{
			id: 5
		},
	],
	reactions_id: [
		{
			id: 3
		},
		{
			id: 6
		},
		{
			id: 8
		},
	],
	token: "fenfnzef987vdgzefbehfl"
}
```

- Response when request failed because no token was passed (status code: 401):

```json
{
	message: "You need to signin to an account!"
}
```

- Response when request failed because the token is invalid or expired (status code: 498):

```json
{
	message: "Invalid token!"
}
```

# PATCH /users/:id/services/:id

---

### Header:

```json
{
	Authorization: "Bearer cjhdbfb76579yazdbhzebfd"
}
```

### Body:

```json
{
	token: "dvcdzcdjzlcb678edhzfjdknzed"
}
```

### Responses:

- Response when request succeeded (status code: 200)

```json
{
	message: "Service token successfully loaded!"
}
```

- Response when request failed because no token was passed (status code: 401):

```json
{
	message: "You need to signin to an account!"
}
```

- Response when request failed because the token is invalid or expired (status code: 498):

```json
{
	message: "Invalid token!"
}
```

# POST /users/:username/services/:id

---

### Header:

```json
{
	Authorization: "Bearer cjhdbfb76579yazdbhzebfd"
}
```

### Body (optionnal):

```json
{
	token: "dvcdzcdjzlcb678edhzfjdknzed"
}
```

### Responses:

- Response when request succeeded (status code: 200)

```json
{
	message: "Service token successfully loaded!"
}
```

- Response when request failed because no token was passed (status code: 401):

```json
{
	message: "You need to signin to an account!"
}
```

- Response when request failed because the token is invalid or expired (status code: 498):

```json
{
	message: "Invalid token!"
}
```

# PATCH /users/:id/services/:id

---

### Header:

```json
{
	Authorization: "Bearer cjhdbfb76579yazdbhzebfd"
}
```

# GET /users/:username/areas

---

### Header:

```json
{
	Authorization: "Bearer <token>"
}
```

a

### Responses:

- Response when request succeeded (status code: 200):

```json
{
	"areas": [
		{
			"id": 1,
		  "name": "Area 1",
			"action": {
			  "id": 6,
			  "name": "Steam players changed"
			},
			"reaction": {
				"id": 1,
				"name": "Send email"
			}
		},
		{
			"id": 2,
			"name": "Area 2",
			"action": {
				"id": 6,
				"name": "Steam players changed"
			},
			"reaction": {
				"id": 1,
				"name": "Send email"
			}
		}
	]
```

- Response when request failed because no token was passed (status code: 401):

```json
{
	message: "You need to signin to an account!"
}
```

- Response when request failed because the token is invalid or expired (status code: 498):

```json
{
	message: "Invalid token!"
}
```

# POST /users/:username/areas

---

### Header:

```json
{
	Authorization: "Bearer chbzhfbzef"
}
```

### Body (the config parameter is optional):

```json
{
	action_id: 1,
	reaction_id: 1,
	name: "area name",
	config:{
		param1: "value1",
		param2: "value2"
	}
}
```

### Responses:

- Response when request succeeded (status code: 200)

```json
{
	message: "Area successfully created!"
}
```

- Response when request failed because no token was passed (status code: 401):

```json
{
	message: "You need to signin to an account!"
}
```

- Response when request failed because the token is invalid or expired (status code: 498):

```json
{
	message: "Invalid token!"
}
```

service Table

| ID PRIMARY KEY | NAME VARCHAR |
| --- | --- |
|  |  |
|  |  |

action Table

| ID PRIMARY KEY | NAME VARCHAR |
| --- | --- |
|  |  |
|  |  |

reaction Table

| ID PRIMARY KEY | NAME VARCHAR |  |
| --- | --- | --- |
|  |  |  |
|  |  |  |

area Table

| ID PRIMARY KEY | ACTION_ID (Foreign key) | REACTION_ID (Foreign Key) |  |
| --- | --- | --- | --- |
|  |  |  |  |
|  |  |  |  |

service_reaction Table

| ID PRIMARY KEY | SERVICE_ID FOREIGN KEY(Service) | TRIGGER_ID FOREIGN KEY(Trigger) |
| --- | --- | --- |
|  |  |  |
|  |  |  |

users Table

| ID PRIMARY KEY | EMAIL VARCHAR | USERNAME VARCHAR | PASSWORD? VARCHAR |
| --- | --- | --- | --- |
|  |  |  |  |
|  |  |  |  |

user_service table

| ID PRIMARY KEY | USER_ID FOREIGN KEY(User) | SERVICE_ID FOREIGN KEY(Service) | TOKEN? VARCHAR |
| --- | --- | --- | --- |
|  |  |  |  |
|  |  |  |  |

user_area Table

| ID PRIMARY KEY | USER_ID FOREIGN KEY(User) | TRIGGER_ID FOREIGN KEY(Trigger) | CONFIG VARCHAR (json) |
| --- | --- | --- | --- |
|  |  |  |  |
|  |  |  |  |

# JSON front to back


Weather  (action):

```json
{
	"city": "Ville_à_surveiller"
	"temp_min": "température_min_à_surveiller"
	"temp_max": "température_max_à_surveiller"
}
```

Crypto (action):

```json
{
	"crypto": "pair_à_surveiller"
	"value_min": "valeur_mini_à_surveiller"
	"value_max": "valeur_max_à_surveiller"
}
```

owGitHub (action):

au lieu d’envoyer le token il faut envoyer le code à “POST /users/:username/services/:id” avec ce body:

```json
{
	"token": "code"
}
```

     ensuite pour le JSon config:

```json
{
	"github": "repo_a_surveiller"
	"owner": "owner_du_repo"
}
```

GitHub (reaction): 

```json
{
	"github": "repo_pour_issue"
	"owner": "owner_du_repo"
	"title": "titre_de_lissue"
	"message": "message_de_lissue"
}
```

Outlook (action):

```json
{
	"email": "email.à.surveiller@epitech.eu"
}
```

Outlook (reaction):

```json
{
	"to": [
		"briann.gerbaux@epitech.eu",
		"david.nikolic@epitech.eu"
	],
	"cc": [
		"maxime.sarres@epitech.eu",
		"jefferson.guiot@epitech.eu"
	],
	"subject": "my subject (objet)"
	"message": "Mon message (text)"
}
```

OneDrive (action):

```json
{
	"drive": "le dossier onedrive que tu veux surveiller (vide si tu veux surveiller le root)"
}
```

Trello (reaction):

```json
{
	"idBoard": "azertytreza",
	"idList": "this format : 61813589d337958524eec066",
	"name": "title",
	"description": "message",
}
```

Discord (reaction):

exemple d’URL webhook: “[https://discord.com/api/webhooks/947890664128016516/4lI_Gz_Fr5gU0pafNv9639HoxlhQWFuhoQ2BsKRugdVpSq8eggIMH2xw3sZsm-hC4ZlV](https://discord.com/api/webhooks/947890664128016516/4lI_Gz_Fr5gU0pafNv9639HoxlhQWFuhoQ2BsKRugdVpSq8eggIMH2xw3sZsm-hC4ZlV)”

l’id du webhook: “[947890664128016516](https://discord.com/api/webhooks/947890664128016516/4lI_Gz_Fr5gU0pafNv9639HoxlhQWFuhoQ2BsKRugdVpSq8eggIMH2xw3sZsm-hC4ZlV)” (première partie du lien)

token du webhook: “[4lI_Gz_Fr5gU0pafNv9639HoxlhQWFuhoQ2BsKRugdVpSq8eggIMH2xw3sZsm-hC4ZlV](https://discord.com/api/webhooks/947890664128016516/4lI_Gz_Fr5gU0pafNv9639HoxlhQWFuhoQ2BsKRugdVpSq8eggIMH2xw3sZsm-hC4ZlV)” (deuxième partie du lien)

```json
{
	"discord": "webhook_url_id",
	"url_token": "webhook_url_token"
}
```

Steam (action):

```json
{
	"steam": "app_id",
	"players_min": "players_min_for_trigger"
	"players_max": "players_max_for_trigger"
}
```

Youtube (action):

Rien faut juste que l’user se connecte

Reddit (action):

```json
{
	"subreddit": "r/france",
}
```

# Liste des ID:

### Actions:

id: 1, name: 'Received email'
id: 2, name: 'Youtube subscribers changed'
id: 3, name: 'Subreddit subscriber'
id: 4, name: 'Github repo starred'
id: 5, name: 'Weather changed'
id: 6, name: 'Steam players changed'
id: 7, name: 'CryptoCurrency price changed'
id: 8, name 'File added'

### Reactions:

id: 1, name: 'Send email'
id: 2, name: 'Add trello card'
id: 3, name: 'Send Git issue'
id: 4, name: 'Send Discord message’

### Services:

id: 1, name, 'Trello
id: 2, name: 'Reddit'
id: 3, name: 'Discord'
id: 4, name: 'Weather'
id: 5, name: 'Crypto'
id: 6, name: 'GitHub'
id: 7, name: 'Outlook'
id: 8, name: 'Steam'
id: 9, name: 'Youtube'