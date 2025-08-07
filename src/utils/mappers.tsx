import {
  UserDetails,
  GitHubUser,
  GitHubRepositoryData,
  RepositoryDetails,
} from '@/types';

export const mapUserProfiles = (
  userProfilesData: GitHubUser[]
): UserDetails[] =>
  userProfilesData.map((user) => ({
    id: user.id,
    name: user.login,
    avatarUrl: user.avatar_url,
    url: user.url,
    score: user.score,
    type: user.type,
    siteAdmin: user.site_admin,
    userViewType: user.user_view_type,
  }));

export const mapRepositoriesData = (
  reposData: GitHubRepositoryData[]
): RepositoryDetails[] => {
  return reposData.map((repo) => ({
    id: repo.id,
    name: repo.name,
    owner: {
      id: repo.owner.id,
      name: repo.owner.login,
      avatarUrl: repo.owner.avatar_url,
      url: repo.owner.html_url,
      type: repo.owner.type,
      userViewType: repo.owner.user_view_type,
    },
    description: repo.description,
    fork: repo.fork,
    url: repo.html_url,
    forksCount: repo.forks_count,
    languages: repo.languages || (repo.language ? [repo.language] : []),
    forkUsers: (repo.forkUsers || []).map((user) => ({
      id: user.owner.id,
      name: user.owner.login,
      avatarUrl: user.owner.avatar_url,
      url: user.owner.url,
      type: user.owner.type,
      userViewType: user.owner.user_view_type,
    })),
  }));
};
