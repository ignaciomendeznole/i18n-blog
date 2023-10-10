export interface SiteConfig {
  siteName: string;
  description: string;
  author: string;
  currentlyAt: string;
  socialLinks: {
    instagram: string;
    youtube: string;
    github: string;
    linkedin: string;
  };
}

const siteConfig: SiteConfig = {
  siteName: "Explorer",
  author: "Ignacio Mendez",
  description:
    "A minimal and lovely travel blog which shares experiences and citiest around the world!",
  currentlyAt: "Budaptest",
  socialLinks: {
    instagram: "https://www.instagram.com/ignamendezz/",
    youtube: "https://www.youtube.com/@makrdev",
    github: "https://github.com/ignaciomendeznole",
    linkedin: "https://www.linkedin.com/in/ignaciomendeznole/",
  },
};

export default siteConfig;
