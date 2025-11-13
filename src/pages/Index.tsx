import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import { blogs } from "@/data/blogs";
import heroImage from "@/assets/hero-schematic.jpg";
import biomechanicsImage from "@/assets/blog-biomechanics.jpg";
import computerVisionImage from "@/assets/blog-computer-vision.jpg";
import dataEngineeringImage from "@/assets/blog-data-engineering.jpg";

const Index = () => {
  const imageMap: Record<string, string> = {
    "blog-biomechanics": biomechanicsImage,
    "blog-computer-vision": computerVisionImage,
    "blog-data-engineering": dataEngineeringImage,
  };

  const featuredBlogs = blogs.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative bg-background border-b border-border">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight">
                  Engineering at the Intersection of Data & Sport
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Applied quantitative engineer at Driveline Baseball. Minor league player for the Washington Nationals. 
                  Exploring biomechanics, machine learning, and the physics of performance.
                </p>
                <div className="flex flex-wrap gap-3 text-sm">
                  <span className="px-3 py-1 bg-muted text-foreground rounded">Physics</span>
                  <span className="px-3 py-1 bg-muted text-foreground rounded">Data Science</span>
                  <span className="px-3 py-1 bg-muted text-foreground rounded">Biomechanics</span>
                  <span className="px-3 py-1 bg-muted text-foreground rounded">ML/CV</span>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-video border border-border overflow-hidden bg-card">
                  <img 
                    src={heroImage} 
                    alt="Biomechanics schematic"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-border bg-background/80 backdrop-blur-sm flex items-center justify-center">
                  <p className="font-mono text-xs text-center px-4">
                    F = ma<br/>
                    <span className="text-muted-foreground">The foundation</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Blog Posts */}
        <section className="bg-background py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-2">
                  Recent Writing
                </h2>
                <p className="text-muted-foreground">
                  Thoughts on engineering, data science, and sports performance
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
