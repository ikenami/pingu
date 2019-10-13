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
                author {
                  login
                }
                title
                url
                createdAt
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
            author: { login },
            title,
            url,
            createdAt,
          },
        }: any) => `user: ${login}\ntitle: ${title}\nurl: ${url}\ncreatedAt: ${createdAt}`,
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
                author {
                  login
                }
                title
                url
                createdAt
                reviewRequests {
                  edges {
                    node {
                      requestedReviewer {
                        user {
                          login
                        }
                      }
                    }
                  }
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
            author: { login },
            title,
            url,
            createdAt,
            reviewRequests,
          },
        }: any) => `user: ${login}\ntitle: ${title}\ncreatedAt: ${createdAt}\nurl: ${url}\nreviewRequests: ${reviewRequests}`,
      )

      pullrequests.forEach((message: any) => {
        say(message)
      })
    })
  }
}
