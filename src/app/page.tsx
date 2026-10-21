import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Programs from "@/components/Programs";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Partners from "@/components/Partners";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-background font-sans text-foreground">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Programs />
        <Projects />
        <Partners />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
