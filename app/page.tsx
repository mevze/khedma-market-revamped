import { ThemeToggle } from "../components/theme-toggle";

export default function Home() {
  return (
    <main className="container relative flex min-h-screen w-full flex-col items-center justify-center">
      <h1 className="text-balance bg-gradient-to-br from-black from-30% to-black/60 bg-clip-text py-6 text-center text-4xl font-semibold leading-none tracking-tighter text-transparent dark:from-white dark:to-white/40 sm:text-6xl md:text-7xl lg:text-7xl">
        Beautifully Designed UI Components for developers 
      </h1>
      <p className="font-hand text-muted-foreground">Coming soon!</p>
      <div className="absolute right-3 top-3">
        <ThemeToggle />
      </div>
    </main>
  );
}
