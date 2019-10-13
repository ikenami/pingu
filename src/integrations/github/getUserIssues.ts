import { App } from '@slack/bolt'
import GithubApi from './GithubApi'

export default function getUserIssues(app: App, githubApi: GithubApi): void {
  app.message(/^(G|g)et user issues (.+)/, async ({ say, context }) => {
    const username = context.matches[2]

    say(`Okay, I'm getting ${username} issues, hold on`)

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
    } = await githubApi.get(userIssuesQuery)

    const issues = edges.map(
      ({
        node: {
          author: { login },
          title,
          url,
        },
      }: any) => `@${login} [${title} - ${url}]`,
    )

    say(issues.join('\n'))
  })
}
