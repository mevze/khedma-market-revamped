"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface RootProps extends HTMLAttributes<HTMLDivElement> {}
const Root = ({ className, children }: RootProps) => {
  return (
    <div
      className={cn(
        "grid min-h-dvh w-full grid-cols-1 gap-2 bg-muted p-2 dark:bg-background lg:fixed lg:grid-cols-[300px_1fr] lg:gap-4 lg:p-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

interface ContentProps extends HTMLAttributes<HTMLDivElement> {}
const Content = ({ className, children }: ContentProps) => {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-lg border border-border bg-background shadow-sm dark:bg-black/20",
        className,
      )}
    >
      <ScrollArea className={cn("flex h-full w-full flex-col", className)}>
        <div className="h-[calc(100dvh-5rem)] p-4 lg:h-[calc(100dvh-4rem)] lg:p-6">
          {children}
        </div>
      </ScrollArea>
    </div>
  );
};

interface NavigationProps extends HTMLAttributes<HTMLDivElement> {}
const Navigation = ({ className, children }: NavigationProps) => {
  return <>{children}</>;
};

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {}
const Header = ({ className, children }: HeaderProps) => {
  return (
    <header
      className={cn(
        "flex h-10 w-full items-center justify-between px-px lg:hidden",
        className,
      )}
    >
      {children}
    </header>
  );
};

interface SidebarProps extends HTMLAttributes<HTMLDivElement> {}
const Sidebar = ({ className, children }: SidebarProps) => {
  return (
    <aside
      className={cn(
        "hidden w-full flex-col rounded-lg bg-neutral-900 bg-transparent lg:flex",
        className,
      )}
    >
      <ScrollArea className="w-full">
        <div className="h-[calc(100dvh-2rem)] px-2 py-6">{children}</div>
      </ScrollArea>
    </aside>
  );
};

export { Root, Content, Navigation, Header, Sidebar };
export type {
  RootProps,
  ContentProps,
  NavigationProps,
  HeaderProps,
  SidebarProps,
};
