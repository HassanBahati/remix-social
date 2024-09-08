import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { Post } from "@prisma/client";
import { getPosts } from "~/services/post.server";
import PostCard from "~/components/post-card";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix Social" },
    { name: "description", content: "Welcome to Remix Social!" },
  ];
};

export const loader: LoaderFunction = async () => {
  const posts = await getPosts();
  return json(posts);
};

export default function Index() {
  const posts = useLoaderData<Post[]>();
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-grow overflow-auto p-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="flex justify-between  items-baseline ">
            <h2 className="text-3xl font-bold">Recent Posts</h2>
            <Link to={"/posts"} className="text-sm underline">
              View All Posts
            </Link>
          </div>
          {posts?.length > 0 ? (
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
