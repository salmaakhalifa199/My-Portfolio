// Social Links Configuration - uses environment variables only
export const socialLinks = {
  // Main social profiles
  github: import.meta.env.VITE_GITHUB_URL,
  linkedin: import.meta.env.VITE_LINKEDIN_URL,
  email: import.meta.env.VITE_EMAIL,
  medium: import.meta.env.VITE_MEDIUM_URL,
  twitter: import.meta.env.VITE_TWITTER_URL,
  kaggle: import.meta.env.VITE_KAGGLE_URL,
  tableau: import.meta.env.VITE_TABLEAU_URL,
  
  // GitHub repository URLs
  repositories: {
    projectOne: import.meta.env.VITE_GITHUB_PROJECT1_URL,
    projectTwo: import.meta.env.VITE_GITHUB_PROJECT2_URL,
    projectThree: import.meta.env.VITE_GITHUB_PROJECT3_URL,
    projectFour: import.meta.env.VITE_GITHUB_PROJECT4_URL,
    projectFive: import.meta.env.VITE_GITHUB_PROJECT5_URL,
    projectSix: import.meta.env.VITE_GITHUB_PROJECT6_URL,
    projectSeven: import.meta.env.VITE_GITHUB_PROJECT7_URL,
  },
  
  // Formatted display names (extracted from environment variables)
  display: {
    github: import.meta.env.VITE_GITHUB_URL?.replace('https://', ''),
    linkedin: import.meta.env.VITE_LINKEDIN_URL?.replace('https://', ''),
    email: import.meta.env.VITE_EMAIL,
    medium: import.meta.env.VITE_MEDIUM_URL?.replace('https://', ''),
    twitter: import.meta.env.VITE_TWITTER_URL?.replace('https://', ''),
    kaggle: import.meta.env.VITE_KAGGLE_URL?.replace('https://', ''),
    tableau: import.meta.env.VITE_TABLEAU_URL?.replace('https://', ''),
  }
};

export default socialLinks;