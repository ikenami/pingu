import { App, ExpressReceiver } from '@slack/bolt';
import { ConsoleLogger, LogLevel } from '@slack/logger';
import { FeaturesInitializer } from './features/FeaturesInitializer';

const logger = new ConsoleLogger();
logger.setLevel(LogLevel.DEBUG);

const expressReceiver = new ExpressReceiver({
    signingSecret: process.env.SLACK_SIGNING_SECRET!,
    logger: logger
});

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    receiver: expressReceiver
});

// load all features
const features = new FeaturesInitializer(app).loadFeatures();

(async () => {
    await app.start(process.env.PORT || 3000);

    console.log('Bwahahahaha, Pingu is alive (✧ω✧)');
})();