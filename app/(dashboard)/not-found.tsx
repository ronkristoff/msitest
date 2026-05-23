import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-pitch-black mb-2">404</h1>
        <p className="text-inkwell mb-6">Page not found.</p>
        <Link
          href="/"
          className="inline-flex items-center justify-center h-9 px-4 rounded-buttons bg-clay-violet text-white text-sm font-medium hover:bg-clay-violet/90 transition-colors"
        >
          Back to Projects
        </Link>
      </div>
    </div>
  );
}
