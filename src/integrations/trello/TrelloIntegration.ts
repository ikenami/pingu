import { App } from '@slack/bolt'
import TrelloApi from './TrelloApi'

export default class TrelloIntegration {
  constructor(
    private readonly app: App,
    private readonly trelloApi: TrelloApi,
  ) {}

  public async loadFeatures() {
    this.app.message('pingu lista boards', async ({ say }) => {
      const boards: string = await this.trelloApi.getBoards()

      say(`Seus boards são: \n\n${boards}`)
    })
  }
}
