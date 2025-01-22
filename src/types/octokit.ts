export interface Repository {
  /**
   * Unique identifier of the repository
   */
  id: number;
  /**
   * The GraphQL identifier of the repository.
   */
  node_id: string;
  /**
   * The name of the repository.
   */
  name: string;
  /**
   * The full, globally unique, name of the repository.
   */
  full_name: string;
  /**
   * Whether the repository is private or public.
   */
  private: boolean;
  owner: User;
  /**
   * The URL to view the repository on GitHub.com.
   */
  html_url: string;
  /**
   * The repository description.
   */
  description: string | null;
  /**
   * Whether the repository is a fork.
   */
  fork: boolean;
  /**
   * The URL to get more information about the repository from the GitHub API.
   */
  url: string;
  /**
   * The API URL to list the forks of the repository.
   */
  forks_url: string;
  /**
   * A template for the API URL to get information about deploy keys on the repository.
   */
  keys_url: string;
  /**
   * A template for the API URL to get information about collaborators of the repository.
   */
  collaborators_url: string;
  /**
   * The API URL to list the teams on the repository.
   */
  teams_url: string;
  /**
   * The API URL to list the hooks on the repository.
   */
  hooks_url: string;
  /**
   * A template for the API URL to get information about issue events on the repository.
   */
  issue_events_url: string;
  /**
   * The API URL to list the events of the repository.
   */
  events_url: string;
  /**
   * A template for the API URL to list the available assignees for issues in the repository.
   */
  assignees_url: string;
  /**
   * A template for the API URL to get information about branches in the repository.
   */
  branches_url: string;
  /**
   * The API URL to get information about tags on the repository.
   */
  tags_url: string;
  /**
   * A template for the API URL to create or retrieve a raw Git blob in the repository.
   */
  blobs_url: string;
  /**
   * A template for the API URL to get information about Git tags of the repository.
   */
  git_tags_url: string;
  /**
   * A template for the API URL to get information about Git refs of the repository.
   */
  git_refs_url: string;
  /**
   * A template for the API URL to create or retrieve a raw Git tree of the repository.
   */
  trees_url: string;
  /**
   * A template for the API URL to get information about statuses of a commit.
   */
  statuses_url: string;
  /**
   * The API URL to get information about the languages of the repository.
   */
  languages_url: string;
  /**
   * The API URL to list the stargazers on the repository.
   */
  stargazers_url: string;
  /**
   * A template for the API URL to list the contributors to the repository.
   */
  contributors_url: string;
  /**
   * The API URL to list the subscribers on the repository.
   */
  subscribers_url: string;
  /**
   * The API URL to subscribe to notifications for this repository.
   */
  subscription_url: string;
  /**
   * A template for the API URL to get information about commits on the repository.
   */
  commits_url: string;
  /**
   * A template for the API URL to get information about Git commits of the repository.
   */
  git_commits_url: string;
  /**
   * A template for the API URL to get information about comments on the repository.
   */
  comments_url: string;
  /**
   * A template for the API URL to get information about issue comments on the repository.
   */
  issue_comment_url: string;
  /**
   * A template for the API URL to get the contents of the repository.
   */
  contents_url: string;
  /**
   * A template for the API URL to compare two commits or refs.
   */
  compare_url: string;
  /**
   * The API URL to merge branches in the repository.
   */
  merges_url: string;
  /**
   * A template for the API URL to download the repository as an archive.
   */
  archive_url: string;
  /**
   * The API URL to list the downloads on the repository.
   */
  downloads_url: string;
  /**
   * A template for the API URL to get information about issues on the repository.
   */
  issues_url: string;
  /**
   * A template for the API URL to get information about pull requests on the repository.
   */
  pulls_url: string;
  /**
   * A template for the API URL to get information about milestones of the repository.
   */
  milestones_url: string;
  /**
   * A template for the API URL to get information about notifications on the repository.
   */
  notifications_url: string;
  /**
   * A template for the API URL to get information about labels of the repository.
   */
  labels_url: string;
  /**
   * A template for the API URL to get information about releases on the repository.
   */
  releases_url: string;
  /**
   * The API URL to list the deployments of the repository.
   */
  deployments_url: string;
  created_at: number | string;
  updated_at: string;
  pushed_at: number | string | null;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string | null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  /**
   * Whether issues are enabled.
   */
  has_issues: boolean;
  /**
   * Whether projects are enabled.
   */
  has_projects: boolean;
  /**
   * Whether downloads are enabled.
   */
  has_downloads: boolean;
  /**
   * Whether the wiki is enabled.
   */
  has_wiki: boolean;
  has_pages: boolean;
  /**
   * Whether discussions are enabled.
   */
  has_discussions?: boolean;
  forks_count: number;
  mirror_url: string | null;
  /**
   * Whether the repository is archived.
   */
  archived: boolean;
  /**
   * Returns whether or not this repository is disabled.
   */
  disabled?: boolean;
  open_issues_count: number;
  forks: number;
  open_issues: number;
  watchers: number;
  stargazers?: number;
  /**
   * The default branch of the repository.
   */
  default_branch: string;
  /**
   * Whether to allow squash merges for pull requests.
   */
  allow_squash_merge?: boolean;
  /**
   * Whether to allow merge commits for pull requests.
   */
  allow_merge_commit?: boolean;
  /**
   * Whether to allow rebase merges for pull requests.
   */
  allow_rebase_merge?: boolean;
  /**
   * Whether to allow auto-merge for pull requests.
   */
  allow_auto_merge?: boolean;
  /**
   * Whether to allow private forks
   */
  allow_forking?: boolean;
  allow_update_branch?: boolean;
  use_squash_pr_title_as_default?: boolean;
  squash_merge_commit_message?: string;
  squash_merge_commit_title?: string;
  merge_commit_message?: string;
  merge_commit_title?: string;
  is_template: boolean;
  web_commit_signoff_required: boolean;
  topics: string[];
  visibility: "public" | "private" | "internal";
  /**
   * Whether to delete head branches when pull requests are merged
   */
  delete_branch_on_merge?: boolean;
  master_branch?: string;
  permissions?: {
    pull: boolean;
    push: boolean;
    admin: boolean;
    maintain?: boolean;
    triage?: boolean;
  };
  public?: boolean;
  organization?: string;
}
export interface User {
  login: string;
  id: number;
  node_id: string;
  name?: string;
  email?: string | null;
  avatar_url: string;
  gravatar_id: string;
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
  type: "Bot" | "User" | "Organization";
  site_admin: boolean;
}

