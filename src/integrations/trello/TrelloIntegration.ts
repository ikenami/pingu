import { App } from "@slack/bolt";
import { TrelloApi } from "./TrelloApi";

export class TrelloIntegration {
  constructor(
    private readonly app: App,
    private readonly trelloApi: TrelloApi,
  ) {}

  public async loadFeatures() {
    this.app.message('pingu lista boards', async ({ say }) => {
      let boards: string = await this.trelloApi.getBoards();

      say(`Seus boards são: ${boards}`);
    });
  } 
}