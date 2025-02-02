import fs from 'fs';
import path from 'path';
import { authors } from '../data/authors';

const CSV_PATH = path.join(process.cwd(), 'data', 'post-authors.csv');

interface PostAuthor {
  post_id: string;
  author_id: string;
}

export class PostAuthorManager {
  private assignments: Map<string, string> = new Map();

  constructor() {
    this.loadAssignments();
  }

  private loadAssignments() {
    if (!fs.existsSync(CSV_PATH)) {
      fs.writeFileSync(CSV_PATH, 'post_id,author_id\n');
      return;
    }

    const content = fs.readFileSync(CSV_PATH, 'utf-8');
    const lines = content.split('\n').slice(1); // Skip header

    lines.forEach(line => {
      if (line.trim()) {
        const [post_id, author_id] = line.split(',');
        this.assignments.set(post_id.trim(), author_id.trim());
      }
    });
  }

  private saveAssignments() {
    let content = 'post_id,author_id\n';
    this.assignments.forEach((author_id, post_id) => {
      content += `${post_id},${author_id}\n`;
    });
    fs.writeFileSync(CSV_PATH, content);
  }

  getAuthorForPost(postId: string): string | null {
    return this.assignments.get(postId) || null;
  }

  assignAuthorToPost(postId: string): string {
    // Check if post already has an author
    const existingAuthor = this.getAuthorForPost(postId);
    if (existingAuthor) {
      return existingAuthor;
    }

    // Randomly assign a new author
    const randomIndex = Math.floor(Math.random() * authors.length);
    const authorId = authors[randomIndex].id;

    // Save the assignment
    this.assignments.set(postId, authorId);
    this.saveAssignments();

    return authorId;
  }
}

// Export a singleton instance
export const postAuthorManager = new PostAuthorManager();
