// app/posts/[slug]/page.tsx
import Image from 'next/image';
import apolloClient from '../../../lib/apollo-client';
import { GET_POST_BY_SLUG, GET_POSTS } from '../../../lib/queries';

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  date: string;
  excerpt?: string;
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

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Für bessere SEO - generiert statische Seiten zur Build-Zeit
export async function generateStaticParams() {
  const { data } = await apolloClient.query({
    query: GET_POSTS,
    variables: { first: 100 } // Alle Posts für Static Generation
  });

  return data.posts.nodes.map((post: Post) => ({
    slug: post.slug,
  }));
}

// Metadata für SEO  
export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const { data } = await apolloClient.query({
    query: GET_POST_BY_SLUG,
    variables: { slug }
  });

  const post: Post = data.postBy;

  return {
    title: post?.title || 'Post not found',
    description: post?.excerpt?.replace(/<[^>]*>/g, '').substring(0, 160) || '',
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const { data } = await apolloClient.query({
    query: GET_POST_BY_SLUG,
    variables: { slug }
  });

  const post: Post = data.postBy;

  if (!post) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-gray-900">Post not found</h1>
        <p className="text-gray-600 mt-4">The post you&apos;re looking for doesn&apos;t exist.</p>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <div className="flex items-center text-gray-600 text-sm">
          <span>By {post.author.node.name}</span>
          <span className="mx-2">•</span>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('de-DE')}
          </time>
        </div>
      </header>

      {post.featuredImage && (
        <div className="mb-8">
          <Image
            src={post.featuredImage.node.sourceUrl} 
            alt={post.featuredImage.node.altText || post.title}
            width={800}
            height={400}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>
      )}

      <div 
        className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700"
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />
    </article>
  );
}