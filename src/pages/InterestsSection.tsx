import { ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { interests } from "@/data/mockData";
import { getIcon } from "@/utils/icons";

export function InterestsSection() {
  return (
    <section id="interests" className="space-y-10 scroll-mt-8" aria-labelledby="interests-heading">
      <SectionHeading label="IPROJECTS & NTERESTS">
        <span className="text-white">What I </span>
        <span id="interests-heading" className="text-accent">have done</span>
        <span className="text-white">.</span>
      </SectionHeading>

      <p className="max-w-2xl text-text-secondary leading-relaxed">
        The threads that run through everything I build.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {interests.map((interest) => {
          const Icon = getIcon(interest.icon);
          const highlighted = interest.title.includes("AI Systems");
          return (
            <article
              key={interest.id}
              className={[
                "card card-hover p-6 flex flex-col gap-3",
                highlighted ? "border-accent/40" : "",
              ].join(" ")}
            >
              <Icon
                className="h-6 w-6"
                style={{ color: interest.iconColor }}
                aria-hidden="true"
              />
              <h3 className="text-base font-semibold text-white">
                {highlighted ? (
                  <>
                    <span className="text-accent">AI</span> Systems &amp; Agents
                  </>
                ) : (
                  interest.title
                )}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {interest.description}
              </p>
              {interest.links.length > 0 && (
                <div className="mt-auto pt-2 flex flex-wrap gap-x-4 gap-y-2">
                  {interest.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-text-secondary hover:text-accent transition-colors"
                    >
                      <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
