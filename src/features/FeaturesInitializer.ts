import { App } from "@slack/bolt";
import basicConvo from "./basicConvo";
import githubConvo from "./githubConvo";
import pinguError from "./pinguError";

export default class FeaturesInitializer {
  constructor(private readonly app: App) {}

  public loadFeatures(): void {
    basicConvo(this.app);
    githubConvo(this.app);
    pinguError(this.app);
  }
}
