export default {
    api: {
        baseUrl: process.env.NEXT_PUBLIC_GITHUB_API_URL || '',
        usersUrlPath: '/search/users',
        repositoriesUrlPath: '/search/repositories',
        languagesPath: (owner: string, repo: string) => `/repos/${owner}/${repo}/languages`,
        forksPath: (owner: string, repo: string) => `/repos/${owner}/${repo}/forks`,
        accessToken: process.env.NEXT_PUBLIC_GITHUB_TOKEN || '',
        routes: {
            users: '/api/users',
            repositories: '/api/repositories',
        }
    }
}