import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SectionTitle } from '@/components/ui/SectionTitle';

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section>
        <SectionTitle>Good evening</SectionTitle>

        <p className="mt-2 text-text-muted">
          Dark mode first. Design token driven.
        </p>

        <Button className="mt-6">▶ Play Music</Button>
      </section>

      <section className="grid grid-cols-2 gap-10 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card
            key={i}
            title={`Playlist ${i + 1}`}
            description="Some description for this playlist"
          />
        ))}
      </section>
    </div>
  );
}
