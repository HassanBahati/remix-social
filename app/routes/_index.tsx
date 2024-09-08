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
    <div className="font-sans p-4">
      <h1 className="text-3xl">Welcome to Remix</h1>
      <ul>
        {posts.map((post, index) => {
          return (
            <li key={index}>
              <div>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
