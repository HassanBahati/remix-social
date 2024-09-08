import { PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFetcher } from "@remix-run/react";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  body: z.string().min(1, { message: "Body is required." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreatePostDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const fetcher = useFetcher();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const handleCreatePost = async (data: FormValues) => {
    try {
      fetcher.submit(data, { method: "post", action: "/posts/new" });

      alert("Post created successfully!");
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      alert("Failed to create post!");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Create Post
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new post</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleCreatePost)} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => <Input placeholder="Title" {...field} />}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Body
            </label>
            <Controller
              name="body"
              control={control}
              render={({ field }) => <Textarea placeholder="Body" {...field} />}
            />
            {errors.body && (
              <p className="text-red-500 text-sm">{errors.body.message}</p>
            )}
          </div>
          <div className="flex justify-end">
            <Button type="submit">Create</Button>
          </div>{" "}
        </form>
      </DialogContent>
    </Dialog>
  );
}
