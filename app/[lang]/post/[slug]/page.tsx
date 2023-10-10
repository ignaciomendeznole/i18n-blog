import { notFound } from "next/navigation";
import PaddingContainer from "@/components/layout/padding-container";
import PostHero from "@/components/post/post-hero";
import SocialLink from "@/components/elements/social-link";
import PostBody from "@/components/post/post-body";
import CtaCard from "@/components/elements/cta-card";
import directus from "@/lib/directus";
import { Post } from "@/types/collection";

export async function generateStaticParams() {
  try {
    const posts = await directus.items("post").readByQuery({
      fields: ["slug"],
      filter: {
        status: {
          _eq: "published",
        },
      },
    });

    if (!posts.data) {
      return [];
    }

    const params = posts.data.map((post) => ({
      slug: post.slug as string,
      lang: "en",
    }));

    const deParams = posts.data.map((post) => ({
      slug: post.slug as string,
      lang: "de",
    }));

    const allParams = params.concat(deParams ?? []);

    return allParams || [];
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching posts");
  }
}

export default async function Page({
  params,
}: {
  params: { slug: string; lang: string };
}) {
  const locale = params.lang;
  const getPost = async () => {
    try {
      const post = await directus.items("post").readByQuery({
        fields: [
          "*",
          "author.*",
          "category.*",
          "translations.*",
          "category.translations.*",
        ],
        filter: {
          slug: {
            _eq: params.slug,
          },
        },
      });

      if (!post.data) {
        return [];
      }

      const postData = post.data?.[0];

      if (locale === "en") {
        return postData;
      }

      const localizedPost = {
        ...postData,
        title: postData.translations.find(
          (translation: any) => translation.language_code === locale
        ).title,
        description: postData.translations.find(
          (translation: any) => translation.language_code === locale
        ).description,
        body: postData.translations.find(
          (translation: any) => translation.language_code === locale
        ).body,
        category: {
          ...postData.category,
          title: postData.category.translations.find(
            (translation: any) => translation.language_code === locale
          ).title,
        },
      };

      return localizedPost;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching post");
    }
  };

  const post = (await getPost()) as Post;

  if (!post) {
    notFound();
  }

  return (
    <PaddingContainer>
      {/* Container */}
      <div className="space-y-10">
        {/* Post Hero */}
        <PostHero locale={locale} post={post} />
        {/* Post Body and Social Share */}
        <div className="flex flex-col md:flex-row gap-10">
          <div className="relative">
            <div className="sticky top-20 items-center flex md:flex-col gap-5">
              <div className="font-medium md:hidden">Share this content</div>
              <SocialLink
                platform="linkedin"
                isShareUrl
                url={`https://www.linkedin.com/shareArticle?mini=true&url=${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}
            }`}
              />
              <SocialLink
                platform="twitter"
                isShareUrl
                url={`https://twitter.com/intent/tweet?url=${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`}
              />
              <SocialLink
                platform="facebook"
                isShareUrl
                url={`https://www.facebook.com/sharer/sharer.php?u=${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`}
              />
            </div>
          </div>
          <div className="h-[1200px] w-full">
            <PostBody body={post.body} />
          </div>
        </div>
        <CtaCard locale={locale} />
      </div>
    </PaddingContainer>
  );
}
