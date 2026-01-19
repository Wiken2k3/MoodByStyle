export function Player() {
  return (
    <div className="h-20 bg-background-tertiary border-t border-neutral-800 flex items-center justify-between px-6">
      {/* Left */}
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 bg-neutral-700 rounded" />
        <div>
          <p className="text-sm font-semibold text-text-heading">
            Song Title
          </p>
          <p className="text-xs text-text-muted">
            Artist Name
          </p>
        </div>
      </div>

      {/* Center */}
      <div className="flex items-center gap-4">
        <button>⏮️</button>
        <button className="rounded-full bg-white text-black px-3 py-1">
          ▶️
        </button>
        <button>⏭️</button>
      </div>

      {/* Right */}
      <div className="w-32 text-right text-xs text-text-muted">
        0:42 / 3:12
      </div>
    </div>
  );
}
