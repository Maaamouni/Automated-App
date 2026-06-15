import { useEffect, useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { skillCategories } from "@/data/mockData";
import { getIcon } from "@/utils/icons";
import { useSkillTabs } from "@/hooks/useSkillTabs";

export function SkillsSection() {
  const { activeId, setActive } = useSkillTabs(skillCategories);
  const [animate, setAnimate] = useState(false);

  const active = skillCategories.find((c) => c.id === activeId) ?? skillCategories[0];

  useEffect(() => {
    setAnimate(false);
    const t = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(t);
  }, [activeId]);

  return (
    <section id="skills" className="space-y-10 scroll-mt-8" aria-labelledby="skills-heading">
      <SectionHeading label="SKILLS">
        <span className="text-white">Technical </span>
        <span id="skills-heading" className="text-accent">expertise.</span>
      </SectionHeading>

      {/* Tabs */}
      <div role="tablist" aria-label="Skill categories" className="flex flex-wrap gap-2">
        {skillCategories.map((cat) => {
          const Icon = getIcon(cat.icon);
          const isActive = cat.id === activeId;
          return (
            <button
              key={cat.id}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={`tab-panel-${cat.id}`}
              id={`tab-${cat.id}`}
              onClick={() => setActive(cat.id)}
              className={[
                "inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-colors border",
                isActive
                  ? "bg-accent/10 border-accent text-accent"
                  : "bg-bg-card border-border text-text-secondary hover:border-accent/40 hover:text-white",
              ].join(" ")}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Panel */}
      <div
        role="tabpanel"
        id={`tab-panel-${active.id}`}
        aria-labelledby={`tab-${active.id}`}
        className="space-y-8"
      >
        <p className="max-w-2xl text-text-secondary leading-relaxed">{active.description}</p>

        <ul className="space-y-3">
          {active.skills.map((skill) => {
            const SkillIcon = getIcon(skill.icon);
            return (
              <li key={skill.name} className="grid grid-cols-[1fr_auto] items-center gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <SkillIcon
                    className="h-4 w-4 text-accent shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-sm text-text-primary font-mono truncate">
                    {skill.name}
                  </span>
                </div>
                <span className="text-xs text-text-muted font-mono w-12 text-right tabular-nums">
                  {skill.level}%
                </span>
                <div className="col-span-2 h-px bg-border overflow-hidden -mt-2">
                  <div
                    className={[
                      "h-px bg-accent transition-all duration-700 ease-out",
                      animate ? "opacity-100" : "opacity-0",
                    ].join(" ")}
                    style={{ width: animate ? `${skill.level}%` : "0%" }}
                    role="progressbar"
                    aria-valuenow={skill.level}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${skill.name} proficiency`}
                  />
                </div>
              </li>
            );
          })}
        </ul>

        {active.extras.length > 0 && (
          <div className="space-y-3">
            <p className="section-label">ALSO FAMILIAR WITH</p>
            <div className="flex flex-wrap gap-2">
              {active.extras.map((extra) => (
                <span key={extra} className="tag">
                  {extra}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
