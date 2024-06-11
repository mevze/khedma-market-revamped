import React, { PropsWithChildren } from "react";

const AuthLayout = (props: PropsWithChildren) => {
  return (
    <main className="flex bg-background h-dvh w-full flex-col items-center justify-center">
      {props.children}
    </main>
  );
};

export default AuthLayout;
