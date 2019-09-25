import { App } from "@slack/bolt";

export function pinguError(app: App): void {
  app.error((error) => {
    //TODO: do something useful here, plis

    console.log(error);
  });
}