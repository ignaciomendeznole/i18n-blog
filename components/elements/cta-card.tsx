/* eslint-disable react/no-unescaped-entities */

import Image from "next/image";
import directus from "@/lib/directus";
import { revalidateTag } from "next/cache";
import { useState } from "react";
import { getDictionary } from "@/lib/dictionary";

interface Props {
  locale: string;
}

const CtaCard: React.FC<Props> = async ({ locale }) => {
  const dictionary = await getDictionary(locale);

  // const [isHandlingSubmit, setIsHandlingSubmit] = useState(false);
  // const [email, setEmail] = useState("");

  // const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setEmail(e.target.value);
  // };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setIsHandlingSubmit(true);
  //   try {
  //     await directus.items("subscribers").createOne({
  //       email,
  //     });
  //     setEmail("");
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error("Something went wrong.");
  //   } finally {
  //     setIsHandlingSubmit(false);
  //   }
  // };

  const formAction = async (formData: FormData) => {
    "use server";
    try {
      const email = formData.get("email");

      await directus.items("subscribers").createOne({
        email,
      });

      revalidateTag("subscribers-count");
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong.");
    }
  };

  const getSubscribersNumber = async () => {
    const subscribersCount = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/items/subscribers?meta=total_count&access_token=${process.env.ADMIN_TOKEN}`,
      {
        next: {
          tags: ["subscribers-count"],
        },
      }
    )
      .then((res) => res.json())
      .then((res) => res.meta.total_count)
      .catch((err) => console.error(err));

    return subscribersCount;
  };

  const subscribersCount = await getSubscribersNumber();

  return (
    <div className="rounded-md bg-slate-100 py-10 px-6 relative overflow-hidden">
      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/95 via-white/70" />
      {/* Image */}
      <Image
        src="https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?ixid=MnwzODU2NTF8MHwxfHNlYXJjaHwxMXx8QW1hem9uJTIwZm9yZXN0fGVufDB8fHx8MTY3MDMyMjY1MA&ixlib=rb-4.0.3"
        fill
        alt="cta"
        className="object-cover object-center"
      />
      {/* Content Container */}
      <div className="relative z-20">
        <div className="font-medium text-lg">#exploretheworld</div>
        <h3 className="text-3xl font-semibold mt-3">
          {dictionary.ctaCard.title}
        </h3>
        <p className="mt-2 text-lg max-w-lg">
          {dictionary.ctaCard.description}
        </p>
        <form
          action={formAction}
          className="flex items-center w-full gap-2 mt-6"
        >
          <input
            name="email"
            type="email"
            className="w-full md:w-auto bg-white/80 placeholder:text-sm text-base rounded-md py-3 px-4 outline-none focus:ring-2 ring-neutral-600"
            placeholder="Write your email."
          />
          <button
            type="submit"
            className="whitespace-nowrap px-3 py-2 rounded-md bg-neutral-900 text-neutral-200"
          >
            {dictionary.ctaCard.button}
          </button>
        </form>
        {/* Subscribers */}
        <div className="mt-6 text-neutral-100 text-sm">
          <span className="font-medium">{subscribersCount}</span> people already
          subscribed.
        </div>
      </div>
    </div>
  );
};

export default CtaCard;
