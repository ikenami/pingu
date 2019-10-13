import { App } from "@slack/bolt";
import GithubApi from "./GithubApi";

export default class GithubIntegration {
  constructor(
    private readonly app: App,
    private readonly githubApi: GithubApi,
  ) {}

  public async loadFeatures() {
    this.app.message(/^(G|g)et user issues (.+)/, async ({ say, context }) => {
      const username = context.matches[2];

      const userIssuesQuery: string = `{
        user(login: ${username}) {
          issues(first: 10) {
            edges {
              node {
                id
                author {
                  login
                }
                body
              }
            }
          }
        }}`;
  
      const {
        data: {
          user: {
            issues: { edges }
          }
        }
      } = await this.githubApi.get(userIssuesQuery);
  
      const issues = edges.map(
        ({
          node: {
            id,
            author: { login },
            body
          }
        }: any) => `id: ${id}\nuser: ${login}\nbody: ${body}`);
      
      issues.forEach((message: any) => {
        say(message);
      });
    });
  }
}