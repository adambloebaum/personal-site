import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-16">
        <section className="bg-background py-16 lg:py-24">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-8">
              About Me
            </h1>

            <div className="prose prose-lg max-w-none space-y-6 text-foreground leading-relaxed">
              <p className="text-xl text-muted-foreground">
                I'm an applied quantitative engineer living at the intersection of sports, physics, and data science.
              </p>

              <p>
                Currently, I work as an Applied Quantitative Engineer at <span className="font-medium text-foreground">Driveline Baseball</span>, 
                where I develop biomechanics analysis systems, computer vision models, and data pipelines that help professional 
                athletes optimize their performance. Our work combines high-speed motion capture, sensor fusion, and machine learning 
                to understand the physics of pitching at a level that wasn't possible even a few years ago.
              </p>

              <p>
                I'm also a minor league baseball player for the <span className="font-medium text-foreground">Washington Nationals</span>, 
                which gives me a unique perspective on both sides of sports performance technology—as someone who builds the systems 
                and as someone who uses them to improve.
              </p>

              <h2 className="font-serif text-2xl font-bold text-foreground mt-12 mb-4">Education</h2>

              <p>
                I completed my undergraduate work in <span className="font-medium text-foreground">Physics and Data Science</span> at the 
                University of Washington, where I developed a foundation in mathematical modeling and statistical analysis. 
                I'm currently pursuing my <span className="font-medium text-foreground">Master of Science in Analytics</span> at 
                Georgia Tech, focusing on advanced machine learning and computational methods.
              </p>

              <h2 className="font-serif text-2xl font-bold text-foreground mt-12 mb-4">Technical Work</h2>

              <p>
                My day-to-day work spans several interconnected domains:
              </p>

              <ul className="space-y-2 ml-6 list-disc text-muted-foreground">
                <li><span className="text-foreground font-medium">Data Engineering:</span> Building scalable pipelines for processing millions of data points from sensors and cameras</li>
                <li><span className="text-foreground font-medium">Biomechanics:</span> Analyzing human movement patterns and kinetic chains in athletic performance</li>
                <li><span className="text-foreground font-medium">Machine Learning:</span> Developing predictive models and pattern recognition systems</li>
                <li><span className="text-foreground font-medium">Computer Vision:</span> Real-time pose estimation and motion analysis from video</li>
              </ul>

              <p>
                I'm particularly interested in making advanced technology accessible—finding ways to deliver enterprise-grade 
                analysis tools that work with consumer hardware and can scale from individual athletes to entire organizations.
              </p>

              <h2 className="font-serif text-2xl font-bold text-foreground mt-12 mb-4">Beyond the Lab</h2>

              <p>
                When I'm not analyzing pitches or writing code, I'm usually thinking about the broader implications of technology 
                in sport. How do we balance data-driven insights with intuition and feel? What does it mean to optimize human 
                performance when we can measure everything? These questions drive a lot of my work and writing.
              </p>

              <p className="text-muted-foreground italic border-l-2 border-accent pl-6 mt-8">
                Feel free to reach out if you want to discuss biomechanics, data engineering, machine learning, or 
                the intersection of technology and athletics.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
