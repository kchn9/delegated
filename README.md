<img src="https://iili.io/HdulBGS.png" alt="HdulBGS.png" height="150" border="0"/>

# Delegated

Delegated is app that allow users to track their buisness trips, calculate per diem and watch trips on world map.
App has been succesfully deployed to _fly.io_.

### Check it live

https://delegated-app.fly.dev

![Delegated demo](https://media.giphy.com/media/iOXFkxErns3u66NkXL/giphy.gif)

## Tech Stack

**front-end:** Vite (React + Javascript), styled-components

**back-end:** Node (nodemon, bcrypt, jsonwebtoken), Express, MongoDB (mongoose)

**tests:** Jest, supertest

## Installation

Install delegated with npm

```bash
  git clone https://github.com/kchn9/delegated.git
  cd delegated/frontend
  npm i
  cd ..
  npm i
```

Create **.env** file in root folder:

```bash
  touch .env
```

_(example)_

```j
    PORT=8080
    MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.aa0okx6.mongodb.net/delegations?retryWrites=true&w=majority
    TEST_MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.aa0okx6.mongodb.net/?retryWrites=true&w=majority
    JWT_KEY=examplekey
```

Then simply run dev:

```bash
  npm run dev
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
