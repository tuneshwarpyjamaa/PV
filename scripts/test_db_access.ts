
import { db } from '../src/lib/db';

async function main() {
  console.log('Testing DB access...');
  try {
    const posts = await db.post.findMany();
    console.log(`Successfully fetched ${posts.length} posts.`);
    if (posts.length > 0) {
      console.log('Sample post:', posts[0]);
    }
  } catch (error) {
    console.error('Error accessing DB:', error);
    process.exit(1);
  }
}

main();
