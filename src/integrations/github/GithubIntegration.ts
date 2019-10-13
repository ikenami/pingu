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
                      requestedReviewer
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

      const pullrequests = edges.map((edge: any) => {
        const createdAt = new Date(edge.node.createdAt)
        let reviewers = 'unassigned';

        if(edge.node.reviewRequests) {
          reviewers = edge.node.reviewRequests.edges.map((reviewEdge: any) => {
            return reviewEdge.node.requestedReviewer.login
          }).join(', ')
        }

        return `user: ${edge.node.user.login}\n
                title: ${edge.node.title}\n
                createdAt: ${createdAt}\n
                url: ${edge.node.url}\n
                reviewRequests: ${reviewers}`
      })

      pullrequests.forEach((message: any) => {
        say(message)
      })
    })
  }
}
