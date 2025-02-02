import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { authors } from '@/lib/data/authors';

const CSV_PATH = path.join(process.cwd(), 'data', 'post-authors.csv');

// Load assignments from CSV
async function loadAssignments(): Promise<Map<string, string>> {
  const assignments = new Map<string, string>();
  
  try {
    await fs.access(CSV_PATH);
  } catch {
    // File doesn't exist, create it
    const dir = path.dirname(CSV_PATH);
    try {
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(CSV_PATH, 'post_id,author_id\n');
    } catch (error) {
      console.error('Error creating CSV file:', error);
    }
    return assignments;
  }

  try {
    const content = await fs.readFile(CSV_PATH, 'utf-8');
    const lines = content.split('\n').slice(1); // Skip header

    lines.forEach(line => {
      if (line.trim()) {
        const [post_id, author_id] = line.split(',');
        assignments.set(post_id.trim(), author_id.trim());
      }
    });
  } catch (error) {
    console.error('Error reading CSV file:', error);
  }

  return assignments;
}

// Save assignments to CSV
async function saveAssignments(assignments: Map<string, string>) {
  try {
    let content = 'post_id,author_id\n';
    assignments.forEach((author_id, post_id) => {
      content += `${post_id},${author_id}\n`;
    });
    await fs.writeFile(CSV_PATH, content);
  } catch (error) {
    console.error('Error saving CSV file:', error);
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');

    if (!postId) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }

    const assignments = await loadAssignments();
    let authorId = assignments.get(postId);

    // If no author assigned, assign one randomly
    if (!authorId) {
      const randomIndex = Math.floor(Math.random() * authors.length);
      authorId = authors[randomIndex].id;
      assignments.set(postId, authorId);
      await saveAssignments(assignments);
    }

    return NextResponse.json({ authorId });
  } catch (error) {
    console.error('Error in authors API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
