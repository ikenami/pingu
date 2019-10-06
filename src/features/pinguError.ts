import { App } from '@slack/bolt';

export default function pinguError(app: App): void {
  app.error((error) => {
    // TODO: do something useful here, plis

    console.log(error);
  });
}
