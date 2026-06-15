import { useState, useEffect } from "react";
import type { SkillCategory } from "@/types";

/**
 * Tab state for the skills section.
 * Defaults to the first category and persists the selection in sessionStorage.
 */
export function useSkillTabs(categories: SkillCategory[]) {
  const [activeId, setActiveId] = useState<string>(categories[0]?.id ?? "");

  useEffect(() => {
    const stored = sessionStorage.getItem("activeSkillTab");
    if (stored && categories.some((c) => c.id === stored)) {
      setActiveId(stored);
    }
  }, [categories]);

  const setActive = (id: string) => {
    setActiveId(id);
    try {
      sessionStorage.setItem("activeSkillTab", id);
    } catch {
      // ignore storage errors
    }
  };

  return { activeId, setActive };
}
