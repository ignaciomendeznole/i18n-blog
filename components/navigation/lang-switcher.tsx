"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  locale: string;
}

const LangSwitcher: React.FC<Props> = ({ locale }) => {
  const pathname = usePathname();

  const redirectTarget = () => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = targetLanguage;
    return segments.join("/");
  };

  const targetLanguage = locale === "en" ? "de" : "en";

  return (
    <Link
      className="font-semibold"
      locale={targetLanguage}
      href={redirectTarget()}
    >
      <span>{targetLanguage === "en" ? "🇬🇧" : "🇩🇪"}</span>
      {targetLanguage.toUpperCase()}
    </Link>
  );
};

export default LangSwitcher;