export interface CreateEvent {
  /**
   * The [`git ref`](https://docs.github.com/en/rest/reference/git#get-a-reference) resource.
   */
  ref: string;
  /**
   * The type of Git ref object created in the repository. Can be either `branch` or `tag`.
   */
  ref_type: "tag" | "branch";
  /**
   * The name of the repository's default branch (usually `main`).
   */
  master_branch: string;
  /**
   * The repository's current description.
   */
  description: string | null;
  /**
   * The pusher type for the event. Can be either `user` or a deploy key.
   */
  pusher_type: string;
  repository: Repository;
  sender: User;
  installation: {
    id: number;
    node_id: string;
  };
}

export interface InstallationCreatedEvent {
  action: "created";
  installation: Installation;
  /**
   * An array of repository objects that the installation can access.
   */
  repositories?: {
    /**
     * Unique identifier of the repository
     */
    id: number;
    node_id: string;
    /**
     * The name of the repository.
     */
    name: string;
    full_name: string;
    /**
     * Whether the repository is private or public.
     */
    private: boolean;
  }[];
  requester?: User;
  sender: User;
}
/**
 * The GitHub App installation.
 */
export interface Installation {
  /**
   * The ID of the installation.
   */
  id: number;
  account: User;
  /**
   * Describe whether all repositories have been selected or there's a selection involved
   */
  repository_selection: "all" | "selected";
  access_tokens_url: string;
  repositories_url: string;
  html_url: string;
  app_id: number;
  app_slug?: string;
  /**
   * The ID of the user or organization this token is being scoped to.
   */
  target_id: number;
  target_type: "User" | "Organization";
  permissions: {
    /**
     * The level of permission granted to the access token for GitHub Actions workflows, workflow runs, and artifacts.
     */
    actions?: "read" | "write";
    /**
     * The level of permission granted to the access token for repository creation, deletion, settings, teams, and collaborators creation.
     */
    administration?: "read" | "write";
    blocking?: "read" | "write";
    /**
     * The level of permission granted to the access token for checks on code.
     */
    checks?: "read" | "write";
    content_references?: "read" | "write";
    /**
     * The level of permission granted to the access token for repository contents, commits, branches, downloads, releases, and merges.
     */
    contents?: "read" | "write";
    /**
     * The level of permission granted to the access token for deployments and deployment statuses.
     */
    deployments?: "read" | "write";
    discussions?: "read" | "write";
    emails?: "read" | "write";
    /**
     * The level of permission granted to the access token for managing repository environments.
     */
    environments?: "read" | "write";
    /**
     * The level of permission granted to the access token for issues and related comments, assignees, labels, and milestones.
     */
    issues?: "read" | "write";
    /**
     * The level of permission granted to the access token for organization teams and members.
     */
    members?: "read" | "write";
    merge_queues?: "read" | "write";
    /**
     * The level of permission granted to the access token to search repositories, list collaborators, and access repository metadata.
     */
    metadata?: "read" | "write";
    /**
     * The level of permission granted to the access token to manage access to an organization.
     */
    organization_administration?: "read" | "write";
    organization_events?: "read" | "write";
    /**
     * The level of permission granted to the access token to manage the post-receive hooks for an organization.
     */
    organization_hooks?: "read" | "write";
    /**
     * The level of permission granted to the access token for organization packages published to GitHub Packages.
     */
    organization_packages?: "read" | "write";
    /**
     * The level of permission granted to the access token for viewing an organization's plan.
     */
    organization_plan?: "read" | "write";
    /**
     * The level of permission granted to the access token to manage organization projects and projects beta (where available).
     */
    organization_projects?: "read" | "write";
    /**
     * The level of permission granted to the access token to manage organization secrets.
     */
    organization_secrets?: "read" | "write";
    /**
     * The level of permission granted to the access token to view and manage GitHub Actions self-hosted runners available to an organization.
     */
    organization_self_hosted_runners?: "read" | "write";
    /**
     * The level of permission granted to the access token to view and manage users blocked by the organization.
     */
    organization_user_blocking?: "read" | "write";
    /**
     * The level of permission granted to the access token for packages published to GitHub Packages.
     */
    packages?: "read" | "write";
    /**
     * The level of permission granted to the access token to retrieve Pages statuses, configuration, and builds, as well as create new builds.
     */
    pages?: "read" | "write";
    /**
     * The level of permission granted to the access token for pull requests and related comments, assignees, labels, milestones, and merges.
     */
    pull_requests?: "read" | "write";
    /**
     * The level of permission granted to the access token to manage the post-receive hooks for a repository.
     */
    repository_hooks?: "read" | "write";
    /**
     * The level of permission granted to the access token to manage repository projects, columns, and cards.
     */
    repository_projects?: "read" | "write";
    /**
     * The level of permission granted to the access token to view and manage secret scanning alerts.
     */
    secret_scanning_alerts?: "read" | "write";
    /**
     * The level of permission granted to the access token to manage repository secrets.
     */
    secrets?: "read" | "write";
    /**
     * The level of permission granted to the access token to view and manage security events like code scanning alerts.
     */
    security_events?: "read" | "write";
    security_scanning_alert?: "read" | "write";
    /**
     * The level of permission granted to the access token to manage just a single file.
     */
    single_file?: "read" | "write";
    /**
     * The level of permission granted to the access token for commit statuses.
     */
    statuses?: "read" | "write";
    /**
     * The level of permission granted to the access token to manage team discussions and related comments.
     */
    team_discussions?: "read" | "write";
    /**
     * The level of permission granted to the access token to manage Dependabot alerts.
     */
    vulnerability_alerts?: "read" | "write";
    /**
     * The level of permission granted to the access token to update GitHub Actions workflow files.
     */
    workflows?: "read" | "write";
  };
  events: (
    | "branch_protection_rule"
    | "check_run"
    | "check_suite"
    | "code_scanning_alert"
    | "commit_comment"
    | "create"
    | "delete"
    | "deployment"
    | "deployment_review"
    | "deployment_status"
    | "deploy_key"
    | "discussion"
    | "discussion_comment"
    | "fork"
    | "gollum"
    | "issues"
    | "issue_comment"
    | "label"
    | "member"
    | "membership"
    | "merge_group"
    | "merge_queue_entry"
    | "milestone"
    | "organization"
    | "org_block"
    | "page_build"
    | "project"
    | "projects_v2_item"
    | "project_card"
    | "project_column"
    | "public"
    | "pull_request"
    | "pull_request_review"
    | "pull_request_review_comment"
    | "pull_request_review_thread"
    | "push"
    | "registry_package"
    | "release"
    | "repository"
    | "repository_dispatch"
    | "secret_scanning_alert"
    | "secret_scanning_alert_location"
    | "security_and_analysis"
    | "star"
    | "status"
    | "team"
    | "team_add"
    | "watch"
    | "workflow_dispatch"
    | "workflow_job"
    | "workflow_run"
  )[];
  created_at: string | number;
  updated_at: string | number;
  single_file_name: string | null;
  has_multiple_single_files?: boolean;
  single_file_paths?: string[];
  suspended_by: User | null;
  suspended_at: string | null;
}
export interface InstallationDeletedEvent {
  action: "deleted";
  installation: Installation;
  /**
   * An array of repository objects that the installation can access.
   */
  repositories?: {
    /**
     * Unique identifier of the repository
     */
    id: number;
    node_id: string;
    /**
     * The name of the repository.
     */
    name: string;
    full_name: string;
    /**
     * Whether the repository is private or public.
     */
    private: boolean;
  }[];
  requester?: null;
  sender: User;
}

