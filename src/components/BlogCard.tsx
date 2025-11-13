import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface BlogCardProps {
  id: string;
  title: string;
  summary: string;
  date: string;
  image: string;
  readTime: string;
}

const BlogCard = ({ id, title, summary, date, image, readTime }: BlogCardProps) => {
  return (
    <Link 
      to={`/blog/${id}`}
      className="group block bg-card border border-border hover:border-accent transition-all duration-300"
    >
      <div className="aspect-video overflow-hidden bg-muted">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
          <time>{date}</time>
          <span>•</span>
          <span>{readTime} read</span>
        </div>
        
        <h3 className="font-serif text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {summary}
        </p>
        
        <div className="flex items-center text-sm font-medium text-accent group-hover:gap-2 transition-all">
          Read more <ArrowRight size={16} className="ml-1" />
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
