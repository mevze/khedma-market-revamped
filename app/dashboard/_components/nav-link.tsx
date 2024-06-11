"use client";

import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { HTMLAttributes, ReactNode } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronRightIcon } from "@radix-ui/react-icons";

interface RootProps extends HTMLAttributes<HTMLDivElement> {}
const Root = ({ className, children }: RootProps) => {
  return (
    <div
      className={cn(
        "divide-muted-foreground/30 flex flex-col divide-y",
        className,
      )}
    >
      {children}
    </div>
  );
};

interface SectionProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactNode;
}
const Section = ({ className, children, title, ...rest }: SectionProps) => {
  return (
    <section className={cn("flex flex-col py-6", className)} {...rest}>
      {title && (
        <div className="select-none text-sm font-semibold text-muted-foreground">
          {title}
        </div>
      )}
      <div className={cn("flex flex-col gap-y-1.5", title && "mt-2")}>
        {children}
      </div>
    </section>
  );
};

interface AccordianItemProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, "children"> {
  type: "accordian";
  startContent?: ReactNode;
  items: NavLinkItemProps[];
  label: string;
  className?: string;
  defaultExpanded?: boolean;
}
interface NavLinkItemProps extends Omit<LinkProps, "children"> {
  startContent?: ReactNode;
  endContent?: ReactNode;
  type: "link";
  href: string;
  label: ReactNode;
  className?: string;
}

interface CustomItemProps {
  content: ReactNode;
  type: "custom";
}

type ItemProps = NavLinkItemProps | AccordianItemProps | CustomItemProps;

const Item = (props: ItemProps) => {
  if (props.type === "accordian") {
    const {
      startContent,
      label,
      items,
      defaultExpanded = false,
      className,
      type,
      ...rest
    } = props;
    return (
      <div>
        <Accordion.Root
          type="single"
          collapsible
          defaultValue={defaultExpanded ? label : undefined}
        >
          <Accordion.Item value={label}>
            <Accordion.Header>
              <Accordion.Trigger asChild>
                <button
                  className={cn(
                    // common styles/resets
                    "group flex w-full cursor-pointer items-center justify-between gap-2 rounded-sm border border-transparent px-4 py-2 font-medium lg:font-[550] text-muted-foreground ring ring-transparent transition-[color,background-color] duration-200 focus-visible:outline-none",
                    // inactive link: hover-state
                    "hover:bg-muted-900/5 dark:hover:bg-muted-900/20",
                    // active link: focus-state
                    "focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-opacity-60 focus-visible:ring-offset-1",
                    // extras
                    className,
                  )}
                  {...rest}
                >
                  <div className="flex items-center gap-2">
                    {startContent && <div>{startContent}</div>}
                    <div>{label}</div>
                  </div>
                  <div>
                    <ChevronRightIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-[&[data-state=open]]:rotate-90" />
                  </div>
                </button>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden p-2 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
              <div className="border-muted-foreground/30 flex flex-col gap-y-1.5 border-l pl-2">
                {items.map((item) => (
                  <Item key={item.href} {...item} type="link" />
                ))}
              </div>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </div>
    );
  }
  if (props.type === "link") {
    const { startContent, endContent, label, className, href, ...rest } = props;
    const pathname = usePathname();
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={cn(
          // common styles/resets
          "flex w-full items-center gap-2 rounded-sm border border-transparent px-4 py-2 font-medium lg:font-[550] text-muted-foreground ring ring-transparent transition-[color,background-color] duration-200 focus-visible:outline-none",
          // inactive link: hover-state
          "hover:bg-muted-900/5 dark:hover:bg-muted-900/20",
          // active link: focus-state
          "focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-opacity-60 focus-visible:ring-offset-1",
          isActive &&
            "cm-shadow border border-muted-foreground/30 bg-background text-foreground dark:bg-muted-900/10",
          // active link: hover-state
          isActive && "hover:bg-background/90 hover:dark:bg-muted-900/15",
          // extras
          endContent && "justify-between",
          className,
        )}
        {...rest}
      >
        <div className="flex items-center gap-2">
          {startContent && <div>{startContent}</div>}
          <div>{label}</div>
        </div>
        {endContent && <div>{endContent}</div>}
      </Link>
    );
  }
  if (props.type === "custom") {
    return props.content;
  }
};

export { Section, Item, Root };
export type {
  SectionProps,
  NavLinkItemProps,
  ItemProps,
  AccordianItemProps,
  RootProps,
};
