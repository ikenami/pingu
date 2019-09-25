import { App } from "@slack/bolt";

export function basicConvo(app: App): void {
  app.message(/^(hi+|he+llo+|he+y+|o+i+|e a(í|i)+).*/, ({ message, say }) => {
    say(`Sup <@${message.user}> ヽ(・∀・)ﾉ howdy?`);
  });

  app.message('ping', ({ message, say }) => {
    say(`Tá de brimks comigo, <@${message.user}>??? (」°ロ°)」\n\n\n.............. pong`);
  });

  app.message(/^(T|t)em hora\?.*/, ({ message, say }) => {
    const now: Date = new Date();

    say(`Tenho sim: ${now}\n\nMas e você? (￢‿￢ )`);
  });

  app.message(/^(echo) (.+)/, ({ context, say }) => {
    const echoing: string = context.matches[2];

    say(echoing);
  });

  app.message(/^(T|t)e gosto/, async ({ message, context }) => {
    try {
      const result = await app.client.reactions.add({
        token: context.botToken,
        name: 'heart',
        channel: message.channel,
        timestamp: message.ts
      });
    }
    catch (error) {
      console.error(error);
    }
  });

  app.message('tell fulano they are super cool', async ({message, context}) => {
    await app.client.reactions.add({
      token: context.botToken,
      name: 'top',
      channel: message.channel,
      timestamp: message.ts
    });

    await app.client.chat.postMessage({
      token: context.botToken,
      channel: 'UN88YAC9G',
      text: `<@${ message.user }> wants you to know you are super cool`
    })
  })
}
