import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import WorkCard from "@/components/WorkCard";
import { getFeaturedBlogs } from "@/lib/blogs";
import { getFeaturedWorks } from "@/lib/works";

const Index = () => {
  const blogImageMap: Record<string, string> = {
    "blog-tendon-adaptations": "/images/tendon-adaptations/1.jpg",
    "blog-energy-flow": "/images/energy-flow/1.jpg",
  };

  const workImageMap: Record<string, string> = {
    "bat-tracking-patent": "/images/bat-tracking-patent/1.jpg",
  };

  const featuredBlogs = getFeaturedBlogs();
  const featuredWorks = getFeaturedWorks();

  // Combine blogs and works, sorted by date
  const allFeatured = [...featuredBlogs, ...featuredWorks].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

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
                  Science, technology, training, and anything I find interesting.
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
                    src="/images/home.jpg"
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
                  My best work
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allFeatured.map((item) => {
                // Check if it's a blog post (has readTime property)
                if ('readTime' in item) {
                  return (
                    <BlogCard
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      summary={item.summary}
                      date={item.date}
                      readTime={item.readTime}
                      image={blogImageMap[item.image]}
                      tags={item.tags}
                    />
                  );
                } else {
                  // It's a work item
                  return (
                    <WorkCard
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      summary={item.summary}
                      date={item.date}
                      type={item.type}
                      tags={item.tags}
                      url={item.url}
                      pdfUrl={item.pdfUrl}
                      logo={item.logo}
                      image={workImageMap[item.image] || ''}
                    />
                  );
                }
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
