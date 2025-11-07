export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  homepage: string | null;
  updated_at: string;
}

export interface GitHubUser {
  login: string;
  name: string;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
}

export async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  try {
    console.log(`Fetching GitHub user: ${username}`);
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
    });
    
    console.log(`GitHub user API response status: ${response.status}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('GitHub user API error:', errorText);
      throw new Error(`Failed to fetch GitHub user: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('GitHub user data:', data);
    return data;
  } catch (error) {
    console.error('Error in fetchGitHubUser:', error);
    throw error;
  }
}

export async function fetchGitHubRepos(username: string, limit: number = 6): Promise<GitHubRepo[]> {
  try {
    console.log(`Fetching GitHub repos for: ${username}, limit: ${limit}`);
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=${limit}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );
    
    console.log(`GitHub repos API response status: ${response.status}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('GitHub repos API error:', errorText);
      throw new Error(`Failed to fetch GitHub repositories: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('GitHub repos data:', data);
    return data;
  } catch (error) {
    console.error('Error in fetchGitHubRepos:', error);
    throw error;
  }
}

export async function fetchAllGitHubRepos(username: string): Promise<GitHubRepo[]> {
  try {
    console.log(`Fetching all GitHub repos for: ${username}`);
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );
    
    console.log(`GitHub all repos API response status: ${response.status}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('GitHub all repos API error:', errorText);
      throw new Error(`Failed to fetch all GitHub repositories: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`Fetched ${data.length} total repositories`);
    return data;
  } catch (error) {
    console.error('Error in fetchAllGitHubRepos:', error);
    throw error;
  }
}

export function extractSkillsFromRepos(repos: GitHubRepo[]): {
  languages: string[];
  topics: string[];
} {
  const languagesSet = new Set<string>();
  const topicsSet = new Set<string>();

  repos.forEach((repo) => {
    if (repo.language) {
      languagesSet.add(repo.language);
    }
    if (repo.topics && repo.topics.length > 0) {
      repo.topics.forEach((topic) => topicsSet.add(topic));
    }
  });

  return {
    languages: Array.from(languagesSet).sort(),
    topics: Array.from(topicsSet).sort(),
  };
}