import { ExternalLink, FileText } from "lucide-react";

interface WorkCardProps {
  id: string;
  title: string;
  summary: string;
  date: string;
  type: 'external-blog' | 'patent' | 'publication';
  tags: string[];
  url?: string;
  pdfUrl?: string;
  logo?: string;
  image: string;
}

const WorkCard = ({ title, summary, date, type, tags, url, pdfUrl, logo, image }: WorkCardProps) => {
  const handleClick = () => {
    if (type === 'external-blog' && url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else if ((type === 'patent' || type === 'publication') && pdfUrl) {
      window.open(pdfUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const getIcon = () => {
    if (type === 'external-blog') {
      return <ExternalLink size={20} className="text-white" />;
    }
    return <FileText size={20} className="text-white" />;
  };

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer bg-card border border-border hover:border-accent transition-all duration-300"
    >
      <div className="relative aspect-video overflow-hidden bg-muted">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Icon overlay in top-right corner */}
        <div className="absolute top-3 right-3 p-2 bg-accent rounded-full">
          {getIcon()}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          {logo && (
            <img
              src={logo}
              alt=""
              className="w-5 h-5 object-contain"
            />
          )}
          <time className="text-xs text-muted-foreground">{date}</time>
        </div>

        <h3 className="font-serif text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
          {title}
        </h3>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {summary}
        </p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="px-2 py-1 text-xs bg-muted text-foreground rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkCard;
