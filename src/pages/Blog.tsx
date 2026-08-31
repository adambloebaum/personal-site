import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { blogs } from "@/lib/blogs";

const Blog = () => {
  return (
    <div className="min-h-[100svh] flex flex-col relative">
      <AnimatedBackground variant="constellation" />

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
                Blog
              </h1>
            </div>

            <div className="flex flex-col divide-y divide-white/[0.06]">
              {blogs.map((blog) => (
                <Link
                  key={blog.id}
                  to={`/blog/${blog.id}`}
                  className="group flex items-start gap-6 py-5 px-4 -mx-4 rounded-md hover:bg-white/[0.03] transition-colors duration-150"
                >
                  <time className="hidden sm:block text-xs font-mono text-muted-foreground w-24 flex-shrink-0 pt-1">
                    {blog.date}
                  </time>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-150">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                      {blog.summary}
                    </p>
                    <div className="sm:hidden flex items-center gap-2 text-xs font-mono text-muted-foreground mt-2">
                      <time>{blog.date}</time>
                      <span>·</span>
                      <span>{blog.readTime}</span>
                    </div>
                  </div>
                  <span className="hidden sm:block text-xs font-mono text-muted-foreground/70 flex-shrink-0 pt-1">
                    {blog.readTime}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
