import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";

const Index = () => {
  return (
    <div className="min-h-[100svh] flex flex-col">
      <Navigation />

      <main className="flex-1">
        <div className="relative">
          <AnimatedBackground variant="starfield" />

          {/* Light veil for readability, fades out at bottom */}
          <div
            className="absolute inset-0 pointer-events-none z-[1]"
            style={{
              background:
                "linear-gradient(to bottom, hsl(0 0% 4% / 0.7) 0%, hsl(0 0% 4% / 0.35) 18%, transparent 40%, transparent 75%, hsl(0 0% 4% / 0.6) 90%, hsl(0 0% 4%) 100%)",
            }}
          />

          {/* Hero */}
          <section className="relative z-10 min-h-[100svh] flex items-start">
            <div className="max-w-3xl mx-auto px-6 lg:px-8 pt-36 lg:pt-44">
              <div className="opacity-0 animate-fade-up">
                <h1 className="gradient-text text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95] tracking-tight text-center">
                  Adam Bloebaum
                </h1>
              </div>

              <div className="opacity-0 animate-fade-up delay-1 mt-6">
                <p className="text-lg md:text-xl text-muted-foreground tracking-wide text-center max-w-xl mx-auto">
                  Driveline R&D <span className="mx-2 text-primary/30">|</span> MiLB Pitcher
                </p>
              </div>

              <div className="opacity-0 animate-fade-up delay-2 mt-8 text-center">
                <Link
                  to="/blog"
                  className="inline-block px-6 py-2.5 text-sm font-mono rounded-full border border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                >
                  Read my blog
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
