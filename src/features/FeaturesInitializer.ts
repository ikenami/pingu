import { App } from "@slack/bolt";
import basicConvo from "./basicConvo";
import pinguError from "./pinguError";
import GithubIntegration from "../integrations/github/GithubIntegration";
import TrelloIntegration from "../integrations/trello/TrelloIntegration";
import IntegrationsApi from "../integrations/IntegrationsApi";

export default class FeaturesInitializer {
  constructor(
    private readonly app: App,
    private readonly integrations: IntegrationsApi,
  ) {}

  public loadFeatures(): void {
    basicConvo(this.app);
    pinguError(this.app);

    if(this.integrations.githubApi) {
      new GithubIntegration(
        this.app,
        this.integrations.githubApi,
      ).loadFeatures();
    }

    if(this.integrations.trelloApi) {
      new TrelloIntegration(
        this.app,
        this.integrations.trelloApi,
      ).loadFeatures();
    }
  }
}
