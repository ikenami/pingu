import { App } from '@slack/bolt'
import GithubApi from './GithubApi'

export default class GithubIntegration {
  constructor(
    private readonly app: App,
    private readonly githubApi: GithubApi,
  ) {}

  public async loadFeatures() {
    this.app.message(/^(G|g)et user issues (.+)/, async ({ say, context }) => {
      const username = context.matches[2]

      const userIssuesQuery: string = `{
        user(login: ${username}) {
          issues(last: 10,
            states:OPEN,
            orderBy:{
              field:CREATED_AT,
              direction:ASC
            }) {
            edges {
              node {
                title
                author {
                  login
                }
                url
              }
            }
          }
        }}`

      const {
        data: {
          user: {
            issues: { edges },
          },
        },
      } = await this.githubApi.get(userIssuesQuery)

      const issues = edges.map(
        ({
          node: {
            title,
            url,
            author: { login },
          },
        }: any) => `user: ${login}\ntitle: ${title}\nurl: ${url}`,
      )

      issues.forEach((message: any) => {
        say(message)
      })
    })

    this.app.message(/^(G|g)et user prs (.+)/, async ({ say, context }) => {
      const username = context.matches[2]

      const userPrsQuery: string = `{
        user(login: ${username}) {
          pullRequests(last: 10,
                       states:OPEN,
                       orderBy:{
                         field:CREATED_AT,
                         direction:ASC
                       }) {
            edges {
              node {
                title
                url
                author {
                  login
                }
              }
            }
          }
        }}`

      const {
        data: {
          user: {
            pullRequests: { edges },
          },
        },
      } = await this.githubApi.get(userPrsQuery)

      const pullrequests = edges.map(
        ({
          node: {
            title,
            url,
            author: { login },
          },
        }: any) => `user: ${login}\ntitle: ${title}\nurl: ${url}`,
      )

      pullrequests.forEach((message: any) => {
        say(message)
      })
    })
  }
}
