import Axios from "axios";

interface TrelloConfig {
  key: string;
  token: string;
}

export class TrelloApi {
  constructor(private readonly config: TrelloConfig) {}

  public async getBoards(): Promise<string>{
    return Axios.get('https://api.trello.com/1/members/me/boards', {
      params: {
        key: this.config.key,
        token: this.config.token,
      }
    })
    .then((response) => this.filterOpenBoards(response.data))
    .then((openBoards) => this.getBoardsNames(openBoards))
    .catch((error) => {
      console.log(error);

      return `Ih, foi mal. Não deu mt certo pq: ${JSON.stringify(error)}`;
    });
  }

  private filterOpenBoards(boards: any[]): any[] {
    return boards.filter((board) => !board.closed);
  }

  private getBoardsNames(boards: any[]): string {
    return boards.map(board => `- ${board.name}`).join('\n\n');
  }
}