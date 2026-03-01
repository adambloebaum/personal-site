import { ExternalLink, FileText } from "lucide-react";

interface WorkCardProps {
  id: string;
  title: string;
  summary: string;
  date: string;
  type: "external-blog" | "patent" | "publication" | "project";
  tags: string[];
  url?: string;
  pdfUrl?: string;
  logo?: string;
  image: string;
}

const WorkCard = ({
  title,
  summary,
  date,
  type,
  tags,
  url,
  pdfUrl,
  logo,
  image,
}: WorkCardProps) => {
  const handleClick = () => {
    if ((type === "external-blog" || type === "project") && url) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else if ((type === "patent" || type === "publication") && pdfUrl) {
      window.open(pdfUrl, "_blank", "noopener,noreferrer");
    }
  };

  const Icon =
    type === "external-blog" || type === "project" ? ExternalLink : FileText;

  return (
    <div
      onClick={handleClick}
      className="group flex flex-col h-full cursor-pointer rounded-lg border border-border/50 bg-card overflow-hidden hover:border-primary/30 transition-colors duration-300"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
        />
        <div className="absolute top-3 right-3 p-1.5 bg-background/80 backdrop-blur-sm rounded-md border border-border/50">
          <Icon size={14} className="text-muted-foreground" />
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          {logo && (
            <img src={logo} alt="" className="w-4 h-4 object-contain opacity-50" />
          )}
          <time className="text-xs font-mono text-muted-foreground">{date}</time>
        </div>

        <h3 className="text-base font-semibold text-foreground mb-2 leading-snug group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-4">
          {summary}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-auto">
          {tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[11px] font-mono text-muted-foreground bg-muted/50 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkCard;
