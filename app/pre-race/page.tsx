'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/store/gameStore';
import { generateRival } from '@/services/aiService';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function PreRaceScreen() {
  const router = useRouter();
  const { selectedCar, selectedStrategy, rival, setRival, setRivalLoading, rivalLoading } = useGameStore();

  useEffect(() => {
    if (!selectedCar || !selectedStrategy) {
      router.push('/strategy-selection');
      return;
    }

    if (!rival) {
      setRivalLoading(true);
      generateRival()
        .then((newRival) => {
          setRival(newRival);
          setRivalLoading(false);
        })
        .catch((error) => {
          console.error('Failed to generate rival:', error);
          setRivalLoading(false);
        });
    }
  }, [selectedCar, selectedStrategy, rival, setRival, setRivalLoading, router]);

  if (rivalLoading || !rival || !selectedCar || !selectedStrategy) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark via-secondary/10 to-dark flex items-center justify-center p-4">
        <LoadingSpinner
          message="🏁 GENERATING RIVAL... 🏁"
          progress={Math.random() * 100}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-secondary/10 to-dark p-4">
      <div className="max-w-2xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-8">
          🏁 READY TO RACE? 🏁
        </h1>

        {/* Matchup Card */}
        <div className="bg-white rounded-lg p-8 mb-8 shadow-lg">
          <div className="grid grid-cols-2 gap-8 mb-8">
            {/* Player */}
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-600 mb-2">YOU</p>
              <div className="text-5xl mb-2">{selectedCar.icon}</div>
              <p className="font-bold text-lg mb-4">{selectedCar.name}</p>
              <div className="space-y-1 text-sm">
                <p>
                  <span className="font-semibold">Strategy:</span> {selectedStrategy}
                </p>
              </div>
            </div>

            {/* Rival */}
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-600 mb-2">RIVAL</p>
              <div className="text-5xl mb-2">🏎️</div>
              <p className="font-bold text-lg mb-4">{rival.name}</p>
              <div className="space-y-1 text-sm">
                <p>
                  <span className="font-semibold">Personality:</span>{' '}
                  {rival.personality}
                </p>
                <p>
                  <span className="font-semibold">Style:</span> {rival.style}
                </p>
              </div>
            </div>
          </div>

          {/* Trash Talk */}
          <div className="bg-primary/10 border-l-4 border-primary p-4 rounded">
            <p className="italic text-gray-800">💬 "{rival.trashTalk}"</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => router.push('/race')}
            className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary/90 transition-all"
          >
            START RACE
          </button>
          <button
            onClick={() => router.push('/strategy-selection')}
            className="border-2 border-primary text-primary font-bold py-3 px-8 rounded-lg hover:bg-primary/10 transition-all"
          >
            BACK
          </button>
        </div>
      </div>
    </div>
  );
}
