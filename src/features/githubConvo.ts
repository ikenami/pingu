import { App } from "@slack/bolt";
import Axios from "axios";

const githubApi = async <T>(query: string, variables?: any) => {
  const response = await Axios({
    url: "https://api.github.com/graphql",
    method: "POST",
    data: {
      query,
      variables
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${process.env.GITHUB_ACCESS_TOKEN}`
    }
  });
  return response.data as T;
};

export default function githubConvo(app: App): void {
  app.message(/^(G|g)et my prs (.+)/, async ({ say, context }) => {
    const login = context.matches[2];

    const {
      data: {
        user: {
          issues: { edges }
        }
      }
    } = await githubApi(`
      {
        user(login: ${login}) {
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
        }
      }
    `);

    const messages = edges.map(
      ({
        node: {
          id,
          author: { login },
          body
        }
      }: any) => `id: ${id}\nuser: ${login}\nbody: ${body}`
    );
    messages.forEach((message: any) => {
      say(message);
    });
  });
}
