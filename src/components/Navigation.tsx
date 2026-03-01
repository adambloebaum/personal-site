import { NavLink } from "@/components/NavLink";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/blog", label: "Blog" },
    { to: "/works", label: "Works" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-5xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-12">
          <NavLink
            to="/"
            className="text-xs font-mono font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Adam Bloebaum
          </NavLink>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className="px-3 py-1.5 text-xs font-mono rounded text-muted-foreground hover:text-foreground/80 transition-colors border border-transparent"
                activeClassName="bg-[rgba(55,185,145,0.15)] text-[rgb(90,220,175)] border-[rgba(55,185,145,0.3)]"
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-3 space-y-1 border-t border-white/10 pt-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors rounded border border-transparent"
                activeClassName="bg-[rgba(55,185,145,0.15)] text-[rgb(90,220,175)] border-[rgba(55,185,145,0.3)]"
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
