import type { PropsWithChildren } from "react";

import * as Shell from "./_components/shell";
import * as NavLink from "./_components/nav-link";
import { Button } from "@/components/ui/button";
import { ExitIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Logo } from "@/lib/config";
import {
  AnalyticsIcon,
  CustomerSupportIcon,
  DashboardIcon,
  PackageIcon,
  SettingsIcon,
  ShoppingCartIcon,
  UsersIcon,
} from "@/components/icons";
import UserMenu from "./_components/user-menu";

const DashboardLayout = (props: PropsWithChildren) => {
  const generalLinks = [
    {
      label: "Dashboard",
      href: "/dashboard",
      type: "link",
      startContent: <DashboardIcon className="size-5" />,
    },
    {
      label: "Subscriptions",
      type: "link",
      href: "/dashboard/subscriptions",
      startContent: <PackageIcon className="size-5" />,
    },
    {
      label: "Customers",
      type: "link",
      href: "/dashboard/customers",
      startContent: <UsersIcon className="size-5" />,
    },
    {
      label: "Analytics",
      type: "link",
      startContent: <AnalyticsIcon className="size-5" />,
      href: "/dashboard/analytics",
    },
    {
      label: "Orders",
      href: "/dashboard/orders",
      startContent: <ShoppingCartIcon className="size-5" />,
    },
  ] as NavLink.ItemProps[];

  const userLinks = [
    {
      label: "Support",
      href: "/dashboard/support",
      startContent: <CustomerSupportIcon className="size-5" />,
      type: "link",
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      type: "link",
      startContent: <SettingsIcon className="mb-px size-5" />,
    },
  ] as NavLink.ItemProps[];

  return (
    <Shell.Root>
      <Shell.Navigation>
        {/* mobile nav */}
        <Shell.Header>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                size={"icon"}
                variant={"outline"}
                className="h-8 w-8 rounded-sm p-1"
              >
                <HamburgerMenuIcon className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side={"left"}>
              <div className="flex h-full flex-col justify-between gap-y-3 pt-8">
                <div className="flex flex-col gap-y-12">
                  <div className="mx-auto flex select-none items-end gap-x-3">
                    <Logo className="size-10" />
                    <div className="font-ranade text-3xl font-semibold tracking-tighter">
                      UI Boosts
                    </div>
                  </div>
                  <NavLink.Root>
                    <NavLink.Section title="General">
                      {generalLinks.map((link, idx) => (
                        <NavLink.Item key={idx} {...link} />
                      ))}
                    </NavLink.Section>
                    <NavLink.Section title="Account">
                      {userLinks.map((link, idx) => (
                        <NavLink.Item key={idx} {...link} />
                      ))}
                    </NavLink.Section>
                  </NavLink.Root>
                </div>
                <div className="w-full">
                  <Button className="w-full">Sign Out</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <div>
            <UserMenu />
          </div>
        </Shell.Header>
        {/* desktop nav */}
        <Shell.Sidebar>
          <div className="flex h-full flex-col justify-between gap-y-6">
            <div className="flex flex-col gap-y-16">
              <div className="mx-auto flex select-none items-end gap-x-3">
                <Logo className="size-10" />
                <div className="font-ranade text-3xl font-semibold tracking-tighter">
                  UI Boosts
                </div>
              </div>
              <NavLink.Root>
                <NavLink.Section title="General">
                  {generalLinks.map((link, idx) => (
                    <NavLink.Item {...link} key={idx} />
                  ))}
                </NavLink.Section>
                <NavLink.Section title="Account">
                  {userLinks.map((link, idx) => (
                    <NavLink.Item {...link} key={idx} />
                  ))}
                </NavLink.Section>
              </NavLink.Root>
            </div>
            <form
              action={async () => {
                "use server";
                console.log("Sign out");
              }}
            >
              <Button type="submit" className="w-full">
                <ExitIcon className="mr-2" />
                Sign Out
              </Button>
            </form>
          </div>
        </Shell.Sidebar>
      </Shell.Navigation>

      <Shell.Content>
        {props.children}
      </Shell.Content>
    </Shell.Root>
  );
};

export default DashboardLayout;
