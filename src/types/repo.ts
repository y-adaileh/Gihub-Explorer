export interface GitHubRepositoryOwner {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    user_view_type: string;
    site_admin: boolean
}

export interface RepositoryOwner {
    id: number;
    name: string;
    avatarUrl: string;
    url: string;
    type: string;
    userViewType: string;
}

export interface GitHubRepositoryData {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
    owner: GitHubRepositoryOwner;
    html_url: string;
    description: string;
    fork: boolean;
    url: string;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    git_url: string;
    ssh_url: string;
    clone_url: string;
    svn_url: string;
    homepage: string;
    size: number;
    stargazers_count: number;
    watchers_count: number;
    language: string;
    has_issues: boolean;
    has_projects: boolean;
    has_downloads: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    has_discussions: boolean;
    forks_count: number;
    mirror_url: null;
    archived: boolean;
    disabled: boolean;
    open_issues_count: number;
    allow_forking: boolean;
    is_template: boolean;
    web_commit_signoff_required: boolean;
    topics: string[];
    visibility: string;
    forks: number;
    open_issues: number;
    watchers: number;
    default_branch: string;
    score: number
    languages?: string[];                   
    forkUsers?: GitHubRepositoryData[];
}

export interface RepositoryDetails {
    id: number;
    name: string;
    owner: RepositoryOwner;
    description: string;
    fork: boolean;
    url: string;
    forksCount: number;
    languages: string[]
    forkUsers: RepositoryOwner[]
}