import { Post } from "@prisma/client";
import { json, LoaderFunction } from "@remix-run/node";
import { useParams } from "react-router-dom";
import { getPostById } from "~/services/post.server";
import { Link, useLoaderData } from "@remix-run/react";
import { Card, CardContent } from "~/components/ui/card";

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.postId) {
    throw new Error("Post ID is required");
  }
  const post = await getPostById(params.postId);

  if (!post) {
    return <p>Post not found</p>;
  }
  return json(post);
};

export default function PostDetails() {
  const { postId } = useParams();
  const post = useLoaderData<Post>();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="max-w-3xl w-full rounded-lg overflow-hidden space-y-8">
        <div className="flex justify-between  items-baseline ">
          <h2 className="text-3xl font-bold">Post Details</h2>
          <Link to={"/posts"} className="text-sm underline">
            View All Posts
          </Link>
        </div>
        <Card className="p-6  bg-white shadow-lg">
          <CardContent>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            <p className="text-gray-700 mb-6">{post.body}</p>
            <div className="text-sm text-gray-500">
              <p className="mb-2">
                <span className="font-semibold">Published:</span>{" "}
                {post.published ? "Yes" : "No"}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Created at:</span>{" "}
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
              {post.updatedAt && (
                <p>
                  <span className="font-semibold">Updated at:</span>{" "}
                  {new Date(post.updatedAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
