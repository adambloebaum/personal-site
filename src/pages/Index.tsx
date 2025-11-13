import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import { getFeaturedBlogs } from "@/lib/blogs";
import heroImage from "@/assets/home.jpg";
import thinkingAlikeImage from "@/assets/thinking-alike/2.jpg";
import tendonAdaptationsImage from "@/assets/tendon-adaptations/1.jpg";

const Index = () => {
  const imageMap: Record<string, string> = {
    "blog-thinking-alike": thinkingAlikeImage,
    "blog-tendon-adaptations": tendonAdaptationsImage,
  };

  const featuredBlogs = getFeaturedBlogs();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-8">
        {/* Hero Section */}
          <section className="relative bg-background border-b border-border">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-8 lg:pb-12 pt-16 lg:pt-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight">
                  Engineering Tomorrow
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Applied quantitative engineer at Driveline Baseball. Minor league pitcher for the Washington Nationals.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">                  
                  Biomechanics, computer vision, and anything I find interesting.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">                  
                  Currently learning about:
                </p>
                <div className="flex flex-wrap gap-3 text-sm">
                  <span className="px-3 py-1 bg-muted text-foreground rounded">Motor Learning</span>
                  <span className="px-3 py-1 bg-muted text-foreground rounded">Neuroscience</span>
                  <span className="px-3 py-1 bg-muted text-foreground rounded">Algorithmic Trading</span>
                  <span className="px-3 py-1 bg-muted text-foreground rounded">Energy Flow</span>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-video border border-border overflow-hidden bg-card">
                  <img 
                    src={heroImage} 
                    alt="Home Hero Image"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Blog Posts */}
        <section className="bg-background pt-8 lg:pt-12 pb-16 lg:pb-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-2">
                  Highlights
                </h2>
                <p className="text-muted-foreground">
                  My best projects and writing
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredBlogs.map((blog) => (
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

export default Index;
