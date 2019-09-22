import { App } from "@slack/bolt";

export class PinguError {
  constructor(app: App) {
    app.error((error) => {
      //TODO: do something useful here, plis

      console.log(error);
    });
  }
}