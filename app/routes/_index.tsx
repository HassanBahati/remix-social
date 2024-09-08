import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { Post } from "@prisma/client";
import { getPosts } from "~/services/post.server";
import PostCard from "~/components/post-card";

import CreatePostDialog from "~/components/create-post-dialog";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix Social" },
    { name: "description", content: "Welcome to Remix Social!" },
  ];
};

export const loader: LoaderFunction = async () => {
  const posts = await getPosts();
  if (!posts) {
    return [{ title: "first", body: "My first post" }];
  }
  return json(posts);
};

export default function Index() {
  const posts = useLoaderData<Post[]>();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-10 bg-background shadow-md p-4">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary">Remix Social</h1>
          <CreatePostDialog />
        </div>
      </header>
      <main className="flex-grow overflow-auto p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {posts ? (
            posts.map((post) => <PostCard key={post.id} {...post} />)
          ) : (
            <span>No posts found!</span>
          )}
        </div>
      </main>
    </div>
  );
}