export type InstallationRepositoriesEvent =
  | InstallationRepositoriesAddedEvent
  | InstallationRepositoriesRemovedEvent;

export interface InstallationRepositoriesAddedEvent {
  action: "added";
  installation: Installation;
  /**
   * Describe whether all repositories have been selected or there's a selection involved
   */
  repository_selection: "all" | "selected";
  /**
   * An array of repository objects, which were added to the installation.
   */
  repositories_added: {
    /**
     * Unique identifier of the repository
     */
    id: number;
    node_id: string;
    /**
     * The name of the repository.
     */
    name: string;
    full_name: string;
    /**
     * Whether the repository is private or public.
     */
    private: boolean;
  }[];
  /**
   * An array of repository objects, which were removed from the installation.
   *
   * @maxItems 0
   */
  repositories_removed: [];
  requester: User | null;
  sender: User;
}
export interface InstallationRepositoriesRemovedEvent {
  action: "removed";
  installation: Installation;
  /**
   * Describe whether all repositories have been selected or there's a selection involved
   */
  repository_selection: "all" | "selected";
  /**
   * An array of repository objects, which were added to the installation.
   *
   * @maxItems 0
   */
  repositories_added: [];
  /**
   * An array of repository objects, which were removed from the installation.
   */
  repositories_removed: {
    /**
     * Unique identifier of the repository
     */
    id: number;
    node_id: string;
    /**
     * The name of the repository.
     */
    name: string;
    full_name: string;
    /**
     * Whether the repository is private or public.
     */
    private: boolean;
  }[];
  requester: User | null;
  sender: User;
}
