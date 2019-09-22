import { App } from "@slack/bolt";

export class BasicConvo {
  constructor(app: App) {
    app.message(/^(hi+|he+llo+|he+y+|o+i+|e a(í|i)+).*/, ({ message, say }) => {
      say(`Sup <@${message.user}> ヽ(・∀・)ﾉ howdy?`);
    });

    app.message(/^ping.*/, ({ message, say }) => {
      say(`Tá de brimks comigo, <@${message.user}>??? (」°ロ°)」\n\n\n.............. pong`);
    });

    app.message(/^tem hora\?.*/, ({ message, say }) => {
      const now = new Date();

      say(`Tenho sim: ${now}\n\nMas e você? (￢‿￢ )`);
    });

    app.message(/^(echo) (.+)/, ({ context, say }) => {
      const echoing = context.matches[2];

      say(echoing);
    });
  }
}