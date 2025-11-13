import { SiGithub, SiLinkedin, SiX } from "react-icons/si";
import { MdMail } from "react-icons/md";

const Footer = () => {
  const socialLinks = [
    { icon: SiX, href: "https://x.com/bl0ebaum", label: "X" },
    { icon: SiLinkedin, href: "https://www.linkedin.com/in/adambloebaum/", label: "LinkedIn" },
    { icon: SiGithub, href: "https://github.com/adambloebaum", label: "GitHub" },
  ];

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Adam Bloebaum. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
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
                  <Icon size={20} />
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
