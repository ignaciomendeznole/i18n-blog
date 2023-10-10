import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";

interface Props {
  platform: string;
  url: string;
  isShareUrl?: boolean;
}

const SocialLink: React.FC<Props> = ({ platform, url, isShareUrl = false }) => {
  const getIcon = (platform: string) => {
    switch (platform) {
      case "github":
        return <Github size={18} />;
      case "linkedin":
        return <Linkedin size={18} />;
      case "youtube":
        return <Youtube size={18} />;
      case "instagram":
        return <Instagram size={18} />;
      case "facebook":
        return <Facebook size={18} />;
      case "twitter":
        return <Twitter size={18} />;
      default:
        return null;
    }
  };

  return (
    <Link href={url}>
      <div
        className={`${
          isShareUrl &&
          "py-2 px-3 bg-neutral-200 rounded-md text-neutral-600 hover:bg-neutral-800 hover:text-neutral-100 duration-100 ease-in-out transition-colors hover:cursor-pointer"
        }`}
      >
        {getIcon(platform)}
      </div>
    </Link>
  );
};

export default SocialLink;
