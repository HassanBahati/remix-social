import { Link } from "@remix-run/react";
import CreatePostDialog from "./create-post-dialog";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-background shadow-md p-4">
      <div className="max-w-3xl mx-auto flex justify-between items-center">
        <Link to={"/"} className="text-3xl font-bold text-primary">
          Remix Social
        </Link>
        <CreatePostDialog />
      </div>
    </header>
  );
}
