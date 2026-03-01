import { ExternalLink, FileText } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { works } from "@/lib/works";

const Works = () => {
  return (
    <div className="min-h-[100svh] flex flex-col relative">
      <AnimatedBackground variant="topographic" />

      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, hsl(0 0% 4% / 0.6) 0%, hsl(0 0% 4% / 0.4) 20%, hsl(0 0% 4% / 0.5) 60%, hsl(0 0% 4% / 0.7) 100%)",
        }}
      />

      <Navigation />

      <main className="relative z-10 flex-1 pt-8">
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="mb-10">
              <h1 className="font-sans text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Works
              </h1>
            </div>

            <div className="flex flex-col divide-y divide-white/[0.06]">
              {works.map((work) => {
                const href =
                  work.type === "external-blog" || work.type === "project"
                    ? work.url
                    : work.pdfUrl;
                const Icon =
                  work.type === "external-blog" || work.type === "project"
                    ? ExternalLink
                    : FileText;

                return (
                  <a
                    key={work.id}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-6 py-5 px-4 -mx-4 rounded-lg hover:bg-white/[0.03] transition-colors duration-200"
                  >
                    <time className="hidden sm:block text-xs font-mono text-muted-foreground w-24 flex-shrink-0">
                      {work.date}
                    </time>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-300 truncate">
                        {work.title}
                      </h3>
                      <p className="text-sm text-muted-foreground truncate mt-1">
                        {work.summary}
                      </p>
                      <div className="sm:hidden flex items-center gap-2 text-xs font-mono text-muted-foreground mt-2">
                        <time>{work.date}</time>
                      </div>
                    </div>
                    <Icon
                      size={16}
                      className="text-muted-foreground group-hover:text-primary transition-colors duration-300 flex-shrink-0"
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Works;
