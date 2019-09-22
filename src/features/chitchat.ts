import { App } from "@slack/bolt";

export class Chitchat {
  constructor(app: App) {
    app.message('does it work?', ({ message, say }) => {
      say(`We hope so, <@${message.user}>\!`);
    });
  }
}