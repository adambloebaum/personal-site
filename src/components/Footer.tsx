import { SiGithub, SiLinkedin, SiX } from "react-icons/si";

const Footer = () => {
  const socialLinks = [
    { icon: SiX, href: "https://x.com/bl0ebaum", label: "X" },
    { icon: SiLinkedin, href: "https://www.linkedin.com/in/adambloebaum/", label: "LinkedIn" },
    { icon: SiGithub, href: "https://github.com/adambloebaum", label: "GitHub" },
  ];

  return (
    <footer className="relative z-10 border-t border-border/50">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Adam Bloebaum
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={link.label}
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
