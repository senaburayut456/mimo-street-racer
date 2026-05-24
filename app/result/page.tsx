'use client';

import { useRouter } from 'next/navigation';
import { useGameStore } from '@/store/gameStore';
import Button from '@/components/Button';

export default function ResultScreen() {
  const router = useRouter();
  const { raceResult, selectedCar, rival, reset } = useGameStore();

  if (!raceResult || !selectedCar || !rival) {
    router.push('/');
    return null;
  }

  const handleRaceAgain = () => {
    reset();
    router.push('/car-selection');
  };

  const handleMainMenu = () => {
    reset();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-secondary/10 to-dark p-4">
      <div className="max-w-3xl mx-auto">
        {/* Result Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">
            {raceResult.won ? '🏆' : '😤'}
          </div>
          <h1 className={`text-5xl font-bold mb-4 ${raceResult.won ? 'text-success' : 'text-danger'}`}>
            {raceResult.won ? 'YOU WIN!' : 'YOU LOSE!'}
          </h1>
          <div className="flex justify-center gap-8 text-lg">
            <div>
              <p className="text-gray-600">Your Time</p>
              <p className="font-mono font-bold text-2xl">0:{raceResult.playerTime.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-gray-600">Rival Time</p>
              <p className="font-mono font-bold text-2xl">0:{raceResult.rivalTime.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Race Analysis */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            📊 RACE ANALYSIS
          </h2>
          <p className="text-gray-800 mb-4 leading-relaxed">
            {raceResult.summary || 'Great race! You showed impressive skill on the track.'}
          </p>
          <div className="bg-primary/10 border-l-4 border-primary p-4 rounded">
            <p className="italic text-gray-800">
              💬 <span className="font-semibold">{rival.name}:</span>{' '}
              "{raceResult.rivalReaction || "Not bad! Let's race again sometime."}"
            </p>
          </div>
        </div>

        {/* Upgrade Recommendation */}
        {raceResult.upgrades && raceResult.upgrades.length > 0 && (
          <div className="bg-white rounded-lg p-6 mb-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              ⚙️ UPGRADE RECOMMENDATION
            </h2>
            {raceResult.upgrades.map((upgrade, index) => (
              <div key={index} className="border-l-4 border-accent p-4 bg-accent/5 rounded">
                <div className="flex items-start space-x-3">
                  <div className="text-3xl">🔧</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{upgrade.name}</h3>
                    <p className="text-success font-semibold mb-2">{upgrade.improvement}</p>
                    <p className="text-gray-700">{upgrade.reasoning}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA Buttons */}
        <div className="flex gap-4 justify-center">
          <Button
            variant="primary"
            size="lg"
            onClick={handleRaceAgain}
          >
            RACE AGAIN
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={handleMainMenu}
          >
            MAIN MENU
          </Button>
        </div>
      </div>
    </div>
  );
}
