import { Logo } from "@/lib/config";
import AuthLayout from "../_components/auth-layout";
import SignInForm from "../_components/signin-form";

const SignInPage = () => {
  return (
    <AuthLayout>
      <div className="grid h-screen w-full grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex h-full w-full flex-col items-center justify-center p-8">
          <div className="flex w-full max-w-sm flex-col space-y-6">
            <div>
              <Logo className="h-12 w-12" />
            </div>
            <div className="items-center justify-center">
              <h1 className="font-ranade text-4xl font-bold">Welcome back!</h1>
              <p className="text-sm text-muted-foreground">
                Sign in to your account to continue
              </p>
            </div>
            <div className="w-full">
              <SignInForm />
            </div>
          </div>
        </div>
        <div className="hidden w-full p-4 md:flex">
          <div className="h-full w-full flex-col items-center justify-center overflow-hidden rounded-md bg-muted p-4">
            <div className="ojb flex h-full w-full items-center justify-center">
              <img
                src="/placeholder.svg"
                alt="Sign in image"
                className="aspect-square max-w-[95%] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignInPage;
