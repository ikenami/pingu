import { App } from "@slack/bolt";
import { basicConvo } from "./basicConvo";
import { pinguError } from "./pinguError";

export class FeaturesInitializer {
  constructor(private readonly app: App) {}

  public loadFeatures(): void {
    basicConvo(this.app);
    pinguError(this.app);
  }
}