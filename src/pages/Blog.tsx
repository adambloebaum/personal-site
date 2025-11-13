import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import { blogs } from "@/data/blogs";
import biomechanicsImage from "@/assets/blog-biomechanics.jpg";
import computerVisionImage from "@/assets/blog-computer-vision.jpg";
import dataEngineeringImage from "@/assets/blog-data-engineering.jpg";

const Blog = () => {
  const imageMap: Record<string, string> = {
    "blog-biomechanics": biomechanicsImage,
    "blog-computer-vision": computerVisionImage,
    "blog-data-engineering": dataEngineeringImage,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-16">
        <section className="bg-background py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="mb-12">
              <h1 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Blog
              </h1>
              <p className="text-lg text-muted-foreground">
                Technical writing on engineering, data science, biomechanics, and the intersection of technology and sport.
              </p>
            </div>

            <div className="space-y-8">
              {blogs.map((blog) => (
                <BlogCard
                  key={blog.id}
                  id={blog.id}
                  title={blog.title}
                  summary={blog.summary}
                  date={blog.date}
                  readTime={blog.readTime}
                  image={imageMap[blog.image]}
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
