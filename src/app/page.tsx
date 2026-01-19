import { HomeHeader } from '@/components/home/HomeHeader';
import { Card } from '@/components/ui/Card';
import { Section } from '@/components/ui/Section';

export default function HomePage() {
  return (
    <div className="space-y-12">
      <HomeHeader />

      <Section title="Made for you">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card
              key={i}
              title={`Daily Mix ${i + 1}`}
              description="Based on your recent listening"
            />
          ))}
        </div>
      </Section>

      <Section title="Recently played">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card
              key={i}
              title={`Playlist ${i + 1}`}
              description="Made for you"
            />
          ))}
        </div>
      </Section>
    </div>
  );
}
