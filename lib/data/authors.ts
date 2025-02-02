import angelicaImage from '@/public/angelica-peterson.jpg';
import markImage from '@/public/markjackson.jpg';
import alisonImage from '@/public/alisonjenks.jpg';
import conorImage from '@/public/conormurphy.png';

export interface Author {
  id: string;
  name: string;
  role: string;
  image: any;
  shortBio: string;
  expertiseAreas: string[];
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
  articles?: string[]; // IDs of articles written by this author
}

export const authors: Author[] = [
  {
    id: 'conor-murphy',
    name: 'Conor Murphy',
    role: 'Music Industry Consultant',
    image: conorImage,
    shortBio: 'Experienced music industry consultant specializing in artist management and strategic growth.',
    expertiseAreas: ['artist management', 'business strategy', 'industry consulting', 'career development'],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/conor-murphy',
      website: 'https://conormurphy.com'
    }
  },
  {
    id: 'angelica-peterson',
    name: 'Angelica Peterson',
    role: 'Senior Music Industry Analyst',
    image: angelicaImage,
    shortBio: 'Music industry veteran with over a decade of experience in artist development and digital marketing.',
    expertiseAreas: ['artist development', 'digital marketing', 'music promotion', 'industry trends'],
    socialLinks: {
      twitter: 'https://twitter.com/angelicap_music',
      linkedin: 'https://linkedin.com/in/angelica-peterson'
    }
  },
  {
    id: 'mark-jackson',
    name: 'Mark Jackson',
    role: 'Industry News Editor',
    image: markImage,
    shortBio: 'Music industry journalist covering breaking news and emerging trends.',
    expertiseAreas: ['music news', 'industry analysis', 'technology', 'streaming platforms'],
    socialLinks: {
      twitter: 'https://twitter.com/markj_music',
      website: 'https://markjackson.com'
    }
  },
  {
    id: 'alison-jenks',
    name: 'Alison Jenks',
    role: 'Digital Marketing Strategist',
    image: alisonImage,
    shortBio: 'Digital marketing specialist with expertise in music promotion and audience growth strategies.',
    expertiseAreas: ['digital marketing', 'social media', 'audience growth', 'content strategy'],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/alison-jenks',
      website: 'https://alisonjenks.com'
    }
  }
];
