import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ExternalLink, FileText } from "lucide-react";

const Projects = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-16">
        <section className="bg-background py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Projects
            </h1>
            <p className="text-lg text-muted-foreground mb-12">
              Selected work in biomechanics, machine learning, and sports technology.
            </p>

            <div className="space-y-12">
              {/* Patent */}
              <div className="border border-border bg-card p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-accent/10 border border-accent/20 rounded">
                    <FileText className="text-accent" size={24} />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
                      Biomechanical Analysis System Patent
                    </h2>
                    <p className="text-sm text-muted-foreground mb-4">
                      Patent Pending • 2024
                    </p>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Developed and patented a novel system for real-time biomechanical analysis in high-velocity athletic movements. 
                  The system combines computer vision, sensor fusion, and machine learning to provide immediate, actionable feedback 
                  to athletes and coaches without requiring expensive marker-based motion capture equipment.
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 text-xs bg-muted text-foreground rounded">Computer Vision</span>
                  <span className="px-3 py-1 text-xs bg-muted text-foreground rounded">Machine Learning</span>
                  <span className="px-3 py-1 text-xs bg-muted text-foreground rounded">Biomechanics</span>
                  <span className="px-3 py-1 text-xs bg-muted text-foreground rounded">Real-time Systems</span>
                </div>

                <div className="border-t border-border pt-4">
                  <h3 className="text-sm font-medium text-foreground mb-2">Key Innovations:</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground ml-6 list-disc">
                    <li>Markerless pose estimation accurate to sub-centimeter precision</li>
                    <li>Real-time processing at 240+ fps for high-speed movements</li>
                    <li>Scalable architecture from mobile devices to professional facilities</li>
                    <li>Integration with existing training workflows and equipment</li>
                  </ul>
                </div>
              </div>

              {/* Additional Projects */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="border border-border bg-card p-6">
                  <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                    Pitch Classification Model
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Multi-modal deep learning system for automatic pitch type classification using biomechanics 
                    and trajectory data. Achieves 97%+ accuracy in real-time classification.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs bg-muted text-foreground rounded">PyTorch</span>
                    <span className="px-2 py-1 text-xs bg-muted text-foreground rounded">Deep Learning</span>
                    <span className="px-2 py-1 text-xs bg-muted text-foreground rounded">Computer Vision</span>
                  </div>
                </div>

                <div className="border border-border bg-card p-6">
                  <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                    Motion Capture Pipeline
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    End-to-end data pipeline processing 100M+ frames monthly. Handles ingestion, processing, 
                    feature extraction, and serving with sub-100ms latency.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs bg-muted text-foreground rounded">Python</span>
                    <span className="px-2 py-1 text-xs bg-muted text-foreground rounded">Cloud Infrastructure</span>
                    <span className="px-2 py-1 text-xs bg-muted text-foreground rounded">Data Engineering</span>
                  </div>
                </div>

                <div className="border border-border bg-card p-6">
                  <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                    Injury Risk Prediction
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Statistical model correlating biomechanical markers with injury risk. Uses longitudinal 
                    tracking data to identify early warning signs.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs bg-muted text-foreground rounded">Statistical Modeling</span>
                    <span className="px-2 py-1 text-xs bg-muted text-foreground rounded">Time Series</span>
                    <span className="px-2 py-1 text-xs bg-muted text-foreground rounded">R</span>
                  </div>
                </div>

                <div className="border border-border bg-card p-6">
                  <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                    Performance Dashboard
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Interactive visualization platform for coaches and athletes. Real-time metrics, 
                    historical trends, and comparative analytics.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs bg-muted text-foreground rounded">React</span>
                    <span className="px-2 py-1 text-xs bg-muted text-foreground rounded">D3.js</span>
                    <span className="px-2 py-1 text-xs bg-muted text-foreground rounded">TypeScript</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Projects;
