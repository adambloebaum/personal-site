import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

interface BlogCardProps {
  id: string;
  title: string;
  summary: string;
  date: string;
  image: string;
  readTime: string;
  tags: string[];
}

const BlogCard = ({
  id,
  title,
  summary,
  date,
  image,
  readTime,
  tags,
}: BlogCardProps) => {
  return (
    <Link
      to={`/blog/${id}`}
      className="group flex flex-col h-full rounded-lg border border-border/50 bg-card overflow-hidden hover:border-primary/30 transition-colors duration-300"
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
        />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-3">
          <time>{date}</time>
          <span>·</span>
          <span>{readTime}</span>
        </div>

        <h3 className="text-base font-semibold text-foreground mb-2 leading-snug group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-4">
          {summary}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[11px] font-mono text-muted-foreground bg-muted/50 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          <ArrowUpRight
            size={16}
            className="text-muted-foreground group-hover:text-primary transition-colors duration-300"
          />
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
