import { useState } from "react";
import { Menu, X } from "lucide-react";
import { SidebarProfile, SidebarNav } from "./Sidebar";
import { navItems, profileData } from "@/data/mockData";
import type { SectionId } from "@/types";

interface SidebarProps {
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
}

export function Sidebar({ activeSection, onNavigate }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleClick = (id: string) => {
    onNavigate(id as SectionId);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile toggle */}
      <button
        type="button"
        onClick={() => setMobileOpen((s) => !s)}
        className="md:hidden fixed top-4 left-4 z-40 inline-flex items-center justify-center rounded-md border border-border bg-bg-secondary p-2 text-text-primary"
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileOpen}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Backdrop for mobile */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/60"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={[
          "fixed md:sticky top-0 left-0 z-30 h-screen w-64 shrink-0",
          "border-r border-border bg-bg-primary/95 backdrop-blur",
          "flex flex-col p-6 gap-8 overflow-y-auto",
          "transition-transform duration-200",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        ].join(" ")}
        aria-label="Sidebar"
      >
        <SidebarProfile />
        <div className="border-t border-border pt-6">
          <SidebarNav
            items={navItems}
            activeId={activeSection}
            onItemClick={handleClick}
          />
        </div>
        <div className="mt-auto pt-6 border-t border-border">
          <p className="text-xs text-text-muted font-mono">© 2026 {profileData.name}</p>
        </div>
      </aside>
    </>
  );
}
