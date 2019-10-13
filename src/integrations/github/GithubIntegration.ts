import { App } from '@slack/bolt'
import GithubApi from './GithubApi'
import getUserIssues from './getUserIssues'
import getUserPrs from './getUserPrs'

export default class GithubIntegration {
  constructor(
    private readonly app: App,
    private readonly githubApi: GithubApi,
  ) {}

  public async loadFeatures() {
    getUserIssues(this.app, this.githubApi)
    getUserPrs(this.app, this.githubApi)
  }
}
