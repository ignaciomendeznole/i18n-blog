import { DUMMY_POSTS } from "@/DUMMY_DATA";
import CtaCard from "@/components/elements/cta-card";
import PaddingContainer from "@/components/layout/padding-container";
import PostCard from "@/components/post/post-card";
import PostList from "@/components/post/post-list";
import directus from "@/lib/directus";
import { notFound } from "next/navigation";

export default async function Home({ params }: { params: { lang: string } }) {
  const locale = params.lang;

  const getAllPosts = async () => {
    try {
      const posts = await directus.items("post").readByQuery({
        fields: ["*", "author.*", "translations.*", "category.translations.*"],
      });

      if (locale === "en") {
        return posts.data;
      }

      const localizedPosts = posts.data?.map((post) => {
        return {
          ...post,
          title: post.translations.find(
            (translation: any) => translation.languages_code === locale
          )?.title,
          description: post.translations.find(
            (translation: any) => translation.languages_code === locale
          )?.description,
          body: post.translations.find(
            (translation: any) => translation.languages_code === locale
          )?.body,
        };
      });

      return localizedPosts;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching posts");
    }
  };

  const posts = await getAllPosts();

  if (!posts) {
    notFound();
  }

  return (
    <PaddingContainer>
      <main className="h-auto space-y-10">
        <PostCard locale={locale} post={posts[0]} />
        <CtaCard locale={locale} />
      </main>
    </PaddingContainer>
  );
}
