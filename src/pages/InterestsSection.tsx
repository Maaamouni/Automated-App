import { ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { projects } from "@/data/mockData";
import { getIcon } from "@/utils/icons";

export function InterestsSection() {
  return (
    <section id="projects" className="space-y-10 scroll-mt-8" aria-labelledby="projects-heading">
      <SectionHeading label="PROJECTS & INTERESTS">
        <span className="text-white">What I </span>
        <span id="projects-heading" className="text-accent">have done</span>
        <span className="text-white">.</span>
      </SectionHeading>

      <p className="max-w-2xl text-text-secondary leading-relaxed">
        The threads that run through everything I build.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => {
          const Icon = getIcon(project.icon);
          const highlighted = project.title.includes("AI Systems");
          return (
            <article
              key={project.id}
              className={[
                "card card-hover p-6 flex flex-col gap-3",
                highlighted ? "border-accent/40" : "",
              ].join(" ")}
            >
              <Icon
                className="h-6 w-6"
                style={{ color: project.iconColor }}
                aria-hidden="true"
              />
              <h3 className="text-base font-semibold text-white">
                {highlighted ? (
                  <>
                    <span className="text-accent">AI</span> Systems &amp; Agents
                  </>
                ) : (
                  project.title
                )}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {project.description}
              </p>
              {project.links.length > 0 && (
                <div className="mt-auto pt-2 flex flex-wrap gap-x-4 gap-y-2">
                  {project.links.map((link) => (
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
