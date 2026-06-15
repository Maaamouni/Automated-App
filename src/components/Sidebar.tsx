import { ChevronRight } from "lucide-react";
import { profileData } from "@/data/mockData";
import avatar from "@/assets/image.png";

interface SidebarProfileProps {
  showAvailability?: boolean;
}

export function SidebarProfile({ showAvailability = true }: SidebarProfileProps) {
  const isAvailable = profileData.available;

  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-square w-full rounded-lg overflow-hidden border border-border">
        <img
          src={avatar}
          alt={`${profileData.name} avatar`}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="space-y-1">
        <h2 className="text-base font-semibold text-white">{profileData.name}</h2>
        <p className="text-sm text-accent font-mono">{profileData.tagline}</p>
        {showAvailability && (
          <p className="flex items-center gap-1.5 text-xs text-text-secondary pt-1">
            <span
              className={[
                "h-1.5 w-1.5 rounded-full",
                isAvailable ? "bg-accent animate-pulse" : "bg-text-muted",
              ].join(" ")}
              aria-hidden="true"
            />
            {isAvailable ? "Available for hire" : "Currently unavailable"}
          </p>
        )}
      </div>
    </div>
  );
}

interface SidebarNavProps {
  items: { id: string; index: number; label: string; icon: string; href: string }[];
  activeId: string;
  onItemClick: (id: string) => void;
}

export function SidebarNav({ items, activeId, onItemClick }: SidebarNavProps) {
  return (
    <nav aria-label="Section navigation" className="space-y-1">
      {items.map((item) => {
        const isActive = activeId === item.id;
        return (
          <a
            key={item.id}
            href={item.href}
            onClick={(e) => {
              e.preventDefault();
              onItemClick(item.id);
            }}
            aria-current={isActive ? "true" : undefined}
            className={[
              "group flex items-center gap-3 px-4 py-2.5 rounded-md text-sm transition-all",
              isActive
                ? "bg-accent/10 text-accent border-l-2 border-accent"
                : "text-text-secondary hover:text-white hover:bg-bg-hover border-l-2 border-transparent",
            ].join(" ")}
          >
            <span
              className={[
                "font-mono text-xs",
                isActive ? "text-accent" : "text-text-muted",
              ].join(" ")}
              aria-hidden="true"
            >
              {String(item.index).padStart(2, "0")}
            </span>
            <span className="tracking-widest text-xs font-medium">{item.label}</span>
            <ChevronRight
              className={[
                "ml-auto h-4 w-4 transition-transform",
                isActive ? "text-accent translate-x-0" : "text-text-muted -translate-x-1 group-hover:translate-x-0",
              ].join(" ")}
              aria-hidden="true"
            />
          </a>
        );
      })}
    </nav>
  );
}
