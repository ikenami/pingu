import Axios from "axios";

interface TrelloConfig {
  key: string | null;
  token: string | null;
}

export class TrelloApi {
  private config: TrelloConfig;

  constructor(config: TrelloConfig) {
    this.config = config;
  }

  public async getBoards(): Promise<string>{
    return Axios.get('https://api.trello.com/1/members/me/boards', {
      params: {
        key: this.config.key,
        token: this.config.token,
      }
    })
    .then((response) => this.filterOpenBoards(response as unknown as any[]))
    .then((openBoards) => this.getBoardsNames(openBoards))
    .catch((error) => {
      console.log(error);
      return `Something went wrong: ${JSON.stringify(error)}`;
    });
  }

  private filterOpenBoards(boards: any[]): any[] {
    return boards.filter((board) => !board.closed);
  }

  private getBoardsNames(boards: any[]): string {
    return boards.map(board => board.name).join(', ');
  }
}