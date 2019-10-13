import { App } from '@slack/bolt'
import GithubApi from './GithubApi'

export default function getUserPrs(app: App, githubApi: GithubApi) {
  app.message(/^(G|g)et user prs (.+)/, async ({ say, context }) => {
    try {
      const username = context.matches[2]

      say(`Okidoki, I'm getting ${username} prs, one sec`)

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
                reviews(last: 10, states:[APPROVED, CHANGES_REQUESTED, DISMISSED, PENDING]) {
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
      } = await githubApi.get(userPrsQuery)

      const pullrequests = edges.map((edge: any) => {
        let reviewers = '\t\tno revieweres'

        if (edge.node.reviews && edge.node.reviews.edges.length > 0) {
          reviewers = edge.node.reviews.edges.map((reviewEdge: any) => {
            let status = reviewEdge.node.state

            if (status === 'APPROVED') {
              status = ':heavy_check_mark:'
            }

            return `\t\t@${reviewEdge.node.author.login} - ${status}`
          }).join('\n')
        }

        return `@${edge.node.author.login} [${edge.node.title} - ${edge.node.url}]\n${reviewers}`
      })

      say(pullrequests.join('\n'))
    } catch (err) {
      console.log(err)
    }
  })
}
