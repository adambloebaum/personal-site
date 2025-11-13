import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import aboutMeImage from "@/assets/about-me.jpg";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 pt-8">
        <section className="bg-background py-16 lg:py-24">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            {/* Title spans full width */}
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-12 text-center lg:text-left">
              About Me
            </h1>

            {/* Split text + image */}
            <div className="flex flex-col lg:flex-row items-start gap-12">
              {/* Text Section */}
              <div className="flex-1 space-y-6 prose prose-lg max-w-none text-foreground leading-relaxed">
                <p>
                  I work as an Applied Quantitative Engineer at{" "}
                  <span className="font-medium text-foreground">
                    Driveline Baseball
                  </span>
                  , developing predictive biomechanics models, creating computer
                  vision tools, building robust data pipelines, and creating
                  deliverables that help push player development forward.
                </p>

                <p>
                  I'm also a minor league pitcher for the{" "}
                  <span className="font-medium text-foreground">
                    Washington Nationals
                  </span>
                  , giving me a unique perspective as both a builder and a user
                  of the tools we create to enhance performance.
                </p>

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

              {/* Image Section */}
              <div className="flex-1 flex justify-center lg:justify-end">
                <img
                  src={aboutMeImage}
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
