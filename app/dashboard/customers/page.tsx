import { ThemeToggle } from "@/components/theme-toggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
const CustomersPage = () => {
  return (
    <div className="flex h-full w-full flex-col space-y-4">
      <header className="flex w-full items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild className="font-medium">
                <Link href="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium">Customers</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div>
          <ThemeToggle />
        </div>
      </header>
      <main className="flex flex-col space-y-4">
        <div>
          <h1 className="font-ranade text-2xl/7 font-[650] lg:text-3xl">
            Customers
          </h1>
          <p className="text-sm text-muted-foreground">
            Here you can see all your customers
          </p>
        </div>
        <div>{/* content goes here */}</div>
      </main>
    </div>
  );
};

export default CustomersPage;
