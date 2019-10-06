import { App, ExpressReceiver } from '@slack/bolt';
import { ConsoleLogger, LogLevel } from '@slack/logger';
import FeaturesInitializer from './features/FeaturesInitializer';
import TrelloApi from './integrations/trello/TrelloApi';
import TrelloIntegration from './integrations/trello/TrelloIntegration';

const logger = new ConsoleLogger();
logger.setLevel(LogLevel.DEBUG);

const expressReceiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET!,
  logger,
});

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver: expressReceiver,
});

// load all features
const features = new FeaturesInitializer(app).loadFeatures();

// load trello integration
const trelloApi = new TrelloApi({
  key: process.env.TRELLO_KEY!,
  token: process.env.TRELLO_TOKEN!,
});
const trello = new TrelloIntegration(app, trelloApi).loadFeatures();

(async () => {
  await app.start(process.env.PORT || 3000);

  console.log('Bwahahahaha, Pingu is alive (✧ω✧)');
})();
