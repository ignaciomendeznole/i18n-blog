import { getDictionary } from "@/lib/dictionary";
import { getReadingTime, getRelativeDate } from "@/lib/helpers";
import { Post } from "@/types/collection";
import { ArrowRight } from "lucide-react";

interface Props {
  post: Post;
  locale: string;
  isPostPage?: boolean;
}

const PostContent: React.FC<Props> = async ({
  post,
  isPostPage = false,
  locale,
}) => {
  const dictionary = await getDictionary(locale);

  return (
    <div className="space-y-2">
      {/* Tags */}
      <div
        className={`flex flex-wrap items-center gap-2 text-neutral-400 ${
          isPostPage ? "text-sm" : "text-xs @md:text-sm"
        }`}
      >
        <div
          className={`font-medium ${
            post.category.title === "Cities"
              ? "text-emerald-600"
              : "text-indigo-600"
          }`}
        >
          {post.category.title}
        </div>
        <div className="w-2 h-2 rounded-full bg-neutral-200" />
        <div>{`${post.author.first_name} ${post.author.last_name}`}</div>
        <div className="w-2 h-2 rounded-full bg-neutral-200" />
        {/* Reading time */}
        <div>{getReadingTime(post.body, locale)}</div>
        <div className="w-2 h-2 rounded-full bg-neutral-200" />
        {/* Date */}
        <div>{getRelativeDate(post.date_created, locale)}</div>
        <div className="w-2 h-2 rounded-full bg-neutral-200" />
      </div>
      {/* Title */}
      <h2
        className={`${
          isPostPage
            ? "text-2xl md:text-3xl lg:text-4xl"
            : "text-xl @md:text-2xl @lg:text-3xl"
        } font-medium`}
      >
        {post.title}
      </h2>
      {/* Description */}
      <p className="text-neutral-600 leading-snug text-base @lg:text-lg">
        {post.description}
      </p>
      {/* Read More */}
      {!isPostPage && (
        <div className="flex items-center gap-2 pt-3">
          {dictionary.buttons.readMore} <ArrowRight size={14} />
        </div>
      )}
    </div>
  );
};

export default PostContent;
