import Link from "next/link";
import PaddingContainer from "../layout/padding-container";
import { getDictionary } from "@/lib/dictionary";
import LangSwitcher from "./lang-switcher";

interface Props {
  locale: string;
}

const Navigation: React.FC<Props> = async ({ locale }) => {
  const dictionary = await getDictionary(locale);
  return (
    <div className="z-[999] border-b sticky top-0 left-0 right-0 bg-white bg-opacity-50 background-blur-md">
      <PaddingContainer>
        <div className="py-5 flex items-center justify-between">
          <Link className="text-lg font-bold" href={`/${locale}`}>
            Explorer
          </Link>
          {/* Category Links */}
          <nav>
            <ul className="flex items-center gap-4 text-neutral-600 ">
              <li>
                <LangSwitcher locale={locale} />
              </li>
              <li>
                <Link href={`/${locale}/category/cities`}>
                  {dictionary.navigation.links.cities}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/category/experiences`}>
                  {dictionary.navigation.links.experiences}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </PaddingContainer>
    </div>
  );
};

export default Navigation;
