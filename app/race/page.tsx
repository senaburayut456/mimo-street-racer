'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/store/gameStore';
import { simulateRace } from '@/services/raceEngine';
import { generateCommentary, generateUpgrade } from '@/services/aiService';
import RaceCanvas from '@/components/RaceCanvas';

export default function RaceScreen() {
  const router = useRouter();
  const { selectedCar, selectedStrategy, rival, startRace, endRace } = useGameStore();
  const [raceComplete, setRaceComplete] = useState(false);

  useEffect(() => {
    if (!selectedCar || !selectedStrategy || !rival) {
      router.push('/pre-race');
      return;
    }

    startRace();
  }, [selectedCar, selectedStrategy, rival, startRace, router]);

  const handleRaceEnd = async () => {
    if (!selectedCar || !selectedStrategy || !rival) return;

    // Simulate race
    const result = simulateRace(selectedCar, rival, selectedStrategy);

    // Generate AI commentary
    const { summary, rivalReaction } = await generateCommentary(
      result.won,
      selectedStrategy,
      rival.personality
    );

    // Generate upgrade recommendation
    const upgrade = await generateUpgrade(
      result.won,
      selectedCar.name,
      selectedStrategy
    );

    // Update result with AI content
    const finalResult = {
      ...result,
      summary,
      rivalReaction,
      upgrades: [upgrade],
    };

    endRace(finalResult);
    setRaceComplete(true);

    // Navigate to result screen after delay
    setTimeout(() => {
      router.push('/result');
    }, 2000);
  };

  if (!selectedCar || !rival) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-secondary/10 to-dark p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 bg-gray-800/50 rounded-lg p-4">
          <div className="text-center">
            <p className="text-sm text-gray-400">YOU</p>
            <p className="text-xl font-bold text-secondary">1st</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-400">TIME</p>
            <p className="text-2xl font-mono font-bold">0:15</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-400">RIVAL</p>
            <p className="text-xl font-bold text-primary">2nd</p>
          </div>
        </div>

        {/* Race Canvas */}
        <div className="mb-8">
          <RaceCanvas
            playerSpeed={selectedCar.speed}
            rivalSpeed={rival.speed}
            duration={20}
            onRaceEnd={handleRaceEnd}
          />
        </div>

        {/* Speed Indicators */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-800/50 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-1">YOUR SPEED</p>
            <div className="flex items-center">
              <div className="w-full bg-gray-700 rounded-full h-2 mr-2">
                <div
                  className="bg-secondary h-2 rounded-full"
                  style={{ width: `${selectedCar.speed}%` }}
                />
              </div>
              <span className="font-mono font-bold">{selectedCar.speed} km/h</span>
            </div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-1">RIVAL SPEED</p>
            <div className="flex items-center">
              <div className="w-full bg-gray-700 rounded-full h-2 mr-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${rival.speed}%` }}
                />
              </div>
              <span className="font-mono font-bold">{rival.speed} km/h</span>
            </div>
          </div>
        </div>

        {/* Race Complete Overlay */}
        {raceComplete && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md text-center">
              <div className="text-6xl mb-4">🏁</div>
              <h2 className="text-3xl font-bold mb-2">RACE COMPLETE!</h2>
              <p className="text-gray-600">Analyzing results...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
