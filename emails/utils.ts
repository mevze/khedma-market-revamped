import type { TailwindConfig } from "@react-email/tailwind";
import { Resend } from "resend";
import { intervalToDuration, formatDuration } from "date-fns";
import dotenv from "dotenv";
import { config } from "./config";
dotenv.config();

/**
 *  Resend instance
 */
export const resend = new Resend(process.env.RESEND_API_KEY!);

/**
 * Email configuration
 */
export const tailwindConfig: TailwindConfig = {
  theme: {
    fontSize: {
      xs: ["12px", { lineHeight: "16px" }],
      sm: ["14px", { lineHeight: "20px" }],
      base: ["16px", { lineHeight: "24px" }],
      lg: ["18px", { lineHeight: "28px" }],
      xl: ["20px", { lineHeight: "28px" }],
      "2xl": ["24px", { lineHeight: "32px" }],
      "3xl": ["30px", { lineHeight: "36px" }],
      "4xl": ["36px", { lineHeight: "36px" }],
      "5xl": ["48px", { lineHeight: "1" }],
      "6xl": ["60px", { lineHeight: "1" }],
      "7xl": ["72px", { lineHeight: "1" }],
      "8xl": ["96px", { lineHeight: "1" }],
      "9xl": ["144px", { lineHeight: "1" }],
    },
    spacing: {
      px: "1px",
      0: "0",
      0.5: "2px",
      1: "4px",
      1.5: "6px",
      2: "8px",
      2.5: "10px",
      3: "12px",
      3.5: "14px",
      4: "16px",
      5: "20px",
      6: "24px",
      7: "28px",
      8: "32px",
      9: "36px",
      10: "40px",
      11: "44px",
      12: "48px",
      14: "56px",
      16: "64px",
      20: "80px",
      24: "96px",
      28: "112px",
      32: "128px",
      36: "144px",
      40: "160px",
      44: "176px",
      48: "192px",
      52: "208px",
      56: "224px",
      60: "240px",
      64: "256px",
      72: "288px",
      80: "320px",
      96: "384px",
    },
    colors: {
      background: "#ffffff",
      foreground: "#0a0a0a",
      primary: {
        DEFAULT: "#171717",
        foreground: "#fafafa",
      },
      muted: {
        DEFAULT: "#f5f5f5",
        foreground: "#737373",
      },
    },
  },
} satisfies TailwindConfig;

/**
 * @param  {Date} start
 * @param  {Date} end
 * @description Custom format duration, takes start and end time and returns formatted duration
 * @example toHumanReadableDiff({start: 0, end: 1000}) => "16 minutes and 40 seconds"
 * @returns
 */
export const toHumanReadableDiff = ({
  start,
  end,
}: {
  start: Date;
  end: Date;
}) => {
  const durations = intervalToDuration({ start, end });
  // this to remove the seconds from the duration
  delete durations.seconds;
  let formatted = formatDuration(durations, {
    delimiter: ", ",
    zero: false,
    format: ["days", "hours", "minutes"],
  });
  // replace the last comma with "and"
  return formatted.replace(/,([^,]*)$/, " and$1");
};

interface SendMailProps {
  to: string;
  subject: string;
  template: React.ReactElement;
}

export const sendMail = async (
  props: SendMailProps,
): Promise<ReturnType<typeof resend.emails.send>> => {
  let { to, subject, template } = props;
  return await resend.emails.send({
    from: config.from,
    to,
    reply_to: config.replyTo,
    subject,
    react: template,
  });
};
