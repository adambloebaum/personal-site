import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { blogs } from "@/data/blogs";
import { ArrowLeft } from "lucide-react";
import biomechanicsImage from "@/assets/blog-biomechanics.jpg";
import computerVisionImage from "@/assets/blog-computer-vision.jpg";
import dataEngineeringImage from "@/assets/blog-data-engineering.jpg";

const BlogPost = () => {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === id);

  const imageMap: Record<string, string> = {
    "blog-biomechanics": biomechanicsImage,
    "blog-computer-vision": computerVisionImage,
    "blog-data-engineering": dataEngineeringImage,
  };

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 pt-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Blog post not found</h1>
            <Link to="/blog" className="text-accent hover:underline">
              Return to blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-16">
        <article className="bg-background py-16 lg:py-24">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <Link 
              to="/blog" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to blog
            </Link>

            <div className="mb-8">
              <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                <time>{blog.date}</time>
                <span>•</span>
                <span>{blog.readTime} read</span>
              </div>
              
              <h1 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-6">
                {blog.title}
              </h1>
              
              <p className="text-xl text-muted-foreground">
                {blog.summary}
              </p>
            </div>

            <div className="aspect-video mb-12 border border-border overflow-hidden bg-muted">
              <img 
                src={imageMap[blog.image]} 
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="prose prose-lg max-w-none">
              <div 
                className="text-foreground leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br />') }}
              />
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
