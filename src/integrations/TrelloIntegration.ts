import { App } from "@slack/bolt";
import Axios from "axios";

interface TrelloConfig {
  key: string;
  token: string;
}

export class TrelloIntegration {
  protected config: TrelloConfig = {
    key: process.env.TRELLO_KEY!,
    token: process.env.TRELLO_TOKEN!,
  };

  constructor(private readonly app: App) {}

  public async loadFeatures() {
    this.app.message('pingu lista boards', async ({ say }) => {
      let boards: string = await this.getBoards();

      say(`Seus boards são: ${boards}`);
    });
  }

  private async getBoards(): Promise<string>{
    return await Axios.get('https://api.trello.com/1/members/me/boards', {
      params: {
        key: this.config.key,
        token: this.config.token,
      }
    })
    .then((response) => {
      return JSON.stringify(response);
    })
    .catch((error) => {
      console.log(error);
      return '';
    });
  }
}