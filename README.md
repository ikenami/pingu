# Pingu [![Actions Status](https://github.com/ikenami/pingu/workflows/build/badge.svg)](https://github.com/ikenami/pingu/actions)

Pingu is a slack chatbot in TypeScript that runs on Heroku.

:construction: This is a work in progress. (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧

## What Pingu does

- reply to certain text messages
- react with emoji to certain text messages
- reply to certain text messages with some info from:
  - Trello
  - Github

## Groceries

- NodeJs `v12.10.0`
- Slack App (gotta create one if you haven't)
- Heroku (optional, but that's what I'm using)
- Github Actions (optional, but advisable)

This app uses:
- [:zap: Bolt](https://github.com/SlackAPI/bolt)
- GraphQL (for **Github API** request queries)

## Integrations

- [x] Trello (`in progress`)
- [x] Github (`in progress`)
- [ ] Bitbucket


## Project Breakdown

    .
    ├── src                    # where the magic happens
    │   ├── features           # has all the features
    |   |   ├── basicConvo.ts     # simple feature added to the bot
    |   |   ├── ...
    │   |   └── FeatureInitializer.ts   # init bot features and integrations
    │   ├── integrations      # has all the integrations
    |   |   ├── ...
    |   |   ├── github        # github config and features
    │   |   └── trello        # trello config and features
    │   └── index.ts          # starts and configures the application
    └── .env.example          # has an example to every env variable used
    ├── ...
    ├── .eslintrc.json        # ESLint config
    ├── package.json
    ├── Procfile              # Heroku app startup command
    ├── README.md
    └── tsconfig.json         # TypeScript config

## Configuration

### Slack App Setup

* Follow the first two steps to [create a Slack App](https://slack.dev/bolt/tutorial/getting-started)
* Add both the `SLACK_SIGNING_SECRET` and `SLACK_BOT_TOKEN` to the local `.env` file

### Trello Integration Setup

* Follow [these steps](https://developers.trello.com/docs/api-introduction) to get a Trello `app key`
* Add the key to the local `.env` file

### Github Integration Setup

* Create a [github token](https://github.com/settings/tokens) 
  * Give the token a descriptive name (e.g. `pingu`)
  * Add the `repo` scope
* Add the token to the local `.env` file


## Starting the App

Before running the app, you gotta set the environment variables (you can check `.env.example`).

### Run local

```bash
npm install
> yada yada installing stuff yada yada

npm start
> Bwahahahaha, Pingu is alive (✧ω✧)
```

#### Other commands

```bash
npm run lint-fix  # fixes lint (orly, sherlock?)
```

### Run on server

Just tell it to do `npm start` and the bot will be ready (aka `Procfile`).

## Bugs or Requests?

Feel free to open an issue or a PR and I may look into it when I have the time. c:
