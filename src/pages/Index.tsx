import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";

const heroCta =
  "px-5 py-2.5 text-sm font-mono rounded-md border border-white/15 text-foreground/75 " +
  "hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-colors duration-200";

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
          <section className="relative z-10 min-h-[100svh] flex items-center justify-center">
            <div className="max-w-3xl mx-auto px-6 lg:px-8 pb-16">
              <div className="opacity-0 animate-fade-up">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-[-0.03em] text-foreground text-center">
                  Adam Bloebaum
                </h1>
              </div>

              {/* Equal-weight outer columns pin the divider to the true center,
                  so it lines up with the gap between the buttons below. */}
              <div className="opacity-0 animate-fade-up delay-1 mt-6">
                <p className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-baseline gap-x-3 text-lg md:text-xl text-muted-foreground tracking-wide">
                  <span className="text-right">Driveline R&D</span>
                  <span className="text-white/20">|</span>
                  <span className="text-left">MiLB Pitcher</span>
                </p>
              </div>

              <div className="opacity-0 animate-fade-up delay-2 mt-10 flex flex-wrap items-center justify-center gap-3">
                <Link to="/works" className={heroCta}>
                  My work
                </Link>
                <Link to="/blog" className={heroCta}>
                  My blog
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
