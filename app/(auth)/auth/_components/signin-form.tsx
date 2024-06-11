"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/custom-input2";
import { LoginInput, loginSchema } from "@/lib/auth/validators/loginSchema";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { GitHubIcon, GoogleIcon, SpinnerIcon } from "@/components/icons";
import { useServerAction } from "zsa-react";
import { loginAction } from "@/lib/auth/actions";
import Callout from "@/components/ui/callout";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export default function SignInForm() {
  const { isPending, execute, data, error } = useServerAction(loginAction, {
    onFinish(result) {
      if (result) {
        console.log("result", result);
      }
    },
  });

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (values: LoginInput) => {
    execute(values);
  };

  return (
    <div className="w-full space-y-4">
      <div className="grid w-full grid-cols-2 gap-x-4">
        <Button
          className="flex w-full items-center gap-1.5"
          variant={"outline"}
        >
          <GoogleIcon className="h-4 w-4" />
          Google
        </Button>
        <Button
          className="flex w-full items-center gap-1.5"
          variant={"outline"}
        >
          <GitHubIcon className="h-4 w-4" />
          GitHub
        </Button>
      </div>
      <div className="flex items-center justify-between">
        <Separator className="w-[45%]" />
        <p className="px-2 text-sm text-muted-foreground">OR</p>
        <Separator className="w-[45%]" />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset className="w-full space-y-4" disabled={isPending}>
            <div className="flex w-full flex-col space-y-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email@example.com" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex w-full items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <Link
                        href="#"
                        className="text-sm font-medium text-accent-foreground underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        placeholder="••••••"
                        className="font-sans"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {error && (
              <Callout variant={"danger"}>
                <ExclamationTriangleIcon className="h-4 w-4" />
                <p>{error.message}</p>
              </Callout>
            )}
            <Button type="submit" className="w-full">
              {isPending ? (
                <div className="flex items-center gap-1">
                  <SpinnerIcon className="h-5 w-5 animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign in"
              )}
            </Button>
          </fieldset>
        </form>
      </Form>
      <div className="mt-4 flex w-full items-center justify-center">
        <p className="text-sm">
          Don't have an account?{" "}
          <Link href="/auth/sign-up" className="font-medium underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
