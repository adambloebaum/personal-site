import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const Contact = () => {
  const contactLinks = [
    {
      icon: Twitter,
      label: "Twitter",
      handle: "@adambloebaum",
      href: "https://twitter.com",
      description: "Thoughts on data science, engineering, and baseball"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      handle: "Adam Bloebaum",
      href: "https://linkedin.com",
      description: "Professional background and connections"
    },
    {
      icon: Github,
      label: "GitHub",
      handle: "abloebaum",
      href: "https://github.com",
      description: "Open source projects and code samples"
    },
    {
      icon: Mail,
      label: "Email",
      handle: "adam@example.com",
      href: "mailto:adam@example.com",
      description: "For inquiries and collaboration"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-16">
        <section className="bg-background py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground mb-12">
              I'm always interested in discussing biomechanics, data engineering, machine learning, or collaborative opportunities.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
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
                        <p className="text-sm text-muted-foreground">
                          {link.description}
                        </p>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>

            <div className="mt-12 border border-border bg-muted/30 p-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                Collaboration Interests
              </h2>
              <p className="text-muted-foreground mb-4">
                I'm particularly interested in discussions around:
              </p>
              <ul className="space-y-2 text-muted-foreground ml-6 list-disc">
                <li>Sports biomechanics and performance optimization</li>
                <li>Computer vision applications in athletic training</li>
                <li>Scalable data engineering for sensor networks</li>
                <li>Machine learning for time-series and motion analysis</li>
                <li>The intersection of physics and data science</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
