import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";

const About = () => {
  return (
    <div className="min-h-[100svh] flex flex-col relative">
      <AnimatedBackground variant="matrix" />

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
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            {/* Title spans full width */}
            <h1 className="font-sans text-4xl lg:text-5xl font-bold text-foreground mb-12 text-center lg:text-left">
              About Me
            </h1>

            {/* Split text + image */}
            <div className="flex flex-col lg:flex-row items-start gap-12">
              {/* Text Section - with inline images on mobile */}
              <div className="flex-1 space-y-6 prose prose-lg max-w-none text-foreground leading-relaxed">
                <p>
                  I work as an Applied Quantitative Engineer at{" "}
                  <span className="font-medium text-foreground">
                    Driveline Baseball
                  </span>
                  , developing predictive biomechanics models, creating computer
                  vision tools, building robust data pipelines, and crafting
                  products that help push player development forward.
                </p>

                {/* Image 1 - mobile only */}
                <div className="lg:hidden flex justify-center py-4">
                  <img
                    src="/images/about-me.jpg"
                    alt="About Me"
                    className="shadow-lg max-w-full object-cover"
                  />
                </div>

                <p>
                  I'm also a minor league pitcher for the{" "}
                  <span className="font-medium text-foreground">
                    Washington Nationals
                  </span>
                  , giving me a unique perspective as both a builder and a user
                  of the tools I create.
                </p>

                {/* Image 2 - mobile only */}
                <div className="lg:hidden flex justify-center py-4">
                  <img
                    src="/images/about-me2.jpg"
                    alt="About Me"
                    className="shadow-lg max-w-full object-cover"
                  />
                </div>

                <p>
                  I completed my undergraduate work in Physics and Data Science
                  at the{" "}
                  <span className="font-medium text-foreground">
                    University of Washington
                  </span>
                  , specializing in Biological Physics. While there, I developed
                  a strong math and science foundation and found interest in
                  machine learning.
                </p>

                <p>
                  I'm currently pursuing my Master of Science in Analytics at <span className="font-medium text-foreground">Georgia Tech</span>,
                  focusing on advanced modeling and high-performance computing.
                </p>
              </div>

              {/* Image Section - desktop only, stacked */}
              <div className="hidden lg:flex flex-1 flex-col gap-6 justify-start items-end">
                <img
                  src="/images/about-me.jpg"
                  alt="About Me"
                  className="shadow-lg max-w-full xlg:max-w-md object-cover"
                />
                <img
                  src="/images/about-me2.jpg"
                  alt="About Me"
                  className="shadow-lg max-w-full xlg:max-w-md object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
