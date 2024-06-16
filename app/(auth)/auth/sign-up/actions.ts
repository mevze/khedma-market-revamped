'use server';

import { signUpSchema } from "@/lib/auth/validators/signupSchema";
import bcrypt from 'bcrypt';
import { db } from "@/lib/db";
import { createSession } from "@/lib/auth/session";

export async function signup(formData: any) {
  const validationResult = signUpSchema.safeParse({
    name: formData.name,
    lastname: formData.lastname,
    email: formData.email,
    password: formData.password,
    confirmPassword: formData.confirmPassword
  });

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { name, lastname, email, password } = validationResult.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const data = await db.user.create({
    data: { name, lastname, email, hashedPassword },
    select: { id: true }
  });

  const user = data;

  await createSession(user.id)

  return { user };
}
