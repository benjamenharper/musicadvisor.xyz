interface WordPressSite {
  name: string;
  url: string;
  domain: string;
  description?: string;
  logo?: string;
  primaryColor?: string;
}

interface Config {
  sites: Record<string, WordPressSite>;
  defaultSite: string;
  megaSite: {
    name: string;
    description: string;
    sources: string[]; // List of site keys to aggregate
  };
}

export const config: Config = {
  defaultSite: 'musicadvisor',
  sites: {
    musicadvisor: {
      name: 'Music Advisor',
      url: 'https://musicadvisor.xyz',
      domain: 'https://musicadvisor.xyz',
      description: 'Music Promotion and News',
      primaryColor: '#6366f1', // indigo-500
    },
  },
  megaSite: {
    name: 'Music Advisor',
    description: 'Music Promotion and News',
    sources: ['musicadvisor'],
  }
} as const;

// Helper function to get current site based on hostname
export function getCurrentSite(hostname?: string): WordPressSite {
  if (!hostname) {
    return config.sites[config.defaultSite];
  }

  // Remove port number and 'www' if present
  const cleanHostname = hostname
    .split(':')[0]
    .replace(/^www\./, '');

  // Find site by hostname
  const site = Object.values(config.sites).find(
    site => new URL(site.domain).hostname === cleanHostname
  );

  return site || config.sites[config.defaultSite];
}
