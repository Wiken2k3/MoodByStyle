export default function HomePage() {
  return (
    <div className="min-h-screen bg-background-primary text-text-body p-8">
      <h1 className="text-4xl font-bold text-text-heading">
        Spotify Clone 🎧
      </h1>

      <p className="mt-4 text-text-muted">
        Dark mode first. Design token driven.
      </p>

      <button className="mt-6 rounded-full bg-brand-primary-500 px-6 py-3 font-semibold text-black hover:scale-105 transition">
        Play Music
      </button>
    </div>
  );
}
