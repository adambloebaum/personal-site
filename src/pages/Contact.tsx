import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { SiGithub, SiLinkedin, SiX } from "react-icons/si";

const Contact = () => {
  const contactLinks = [
    {
      icon: SiX,
      label: "X",
      handle: "@bl0ebaum",
      href: "https://x.com/bl0ebaum",
    },
    {
      icon: SiLinkedin,
      label: "LinkedIn",
      handle: "Adam Bloebaum",
      href: "https://www.linkedin.com/in/adambloebaum/",
    },
    {
      icon: SiGithub,
      label: "GitHub",
      handle: "adambloebaum",
      href: "https://github.com/adambloebaum",
    }
  ];

  return (
    <div className="min-h-[100svh] flex flex-col relative">
      <AnimatedBackground variant="voronoi" />

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
            <h1 className="font-sans text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Contact
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
              {contactLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center text-center border border-border bg-card/80 backdrop-blur-sm p-6 rounded-lg hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="p-3 bg-muted/50 group-hover:bg-primary/10 border border-border group-hover:border-primary/20 rounded-md transition-colors mb-3">
                      <Icon className="text-foreground group-hover:text-primary transition-colors" size={22} />
                    </div>
                    <h3 className="font-sans text-base font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {link.label}
                    </h3>
                    <p className="text-xs font-mono text-muted-foreground">
                      {link.handle}
                    </p>
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

export default Contact;
