import { generateId } from "lucia";
import { db } from "../db";

export async function getEmailVerificationToken(userId: string) {
  // Delete any existing tokens
  await db.emailVerificationToken.deleteMany({
    where: {
      userId,
    },
  });

  const verificationToken = generateId(64);
  let res = await db.emailVerificationToken.create({
    data: {
      token: verificationToken,
      userId,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours
    },
  });

  return res;
}

export async function generatePasswordResetToken(userId: string) {
  // Delete any existing tokens
  await db.passwordResetToken.deleteMany({
    where: {
      userId,
    },
  });

  const resetToken = generateId(64);
  let res = await db.passwordResetToken.create({
    data: {
      token: resetToken,
      userId,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 3), // 3 hours
    },
  });

  return res;
}
