import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/emails/utils";
import { config } from "@/emails/config";
import MagicLinkEmail from "@/emails/templates/magic-link";
import ResetPasswordEmail from "@/emails/templates/reset-password";

export async function POST(request: NextRequest) {
  const { email, name, link } = await request.json();
  console.log(email, name, link);
  let res = await resend.emails.send({
    from: config.from,
    to: email,
    react: (
      <ResetPasswordEmail
        name={name}
        link={link}
        expiresAt={new Date(Date.now() + 6 * 60 * 60 * 1000)}
      />
    ),
    subject: `Resetting your ${config.name} account password!`,
  });
  // Send email
  return NextResponse.json(
    { message: "Email sent successfully", data: res.data, error: res.error },
    { status: 200 },
  );
}
// random secret
// openssl rand -base64 32
