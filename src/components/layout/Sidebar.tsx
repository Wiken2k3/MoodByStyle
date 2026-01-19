export function Sidebar() {
  return (
    <aside className="flex flex-col bg-background-tertiary p-6 text-text-body">
      <h2 className="mb-6 text-lg font-bold text-text-heading">
        Your Library
      </h2>

      <nav className="flex flex-col gap-3 text-sm">
        <button className="text-left transition hover:text-white">
          🏠 Home
        </button>
        <button className="text-left transition hover:text-white">
          🔍 Search
        </button>
        <button className="text-left transition hover:text-white">
          🎵 Your Playlists
        </button>
      </nav>

      <div className="mt-auto pt-6 text-xs text-text-muted">
        Spotify Clone © 2026
      </div>
    </aside>
  );
}
