'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/Button';

export default function StartScreen() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-secondary/10 to-dark flex items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-md">
        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-5xl font-bold">
            🏁 <span className="text-primary">MiMo</span> STREET RACER 🏁
          </h1>
          <p className="text-xl text-gray-600">Race Against AI Rivals</p>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3 pt-8">
          <Button
            variant="primary"
            size="lg"
            onClick={() => router.push('/car-selection')}
            className="w-full"
          >
            START RACE
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => {}}
            className="w-full"
          >
            LEADERBOARD
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => {}}
            className="w-full"
          >
            SETTINGS
          </Button>
        </div>

        {/* Footer */}
        <div className="pt-8 text-sm text-gray-500">
          <p>Powered by MiMo AI</p>
        </div>
      </div>
    </div>
  );
}
