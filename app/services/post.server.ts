import { db } from "./db.server";
import type { Post } from "@prisma/client";

export async function getPosts(): Promise<Post[]> {
  return db.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getPostById(id: string): Promise<Post | null> {
  return db.post.findUnique({
    where: { id },
  });
}

export async function createPost(title: string, body: string): Promise<Post> {
  return db.post.create({
    data: {
      title,
      body,
      published: false,
    },
  });
}
