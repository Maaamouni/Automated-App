import { Sidebar } from "@/components/AppSidebar";
import { ProfileSection } from "@/pages/ProfileSection";
import { SkillsSection } from "@/pages/SkillsSection";
import { InterestsSection } from "@/pages/InterestsSection";
import { ContactSection } from "@/pages/ContactSection";
import { useActiveSection } from "@/hooks/useActiveSection";
import { navItems } from "@/data/mockData";
import type { SectionId } from "@/types";

export function HomePage() {
  const sectionIds = navItems.map((n) => n.id) as SectionId[];
  const active = useActiveSection(sectionIds);

  const handleNavigate = (id: SectionId) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar activeSection={active} onNavigate={handleNavigate} />
      <main className="flex-1 min-w-0">
        <div className="mx-auto max-w-3xl px-6 md:px-12 py-12 md:py-20 space-y-24">
          <ProfileSection />
          <div className="border-t border-border" aria-hidden="true" />
          <SkillsSection />
          <div className="border-t border-border" aria-hidden="true" />
          <InterestsSection />
          <div className="border-t border-border" aria-hidden="true" />
          <ContactSection />
        </div>
      </main>
    </div>
  );
}
