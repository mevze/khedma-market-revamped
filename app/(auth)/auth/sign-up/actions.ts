'use server'

import { signUpSchema } from "@/lib/auth/validators/signupSchema";
import bcrypt from "bcrypt";
import { lucia } from "@/lib/db";
import { db } from "@/lib/db";
import React from "react";

export async function signup(formData: any) {
  const validationResult = signUpSchema.safeParse({
    name: formData.name,
    lastname: formData.lastname,
    email: formData.email,
    password: formData.password,
    confirmPassword: formData.confirmPassword,
  });

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { name, lastname, email, password } = validationResult.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Create user in the database
    const user = await db.user.create({
      data: {
        name,
        lastname,
        email,
        hashedPassword,
      },
      select: { id: true }, 
    });

    const session = await lucia.createSession(user.id, {});



    return { user };
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      errors: { signup: "Failed to create user" },
    };
  }
}
