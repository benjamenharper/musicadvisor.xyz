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
  defaultSite: 'hawaii',
  sites: {
    hawaii: {
      name: 'Hawaii Elite Real Estate',
      url: 'https://hawaiieliterealestate.com',
      domain: 'https://hawaiieliterealestate.com',
      description: 'Luxury Real Estate in Hawaii',
      primaryColor: '#2563eb', // blue-600
    },
    trading: {
      name: 'Trading Onramp',
      url: 'https://tradingonramp.com',
      domain: 'https://tradingonramp.com',
      description: 'Your Gateway to Trading Success',
      primaryColor: '#7c3aed', // purple-600
    },
  },
  megaSite: {
    name: 'Content Hub',
    description: 'All your favorite content in one place',
    sources: ['hawaii', 'trading']
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
