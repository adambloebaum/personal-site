import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import { blogs } from "@/lib/blogs";
import thinkingAlikeImage from "@/assets/thinking-alike/2.jpg";
import tendonAdaptationsImage from "@/assets/tendon-adaptations/1.jpg";

const Blog = () => {
  const imageMap: Record<string, string> = {
    "blog-thinking-alike": thinkingAlikeImage,
    "blog-tendon-adaptations": tendonAdaptationsImage,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-8">
        <section className="bg-background py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="mb-12">
              <h1 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Blog
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogs.map((blog) => (
                <BlogCard
                  key={blog.id}
                  id={blog.id}
                  title={blog.title}
                  summary={blog.summary}
                  date={blog.date}
                  readTime={blog.readTime}
                  image={imageMap[blog.image]}
                  tags={blog.tags}
                />
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
