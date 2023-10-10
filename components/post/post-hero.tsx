import { Post } from "@/types/collection";
import Image from "next/image";
import PostContent from "./post-content";

interface Props {
  post: Post;
  locale: string;
}

const PostHero: React.FC<Props> = ({ post, locale }) => {
  return (
    <div>
      <PostContent locale={locale} isPostPage post={post} />
      <Image
        src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/${post.image}?key=optimised`}
        alt={post.title}
        width={2000}
        height={1000}
        className="rounded-md object-cover object-center h-[300px] md:h-[500px] mt-6"
      />
    </div>
  );
};

export default PostHero;
