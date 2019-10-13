import Axios from 'axios'

interface GithubConfig {
  accessToken: string | undefined;
}

export default class GithubApi {
  constructor(private readonly config: GithubConfig) {}

  public static getInstance(config: GithubConfig): GithubApi | null {
    if (config.accessToken) {
      return new GithubApi(config)
    }

    return null
  }

  public async get(query: string, variables?: any): Promise<any> {
    const response = await Axios({
      url: 'https://api.github.com/graphql',
      method: 'POST',
      data: {
        query,
        variables,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${this.config.accessToken}`,
      },
    })

    return response.data
  }
}
