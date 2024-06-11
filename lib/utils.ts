import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { env } from "./env";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return new URL(path, env.BASE_URL).href;
}

export function getInitialsAvatarUrl(name: string) {
  return `https://api.dicebear.com/8.x/initials/svg?fontSize=40&seed=${name}`;
}
