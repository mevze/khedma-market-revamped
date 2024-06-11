"use server";

import { Scrypt, generateId } from "lucia";
import { db } from "../db";
import { z } from "zod";
import { lucia } from "./index";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { paths } from "../constants";
import { loginSchema } from "./validators/loginSchema";
import { signupSchema } from "./validators/signupSchema";
import { resetPasswordSchema } from "./validators/resetPasswordSchema";
import { validateRequest } from "./validate-request";
import { absoluteUrl, getInitialsAvatarUrl } from "../utils";
import { sendMail } from "@/emails/utils";
import VerificationEmail from "@/emails/templates/verify-email";
import { generatePasswordResetToken, getEmailVerificationToken } from "./utils";
import PasswordResetEmail from "@/emails/templates/reset-password";
import { config } from "@/emails/config";
import { createServerAction } from "zsa";


export const loginAction = createServerAction()
  .input(loginSchema)
  .handler(async ({ input }) => {
    const { email, password } = input;

    const existingUser = await db.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!existingUser) {
      throw new Error("The email or password is incorrect.");
    }

    if (!existingUser || !existingUser?.hashedPassword) {
      throw new Error("The email or password is incorrect.");
    }

    const validPassword = await new Scrypt().verify(
      existingUser.hashedPassword,
      password,
    );

    if (!validPassword) {
      throw new Error("The email or password is incorrect.");
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return {
      success: true,
      data: {
        message: "Logged in successfully, redirecting...",
      },
    };
  });

export const signupAction = createServerAction()
  .input(signupSchema)
  .handler(async ({ input }) => {
    const { email, password, firstName, lastName } = input;

    const existingUser = await db.user.findFirst({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      throw new Error("Cannot create account with that email.");
    }

    const userId = generateId(21);
    const hashedPassword = await new Scrypt().hash(password);
    const avatarUrl = firstName ? getInitialsAvatarUrl(firstName) : null;

    await db.user.create({
      data: {
        id: userId,
        firstName,
        lastName,
        avatar: avatarUrl,
        email,
        hashedPassword,
      },
    });

    const verificationToken = await getEmailVerificationToken(userId);

    await sendMail({
      to: email,
      subject: "Verify your email address",
      template: (
        <VerificationEmail
          name={firstName ? firstName : undefined}
          link={absoluteUrl(`${paths.VERIFY_EMAIL}/${verificationToken.token}`)}
          expiresAt={verificationToken.expiresAt}
        />
      ),
    });

    return {
      success: true,
      data: {
        message: "Account created. Please verify your email.",
      },
    };
  });

export const logoutAction = createServerAction().handler(async () => {
  const { session } = await validateRequest();
  if (!session) {
    return redirect(paths.SIGN_IN);
  }

  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return redirect(paths.SIGN_IN);
});

export const verifyEmailAction = createServerAction()
  .input(z.object({ token: z.string() }))
  .handler(async ({ input }) => {
    const { token } = input;

    const dbToken = await db.$transaction(async (tx) => {
      const item = await tx.emailVerificationToken.findFirst({
        where: {
          token,
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
            },
          },
        },
      });

      // Delete the token, so it can't be used again
      if (item) {
        await tx.emailVerificationToken.delete({
          where: {
            id: item.id,
          },
        });
      }

      return item;
    });

    if (!dbToken) {
      throw new Error("Invalid verification link");
    }

    if (dbToken.expiresAt < new Date()) {
      throw new Error(
        "Verification link has expired. Please request a new one.",
      );
    }

    await lucia.invalidateUserSessions(dbToken.userId); // this will log out the user, so they can log back in with the verified email

    await db.user.update({
      where: {
        id: dbToken.userId,
      },
      data: {
        emailVerified: true,
      },
    });

    return {
      success: true,
    };
  });

export const sendPasswordResetLinkAction = createServerAction()
  .input(z.object({ email: z.string().email("Provided email is invalid.") }))
  .handler(async ({ input }) => {
    const { email } = input;

    const user = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (!user || !user.emailVerified) {
      throw new Error("Provided email is invalid.");
    }

    const verificationToken = await generatePasswordResetToken(user.id);

    await sendMail({
      to: user.email,
      subject: `Reset Your Password for ${config.name}`,
      template: (
        <PasswordResetEmail
          name={user.firstName ? user.firstName : undefined}
          link={absoluteUrl(
            `${paths.RESET_PASSWORD}/${verificationToken.token}`,
          )}
          expiresAt={verificationToken.expiresAt}
        />
      ),
    });

    return {
      success: true,
      data: {
        message: "Password reset link sent, please check your email.",
      },
    };
  });

export const resetPasswordAction = createServerAction()
  .input(resetPasswordSchema)
  .handler(async ({ input }) => {
    const { token, password } = input;

    const dbToken = await db.$transaction(async (tx) => {
      const item = await tx.passwordResetToken.findFirst({
        where: {
          token,
        },
      });

      // Delete the token, so it can't be used again
      if (item) {
        await tx.passwordResetToken.delete({
          where: {
            id: item.id,
          },
        });
      }

      return item;
    });

    if (!dbToken) {
      throw new Error("Invalid password reset link");
    }

    if (dbToken.expiresAt < new Date()) {
      throw new Error("Password reset link has expired");
    }

    await lucia.invalidateUserSessions(dbToken.userId);

    const hashedPassword = await new Scrypt().hash(password);

    await db.user.update({
      where: {
        id: dbToken.userId,
      },
      data: {
        hashedPassword,
      },
    });

    const session = await lucia.createSession(dbToken.userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return {
      success: true,
      data: {
        message: "Password reset successfully, redirecting...",
      },
    };
  });
