import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
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
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-8">
        <section className="bg-background py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Contact
            </h1>
            <div className="flex flex-col gap-6 max-w-md">
              {contactLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group border border-border bg-card p-6 hover:border-accent transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-muted group-hover:bg-accent/10 border border-border group-hover:border-accent/20 transition-colors">
                        <Icon className="text-foreground group-hover:text-accent transition-colors" size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-serif text-xl font-bold text-foreground mb-1 group-hover:text-accent transition-colors">
                          {link.label}
                        </h3>
                        <p className="text-sm font-mono text-muted-foreground mb-2">
                          {link.handle}
                        </p>
                      </div>
                    </div>
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
