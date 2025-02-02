import { authors } from '../data/authors';
import { getRandomAuthor } from '../utils/assignAuthors';

const processedPosts = new Set<number>();

export function processPost(post: any) {
  // Only assign an author once per post
  if (!processedPosts.has(post.id)) {
    post.authorId = getRandomAuthor(authors);
    processedPosts.add(post.id);
  }
  return post;
}
