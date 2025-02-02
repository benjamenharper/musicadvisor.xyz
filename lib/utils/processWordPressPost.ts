import { postAuthorManager } from './postAuthorManager';

export function processWordPressPost(post: any) {
  // Get or assign an author for this post
  const authorId = postAuthorManager.assignAuthorToPost(post.id.toString());
  
  // Add the author ID to the post
  return {
    ...post,
    authorId
  };
}
