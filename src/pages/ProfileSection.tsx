import { MapPin, Globe, Briefcase } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { profileData } from "@/data/mockData";

export function ProfileSection() {
  const { headline, bio, location, availability, currentWork, stats, background } = profileData;
  const [headStart] = headline.split(/(intelligent systems\.)/i);
  const highlightIndex = headline.toLowerCase().indexOf("intelligent systems");

  return (
    <section id="profile" className="space-y-12 scroll-mt-8" aria-labelledby="profile-heading">
      <SectionHeading label="PROFILE">
        <span id="profile-heading" className="text-white">
          {highlightIndex >= 0 ? headStart : headline}
        </span>
        {highlightIndex >= 0 && (
          <>
            <br />
            <span className="text-accent">{headline.slice(highlightIndex)}</span>
          </>
        )}
      </SectionHeading>

      <p className="max-w-2xl text-text-secondary leading-relaxed">{bio}</p>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <p className="text-3xl font-semibold text-accent">{stat.value}</p>
            <p className="text-xs text-text-muted mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Details card */}
      <div className="card divide-y divide-border">
        <DetailRow icon={<MapPin className="h-4 w-4" aria-hidden="true" />} label="Location" value={location} />
        <DetailRow
          icon={<Globe className="h-4 w-4" aria-hidden="true" />}
          label="Available for"
          value={availability}
        />
        <DetailRow
          icon={<Briefcase className="h-4 w-4" aria-hidden="true" />}
          label="Currently"
          value={currentWork}
        />
      </div>

      {/* Background */}
      <div className="space-y-6">
        <p className="section-label">BACKGROUND</p>
        <ul className="space-y-5">
          {background.map((entry) => (
            <li
              key={`${entry.period}-${entry.role}`}
              className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-2 md:gap-6"
            >
              <p className="text-xs font-mono text-text-muted">{entry.period}</p>
              <div>
                <p className="text-white font-medium">{entry.role}</p>
                <p className="text-sm text-text-secondary">{entry.organization}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

interface DetailRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function DetailRow({ icon, label, value }: DetailRowProps) {
  return (
    <div className="flex items-center gap-6 px-5 py-4">
      <div className="flex items-center gap-3 w-40 shrink-0 text-text-muted">
        <span className="text-accent">{icon}</span>
        <span className="text-xs font-mono tracking-widest uppercase">{label}</span>
      </div>
      <p className="text-white text-sm md:text-base">{value}</p>
    </div>
  );
}
