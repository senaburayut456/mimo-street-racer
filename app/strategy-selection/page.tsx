'use client';

import { useRouter } from 'next/navigation';
import { useGameStore } from '@/store/gameStore';
import { Strategy } from '@/types/game';
import { STRATEGIES } from '@/utils/constants';
import Button from '@/components/Button';
import Card from '@/components/Card';

export default function StrategySelectionScreen() {
  const router = useRouter();
  const { selectedCar, selectedStrategy, selectStrategy } = useGameStore();

  if (!selectedCar) {
    router.push('/car-selection');
    return null;
  }

  const strategies: Strategy[] = ['aggressive', 'balanced', 'defensive'];

  const strategyIcons = {
    aggressive: '⚡',
    balanced: '⚖️',
    defensive: '🛡️',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-secondary/10 to-dark p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push('/car-selection')}
          >
            ← Back
          </Button>
          <h1 className="text-3xl font-bold text-center">CHOOSE STRATEGY</h1>
          <div className="w-20" /> {/* Spacer */}
        </div>

        {/* Selected Car Badge */}
        <div className="bg-gray-50 rounded-lg p-4 mb-8 text-center">
          <p className="text-sm text-gray-600">Selected Car</p>
          <p className="text-xl font-bold">
            {selectedCar.icon} {selectedCar.name}
          </p>
        </div>

        {/* Strategy Cards */}
        <div className="space-y-4 mb-8">
          {strategies.map((strategy) => {
            const strategyData = STRATEGIES[strategy];
            return (
              <Card
                key={strategy}
                selected={selectedStrategy === strategy}
                onClick={() => selectStrategy(strategy)}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{strategyIcons[strategy]}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1 uppercase">
                      {strategyData.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {strategyData.speedMod > 0 && `+${strategyData.speedMod}% Speed`}
                      {strategyData.speedMod < 0 && `${strategyData.speedMod}% Speed`}
                      {strategyData.speedMod !== 0 && ', '}
                      {strategyData.controlMod > 0 && `+${strategyData.controlMod}% Control`}
                      {strategyData.controlMod < 0 && `${strategyData.controlMod}% Control`}
                      {strategyData.speedMod === 0 && strategyData.controlMod === 0 && 'No modifiers'}
                    </p>
                    <p className="text-gray-700">{strategyData.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <Button
            variant="primary"
            size="lg"
            disabled={!selectedStrategy}
            onClick={() => router.push('/pre-race')}
            className="px-12"
          >
            CONTINUE
          </Button>
        </div>
      </div>
    </div>
  );
}
