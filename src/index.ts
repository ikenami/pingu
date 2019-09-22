import { App, ExpressReceiver } from '@slack/bolt';
import { ConsoleLogger, LogLevel } from '@slack/logger';
import { Chitchat } from './features/Chitchat';
import { PinguError } from './features/PinguError';

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

// import all features here
new PinguError(app);
new Chitchat(app);

(async () => {
    await app.start(process.env.PORT || 3000);

    console.log('Bwahahahaha, Pingu is alive (✧ω✧)');
})();