import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center space-y-6 max-w-md">
        <p className="section-label">404</p>
        <h1 className="text-4xl font-bold text-white">Lost in the grid.</h1>
        <p className="text-text-secondary">
          The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back to the main feed.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-accent hover:text-accent-hover transition-colors"
        >
          Return home <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </main>
  );
}
