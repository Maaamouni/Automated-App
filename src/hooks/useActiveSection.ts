import { useEffect, useState } from "react";
import type { SectionId } from "@/types";

/**
 * Track which section is currently in view using IntersectionObserver.
 * Returns the id of the topmost section intersecting the viewport.
 */
export function useActiveSection(sectionIds: SectionId[]): SectionId {
  const [active, setActive] = useState<SectionId>(sectionIds[0]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the highest intersection ratio that is intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActive(visible[0].target.id as SectionId);
        }
      },
      {
        // Trigger when section is in the middle 50% of the viewport
        rootMargin: "-20% 0px -50% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds]);

  return active;
}
