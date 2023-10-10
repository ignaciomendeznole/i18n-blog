import PaddingContainer from "@/components/layout/padding-container";
import PostList from "@/components/post/post-list";
import directus from "@/lib/directus";
import { Post } from "@/types/collection";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  try {
    const categories = await directus.items("category").readByQuery({
      fields: ["slug"],
      filter: {
        status: {
          _eq: "published",
        },
      },
    });

    if (!categories.data) {
      return [];
    }

    const params = categories?.data?.map((category) => ({
      slug: category.slug as string,
      lang: "en",
    }));

    const localizedParams = categories?.data?.map((category) => ({
      slug: category.slug as string,
      lang: "de",
    }));

    const allParams = params?.concat(localizedParams ?? []);

    return allParams || [];
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching categories");
  }
}

export default async function Page({
  params,
}: {
  params: { slug: string; lang: string };
}) {
  const locale = params.lang;
  const getCategory = async (): Promise<Post[]> => {
    try {
      const category = await directus.items("category").readByQuery({
        fields: [
          "*",
          "translations.*",
          "post.*",
          "post.author.*",
          "post.category.*",
          "post.translations.*",
        ],
        filter: {
          slug: {
            _eq: params.slug,
          },
        },
      });

      if (!category.data) {
        return [];
      }

      if (locale === "en") {
        return category.data?.[0];
      }

      const fetchedCategory = category.data?.[0];

      const localizedCategory = {
        ...fetchedCategory,
        title: fetchedCategory.translations.find(
          (translation: any) => translation.languages_id === locale
        ).title,
        description: fetchedCategory.translations.find(
          (translation: any) => translation.languages_id === locale
        ).description,
        post: fetchedCategory.post.map((post: any) => ({
          ...post,
          title: post.translations.find(
            (translation: any) => translation.languages_code === locale
          ).title,
          description: post.translations.find(
            (translation: any) => translation.languages_code === locale
          ).description,
          body: post.translations.find(
            (translation: any) => translation.languages_code === locale
          ).body,
          category: {
            ...post.category,
            title: fetchedCategory.translations.find(
              (translation: any) => translation.languages_id === locale
            ).title,
          },
        })),
      };

      return localizedCategory;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching category");
    }
  };

  const category = (await getCategory()) as unknown as {
    title: string;
    description: string;
    post: Post[];
    slug: string;
  };

  console.log({ category });

  if (!category) {
    notFound();
  }

  return (
    <PaddingContainer>
      <div className="mb-10">
        <h1 className="text-4xl font-semibold">{category.title}</h1>
        <p className="text-lg text-neutral-600">{category.description}</p>
      </div>
      <PostList locale={locale} posts={category.post} />
    </PaddingContainer>
  );
}
