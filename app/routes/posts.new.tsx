import { ActionFunction, json, redirect } from "@remix-run/node";
import { createPost } from "~/services/post.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const body = formData.get("body") as string;

  if (typeof title !== "string" || typeof body !== "string") {
    return json({ error: "Invalid form data" }, { status: 400 });
  }

  try {
    await createPost(title, body);
  } catch (error) {
    console.error("Failed to create post:", error);
    return json({ error: "Failed to create post" }, { status: 500 });
  }
};

export default function NewPost() {
  return null;
}
