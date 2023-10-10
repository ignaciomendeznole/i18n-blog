import siteConfig from "@/config/site";
import PaddingContainer from "../layout/padding-container";
import Link from "next/link";
import SocialLink from "../elements/social-link";
import { getDictionary } from "@/lib/dictionary";

const SOCIAL_LINKS = [
  {
    platform: "github",
    url: siteConfig.socialLinks.github,
  },
  {
    platform: "linkedin",
    url: siteConfig.socialLinks.linkedin,
  },
  {
    platform: "youtube",
    url: siteConfig.socialLinks.youtube,
  },
  {
    platform: "instagram",
    url: siteConfig.socialLinks.instagram,
  },
];

interface Props {
  locale: string;
}

const Footer: React.FC<Props> = async ({ locale }) => {
  const dictionary = await getDictionary(locale);
  return (
    <div className="py-6 border-t mt-10">
      <PaddingContainer>
        <div>
          <h2 className="text-3xl font-bold">{siteConfig.siteName}</h2>
          <p className="max-w-md mt-2 text-lg text-neutral-700">
            {dictionary.footer.description}
          </p>
        </div>
        {/* Social media and currently at */}
        <div className="flex flex-wrap justify-between gap-4 mt-6">
          <div>
            <div className="text-lg font-medium">#exploretheworld</div>
            <div className="flex items-center gap-3 text-neutral-600 mt-2">
              {SOCIAL_LINKS.map((socialLink) => (
                <SocialLink
                  key={socialLink.platform}
                  platform={socialLink.platform}
                  url={socialLink.url}
                />
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm text-neutral-400">
              {dictionary.footer.currentlyAtText}
            </div>
            <div className="px-3 py-2 bg-white shadow-md rounded-md flex items-center gap-2">
              <div className="bg-emerald-600 rounded-full w-2 h-2" />
              {siteConfig.currentlyAt}
            </div>
          </div>
        </div>
        {/* Bottom Section */}
        <div className="border-t py-3 flex items-center flex-wrap justify-between gap-4 mt-16">
          <div className="text-sm text-neutral-400">
            {dictionary.footer.rightsText} {new Date().getFullYear()}{" "}
          </div>
          <div className="text-sm">
            {dictionary.footer.creatorText}{" "}
            <Link
              href="https://github.com/ignaciomendeznole"
              className="underline underline-offset-4"
            >
              {siteConfig.author}
            </Link>
          </div>
        </div>
      </PaddingContainer>
    </div>
  );
};

export default Footer;
