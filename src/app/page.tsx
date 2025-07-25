import apolloClient from '../lib/apollo-client';
import { GET_POSTS } from '../lib/queries';
export const revalidate = 0; // Immer fresh data
export const dynamic = 'force-dynamic';

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  author: {
    node: {
      name: string;
    };
  };
}

export default async function Home() {
  const { data } = await apolloClient.query({
    query: GET_POSTS,
    variables: { first: 10 }
  });

  const posts: Post[] = data.posts.nodes;

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Die Letzten Beiträge</h1>
      <div className="grid gap-6">
        {posts.map((post) => (
          <article key={post.id} className="border-b pb-6">
            <h2 className="text-2xl font-semibold mb-2">
              <a href={`/posts/${post.slug}`} className="hover:text-blue-600">
                {post.title}
              </a>
            </h2>
            <div className="text-gray-600 text-sm mb-4">
              By {post.author.node.name} • {new Date(post.date).toLocaleDateString()}
            </div>
            <div 
              className="text-gray-700" 
              dangerouslySetInnerHTML={{ __html: post.excerpt }}
            />
          </article>
        ))}
      </div>
    </div>
  );
}