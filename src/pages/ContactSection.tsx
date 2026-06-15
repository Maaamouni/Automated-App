import { Send, CheckCircle2, AlertCircle, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { socialLinks } from "@/data/mockData";
import { useContactForm } from "@/hooks/useContactForm";
import { getIcon } from "@/utils/icons";

export function ContactSection() {
  const {
    values,
    errors,
    touched,
    status,
    serverError,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useContactForm();

  const showError = (field: keyof typeof errors) => touched[field] && errors[field];

  return (
    <section id="contact" className="space-y-10 scroll-mt-8" aria-labelledby="contact-heading">
      <SectionHeading label="CONTACT">
        <span className="text-white">Let&apos;s </span>
        <span id="contact-heading" className="text-accent">connect</span>
        <span className="text-white">.</span>
      </SectionHeading>

      <p className="max-w-2xl text-text-secondary leading-relaxed">
        Open to interesting problems, collaboration, and the occasional CTF team. Response time is
        usually under 24 hours.
      </p>

      {/* Social links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {socialLinks.map((link) => {
          const Icon = getIcon(link.icon);
          return (
            <a
              key={link.id}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="card card-hover p-4 group"
            >
              <div className="flex items-center gap-2 text-text-muted">
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span className="text-xs font-mono tracking-widest uppercase">{link.label}</span>
              </div>
              <p className="mt-2 text-sm text-text-primary group-hover:text-accent transition-colors flex items-center gap-1">
                {link.handle}
                <ExternalLink
                  className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                />
              </p>
            </a>
          );
        })}
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        noValidate
        className="space-y-5 max-w-3xl"
        aria-label="Contact form"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="contact-name"
              className="block text-xs font-mono tracking-widest uppercase text-text-muted mb-2"
            >
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              value={values.name}
              onChange={(e) => handleChange("name", e.target.value)}
              onBlur={() => handleBlur("name")}
              placeholder="Jane Smith"
              aria-invalid={Boolean(showError("name"))}
              aria-describedby={showError("name") ? "name-error" : undefined}
              className="input-field"
              disabled={status === "submitting"}
            />
            {showError("name") && (
              <p id="name-error" className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" aria-hidden="true" />
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="contact-email"
              className="block text-xs font-mono tracking-widest uppercase text-text-muted mb-2"
            >
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={(e) => handleChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              placeholder="jane@company.io"
              aria-invalid={Boolean(showError("email"))}
              aria-describedby={showError("email") ? "email-error" : undefined}
              className="input-field"
              disabled={status === "submitting"}
            />
            {showError("email") && (
              <p id="email-error" className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" aria-hidden="true" />
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="contact-message"
            className="block text-xs font-mono tracking-widest uppercase text-text-muted mb-2"
          >
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={6}
            value={values.message}
            onChange={(e) => handleChange("message", e.target.value)}
            onBlur={() => handleBlur("message")}
            placeholder="Tell me what you are working on..."
            aria-invalid={Boolean(showError("message"))}
            aria-describedby={showError("message") ? "message-error" : undefined}
            className="input-field resize-y min-h-[140px]"
            disabled={status === "submitting"}
          />
          {showError("message") && (
            <p id="message-error" className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" aria-hidden="true" />
              {errors.message}
            </p>
          )}
        </div>

        {/* Form-level status messages */}
        {serverError && status === "error" && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-md border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300"
          >
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
            <p>{serverError}</p>
          </div>
        )}

        {status === "success" && (
          <div
            role="status"
            className="flex items-start gap-2 rounded-md border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-accent"
          >
            <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
            <p>Message sent! I&apos;ll get back to you within 24 hours.</p>
          </div>
        )}

        <button type="submit" className="btn-primary" disabled={status === "submitting"}>
          {status === "submitting" ? (
            <>
              <span className="h-4 w-4 border-2 border-bg-primary/40 border-t-bg-primary rounded-full animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send message
              <Send className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>
      </form>
    </section>
  );
}
