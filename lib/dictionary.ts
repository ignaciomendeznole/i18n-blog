const dictionaries = {
  en: () => import("../dictionaries/en.json").then((m) => m.default),
  de: () => import("../dictionaries/de.json").then((m) => m.default),
};

export const getDictionary = async (locale: string) => {
  if (!locale || locale === undefined) {
    return dictionaries["en"]();
  }

  return dictionaries[locale as keyof typeof dictionaries]();
};
