import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { Post } from "@prisma/client";
import { getPosts } from "~/services/post.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Welcome to Remix Social
      </h1>
      <ul className="w-full max-w-3xl bg-white rounded-lg shadow-md p-4">
        {posts.map((post, index) => (
          <li
            key={index}
            className="mb-6 border-b last:border-b-0 pb-4 last:pb-0"
          >
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">
              {post.title}
            </h2>
            <p className="text-gray-700">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
