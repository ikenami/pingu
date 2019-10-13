import GithubApi from './github/GithubApi'
import TrelloApi from './trello/TrelloApi'

export default interface IntegrationsApi {
  githubApi: GithubApi | null;
  trelloApi: TrelloApi | null;
}
