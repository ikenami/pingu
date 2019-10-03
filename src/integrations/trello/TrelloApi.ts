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
    return await Axios.get('https://api.trello.com/1/members/me/boards', {
      params: {
        key: this.config.key,
        token: this.config.token,
      }
    })
    .then((response) => {
      const openBoards = this.filterOpenBoards(response as unknown as any[]);

      return this.getBoardsName(openBoards);
    })
    .catch((error) => {
      console.log(error);
      return '';
    });
  }

  private filterOpenBoards(boards: any[]): any[] {
    return boards.filter((board) => !board.closed);
  }

  private getBoardsName(boards: any[]): string {
    return boards.map(board => board.name).join(', ');
  }
}