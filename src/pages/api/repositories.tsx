import type { NextApiRequest, NextApiResponse } from 'next';
import { apiClient, mapRepositoriesData } from '@/utils';
import config from '@/config';
import { GitHubRepositoryData } from '@/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const { searchTerm, page, limit } = req.query || {};
      if (!searchTerm) {
        return res
          .status(400)
          .json({ message: 'Missing searchTerm query parameter' });
      }

      const repositoriesSearchResults = await apiClient.get(
        `${config.api.repositoriesUrlPath}?q=${searchTerm || ''}&page=${page || ''}&per_page=${limit || ''}`
      );

      const repositoriesSearchResultsWithLanguages = await Promise.all(
        (repositoriesSearchResults?.data?.items || []).map(
          async (repo: GitHubRepositoryData) => {
            const languages = await apiClient.get(
              config.api.languagesPath(repo.owner.login, repo.name)
            );
            return { ...repo, languages: Object.keys(languages.data) };
          }
        )
      );

      const repositoriesSearchResultsWithForks = await Promise.all(
        (repositoriesSearchResultsWithLanguages || []).map(
          async (repo: GitHubRepositoryData) => {
            const forks = await apiClient.get(
              config.api.forksPath(repo.owner.login, repo.name)
            );
            return { ...repo, forkUsers: forks.data.slice(1, 4) };
          }
        )
      );

      res
        .status(200)
        .json(mapRepositoriesData(repositoriesSearchResultsWithForks || []));
    } catch (error) {
      console.error(error);

      res.status(500).json({ error });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
