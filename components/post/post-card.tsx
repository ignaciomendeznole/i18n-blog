import Image from "next/image";
import Link from "next/link";

import { Post } from "@/types/collection";

import PostContent from "./post-content";

export type Layout = "horizontal" | "vertical";

interface Props {
  post: Post;
  locale: string;
  layout?: Layout;
  reverse?: boolean;
}

const PostCard: React.FC<Props> = ({
  post,
  layout = "horizontal",
  reverse = false,
  locale,
}) => {
  return (
    <Link
      className={`@container ${
        layout === "horizontal"
          ? "grid md:grid-cols-2 grid-cols-1 gap-10 items-center"
          : "space-y-10"
      }`}
      href={`${locale}/post/${post.slug}`}
    >
      {/* Post Image */}
      <Image
        className={`rounded-md w-full object-cover object-center h-full max-h-[300px] ${
          reverse && "md:order-last"
        }`}
        src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/${post.image}?key=optimised`}
        alt={post.title}
        width={600}
        height={300}
      />
      {/* Post Content */}
      <PostContent locale={locale} post={post} />
    </Link>
  );
};

export default PostCard;
