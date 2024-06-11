import { ThemeToggle } from "@/components/theme-toggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const DashboardPage = () => {
  
  return (
    <>
      <div className="flex h-full w-full flex-col space-y-4">
        <header className="flex w-full items-center justify-between">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage className="font-medium">
                  Dashboard
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div>
            <ThemeToggle />
          </div>
        </header>
        <main className="flex flex-1 flex-col space-y-8">
          <div>
            <h1 className="font-ranade text-2xl/7 font-[650] lg:text-3xl">
              Hello, John Doe
            </h1>
            <p className="text-sm text-muted-foreground">
              Here you can see an overview of recent activities on your account.
            </p>
          </div>
          {/* content goes here */}
          <div className="bg-muted/50 border-muted-foreground/20 h-[150dvh] w-full rounded-lg border p-4 py-8"></div>
        </main>
      </div>
    </>
  );
};

export default DashboardPage;
