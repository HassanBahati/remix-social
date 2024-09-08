import { Post } from "@prisma/client";
import { json, LoaderFunction } from "@remix-run/node";
import { useParams } from "react-router-dom";
import { getPostById, getPosts } from "~/services/post.server";
import { Link, useLoaderData } from "@remix-run/react";
import PostCard from "~/components/post-card";

export const loader: LoaderFunction = async () => {
  const posts = await getPosts();
  return json(posts);
};

export default function PostDetails() {
  const posts = useLoaderData<Post[]>();
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-grow overflow-auto p-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl font-bold">All Posts</h2>

          {posts ? (
            <div className="space-y-6 flex flex-col">
              {posts.map((post) => (
                <PostCard key={post.id} {...post} />
              ))}
            </div>
          ) : (
            <span>No posts found!</span>
          )}
        </div>
      </main>
    </div>
  );
}
