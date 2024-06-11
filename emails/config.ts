import dotenv from "dotenv";
dotenv.config();

export const config = {
  name: "UI Boosts",
  from: "UI Boosts <contact@uiboosts.com>",
  replyTo: "UI Boosts <no-reply@uiboosts.com>",
  logo: "https://www.uiboosts.com/logo/colored-light.png",
  baseURL: process.env.BASE_URL as string,
  links: {
    privacy: "/privacy",
    terms: "/terms",
  },
  socials: {
    twitter: "https://twitter.com/uiboosts",
    facebook: "https://facebook.com/uiboosts",
    instagram: "https://instagram.com/uiboosts",
  },
};
