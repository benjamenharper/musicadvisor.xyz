import { Author } from '../data/authors';

/**
 * Randomly assigns an author to an article
 */
export function getRandomAuthor(authors: Author[]): string {
  const randomIndex = Math.floor(Math.random() * authors.length);
  return authors[randomIndex].id;
}

/**
 * Example usage:
 * const authorId = getRandomAuthor(authors);
 */
