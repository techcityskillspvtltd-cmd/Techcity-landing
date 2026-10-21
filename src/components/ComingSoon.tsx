import Navbar from "@/components/Navbar";

export default function ComingSoon() {
  return (
    <div className="flex min-h-svh flex-col bg-background font-sans text-foreground">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-5">
        <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-foreground/55">
          Coming soon
        </p>
      </main>
    </div>
  );
}
