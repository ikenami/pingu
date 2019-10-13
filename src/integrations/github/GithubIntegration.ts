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

      try {
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
                  reviews {
                    edges {
                      node {
                        author {
                          login
                        }
                        state
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
          console.log('vars are okay')

          if(edge.node.reviews && edge.node.reviews.edges.length > 0) {
            console.log('has reviewers')
            reviewers = edge.node.reviews.edges.map((reviewEdge: any) => {
              console.log(reviewEdge)
              return `${reviewEdge.node.author.login} - ${reviewEdge.node.author.state}`
            }).join(', ')
          }
          console.log(`reviewers: ${reviewers}`)

          return `user: ${edge.node.author.login}\n
                  title: ${edge.node.title}\n
                  createdAt: ${createdAt}\n
                  url: ${edge.node.url}\n
                  reviews: ${reviewers}`
        })

        pullrequests.forEach((message: any) => {
          say(message)
        })
      } catch (err) {
        console.log(err)
        say(err)
      }
    })
  }
}
