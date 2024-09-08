import React from "react";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Link } from "@remix-run/react";
import formatDateTime from "~/lib/utils";

type PostProps = {
  id: string;
  title: string;
  body: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function PostCard({
  id,
  title,
  body,
  updatedAt,
  createdAt,
  published,
}: PostProps) {
  return (
    <Link to={`/posts/${id}`}>
      <Card className="overflow-hidden transition-all duration-200 hover:shadow-xl">
        <CardContent className="p-6">
          {title && (
            <h2 className="text-2xl font-bold text-primary mb-3 line-clamp-2">
              {title}
            </h2>
          )}
          {body && (
            <p className="text-muted-foreground mb-4 line-clamp-3">{body}</p>
          )}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Badge variant={published ? "default" : "secondary"}>
                {published ? "Published" : "Draft"}
              </Badge>
              <div className="flex items-center">
                <CalendarIcon className="w-4 h-4 mr-1" />
                <span>{formatDateTime(createdAt)}</span>
              </div>
            </div>
            {updatedAt && (
              <div className="flex items-center">
                <ClockIcon className="w-4 h-4 mr-1" />
                <span>Updated: {formatDateTime(updatedAt)}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
