import { App, ExpressReceiver } from '@slack/bolt';
import { ConsoleLogger, LogLevel } from '@slack/logger';
import FeaturesInitializer from './features/FeaturesInitializer';
import TrelloApi from './integrations/trello/TrelloApi';
import GithubApi from './integrations/github/GithubApi';
import IntegrationsApi from './integrations/IntegrationsApi';

const logger = new ConsoleLogger();
logger.setLevel(LogLevel.DEBUG);

const expressReceiver = new ExpressReceiver({
  logger,
  signingSecret: process.env.SLACK_SIGNING_SECRET!,
});

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver: expressReceiver,
});

// load integrations
const integrationsApi: IntegrationsApi = {
  trelloApi: TrelloApi.getInstance({
    key: process.env.TRELLO_KEY,
    token: process.env.TRELLO_TOKEN,
  }),
  githubApi: GithubApi.getInstance({
    accessToken: process.env.GITHUB_ACCESS_TOKEN,
  })
}

// load all features
new FeaturesInitializer(
  app,
  integrationsApi,
).loadFeatures();

(async () => {
  await app.start(process.env.PORT || 3000);

  console.log('Bwahahahaha, Pingu is alive (✧ω✧)');
})();
