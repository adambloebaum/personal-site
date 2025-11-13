export interface Blog {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  readTime: string;
  image: string;
}

export const blogs: Blog[] = [
  {
    id: "biomechanics-data-driven-pitching",
    title: "The Physics of the Perfect Pitch: A Data-Driven Approach",
    summary: "Exploring how biomechanics and machine learning intersect to optimize pitching performance in professional baseball.",
    content: `# The Physics of the Perfect Pitch

In the world of professional baseball, the difference between a good pitch and a great pitch often comes down to milliseconds and millimeters. At Driveline Baseball, we use advanced biomechanics analysis and machine learning to understand these subtle differences.

## The Science Behind the Throw

Every pitch is a complex chain of kinetic events, starting from the ground up. The transfer of energy from the legs through the core and finally to the arm follows precise physical principles that we can measure and optimize.

### Key Biomechanical Factors

1. **Hip-Shoulder Separation**: The angular difference between hip and shoulder rotation
2. **Arm Slot Consistency**: Maintaining repeatable release points
3. **Ground Reaction Forces**: How force transfer begins at foot strike

## Machine Learning in Action

We've developed computer vision models that can analyze thousands of pitches in real-time, identifying patterns that are invisible to the human eye. This allows us to provide immediate feedback to athletes.

The integration of physics, data science, and sport is fascinating - and it's just the beginning of what's possible when engineering meets athletics.`,
    date: "2024-01-15",
    readTime: "5 min",
    image: "blog-biomechanics",
  },
  {
    id: "computer-vision-motion-capture",
    title: "Building Real-Time Motion Capture Systems with Computer Vision",
    summary: "How we leverage computer vision and pose estimation to create accessible motion analysis tools for athletes.",
    content: `# Real-Time Motion Capture at Scale

Traditional motion capture systems cost hundreds of thousands of dollars. We're building accessible alternatives using computer vision that work with standard cameras.

## The Technical Challenge

Pose estimation in dynamic sports environments presents unique challenges:
- High-speed movements (90+ mph pitches)
- Occlusion and varying lighting
- Need for sub-centimeter accuracy

## Our Approach

Using a combination of deep learning models and classical computer vision techniques, we've achieved accuracy comparable to marker-based systems at a fraction of the cost.

The key is in the training data and model architecture - but the results speak for themselves in improved athlete performance.`,
    date: "2023-12-08",
    readTime: "4 min",
    image: "blog-computer-vision",
  },
  {
    id: "data-engineering-sports-analytics",
    title: "Data Engineering at Scale: Lessons from Sports Analytics",
    summary: "Building robust data pipelines to process millions of sensor readings and video frames daily.",
    content: `# Data Engineering in High-Performance Sports

Every day, we process millions of data points from sensors, cameras, and tracking systems. Building infrastructure that can handle this scale while maintaining millisecond-level accuracy is a fascinating engineering challenge.

## The Stack

Our data pipeline includes:
- Real-time sensor data ingestion
- Video processing and storage
- Feature extraction and ML inference
- Analytics and visualization layers

## Challenges We've Solved

From handling network failures during live training sessions to optimizing video processing for immediate feedback, every piece of the system is critical.

The intersection of data engineering and sports performance continues to reveal new opportunities for innovation.`,
    date: "2023-11-22",
    readTime: "6 min",
    image: "blog-data-engineering",
  },
];
