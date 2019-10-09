# Pingu [![Actions Status](https://github.com/ikenami/pingu/workflows/build/badge.svg)](https://github.com/ikenami/pingu/actions)

Pingu is a slack chatbot in TypeScript that runs on Heroku.

:construction: This is a work in progress. (ﾉ◕ヮ◕)ﾉ\*:･ﾟ✧

## Groceries

- NodeJs `v12.10.0`
- Slack App (gotta create one if you haven't)
- Heroku (optional, but that's what I'm using)
- Github Actions (optional, but advisable)

This app uses [:zap: Bolt](https://github.com/SlackAPI/bolt)

## Integrations

- [x] Trello (`in progress`)
- [x] Github (`in progress`)
- [ ] Bitbucket

## Starting the App

Before running the app, you gotta set the environment variables with your Slack App credentials stuff (you can check `.env.example`).

## Github App

create a [github token](https://github.com/settings/tokens)
give note a descriptive name (e.g. `Pingu`)
and the `repo` scope
copy the token to the local `.env` file

#### Run local

```bash
npm install
> yada yada installing stuff yada yada

npm start
> Bwahahahaha, Pingu is alive (✧ω✧)
```

#### Run on server

Just tell it to do `npm start` and the bot will be ready (aka `Procfile`).

## Bugs or Requests?

Feel free to open an issue and I may look into it when I feel like it. c:
