import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WorkCard from "@/components/WorkCard";
import { works } from "@/lib/works";
import batTrackingPatentImage from "@/assets/bat-tracking-patent/1.jpg";

const Works = () => {
  // Add your work images here following the same pattern as blogs
  const workImageMap: Record<string, string> = {
    "bat-tracking-patent": batTrackingPatentImage,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 pt-8">
        <section className="bg-background py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="mb-12">
              <h1 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Works
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {works.map((work) => (
                <WorkCard
                  key={work.id}
                  id={work.id}
                  title={work.title}
                  summary={work.summary}
                  date={work.date}
                  type={work.type}
                  tags={work.tags}
                  url={work.url}
                  pdfUrl={work.pdfUrl}
                  logo={work.logo}
                  image={workImageMap[work.image] || ''}
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

export default Works;
