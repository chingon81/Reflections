### Reflections

### Overview

### Local Setup
1. Clone Repo
2. ```npm install``` in the root directory
3. ```npm run react``` and ```npm run server```
4. create react app will manage reloading the page for you upon edits, nodemon will reload the server upon changes
5. setup ENV variables as follows
```
BUILD = dev
```

### env variables 
```
BUILD = DEV or PROD
LOGIN_API_ID = LOGIN SLACK APP API ID
LOGIN_CLIENT_ID = LOGIN SLACK APP CLIENT ID
LOGIN_CLIENT_SECRET = LOGIN SLACK APP CLIENT SECRET
LOGIN_CLIENT_VERIFICATION = LOGIN SLACK APP CLIENT CERIFICATION
SLACK_CLIENT_ID = BOT CLIENT ID
SLACK_CLIENT_SECRET = BOT CLIENT SECRET
SLACK_VER_TOKEN = BOT CLIENT CERIFICATION TOKEN
SLACK_OAUTH = SLACK OAUTH
BOT_OAUTH = SLACK BOT OAUTH
POSTGRESQL_AUTH = POSTGRES CONNECTION STRING
BOT_USER_OAUTH = SLACK BOT OAUTH
```
### Production
1. NPM INSTALL
2. SET BUILD VARIABLE TO PROD
3. CHANGE SLACK REDIRECT IN CLIENT/SRC/COMPONENTS/LOGIN AND SERVER/ROUTES/SLACK/AUTH.JS
3. ```NPM RUN PROD```

## Authors

- [**Alex Donesky**](https://github.com/adonesky1)
- [**Jacob Johnston**](https://github.com/johnstonjacob)
- [**Calvin Chui**](https://github.com/snyperifle)
