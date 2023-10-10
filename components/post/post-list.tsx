import { Post } from "@/types/collection";
import PostCard, { Layout } from "./post-card";

interface Props {
  posts: Post[];
  locale: string;
  layout?: Layout;
}

const PostList: React.FC<Props> = ({ posts, layout, locale }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:grid-flow-col lg:auto-cols-fr">
      {posts.map((post) => (
        <PostCard locale={locale} key={post.id} post={post} layout={layout} />
      ))}
    </div>
  );
};

export default PostList;
