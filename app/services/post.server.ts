import { db } from "./db.server";
import type { Post } from "@prisma/client";

export async function getPosts(): Promise<Post[]> {
  return db.post.findMany();
}
