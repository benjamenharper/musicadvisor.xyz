import { postAuthorManager } from './postAuthorManager';
import { calculateReadingTime } from './calculateReadingTime';

export function processWordPressPost(post: any) {
  if (!post) return null;

  const authorId = postAuthorManager.assignAuthorToPost(post.id.toString());
  
  const content = post.content?.rendered || '';
  const readingTime = calculateReadingTime(content);

  return {
    ...post,
    authorId,
    readingTime,
    content: {
      ...post.content,
      rendered: content
    }
  };
}
