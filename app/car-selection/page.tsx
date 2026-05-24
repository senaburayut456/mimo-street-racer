'use client';

import { useRouter } from 'next/navigation';
import { useGameStore } from '@/store/gameStore';
import { CARS } from '@/utils/constants';
import Button from '@/components/Button';
import Card from '@/components/Card';
import StatBar from '@/components/StatBar';

export default function CarSelectionScreen() {
  const router = useRouter();
  const { selectedCar, selectCar } = useGameStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-secondary/10 to-dark p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push('/')}
          >
            ← Back
          </Button>
          <h1 className="text-3xl font-bold text-center">SELECT YOUR CAR</h1>
          <div className="w-20" /> {/* Spacer */}
        </div>

        {/* Car Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {CARS.map((car) => (
            <Card
              key={car.id}
              selected={selectedCar?.id === car.id}
              onClick={() => selectCar(car)}
              className="text-center"
            >
              <div className="text-6xl mb-4">{car.icon}</div>
              <h3 className="text-xl font-bold mb-2">{car.name}</h3>
              <div className="space-y-2">
                <StatBar label="Speed" value={car.speed} />
                <StatBar label="Acceleration" value={car.acceleration} />
                <StatBar label="Handling" value={car.handling} />
              </div>
            </Card>
          ))}
        </div>

        {/* Selected Car Stats */}
        {selectedCar && (
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-bold mb-4">Selected: {selectedCar.name}</h3>
            <div className="space-y-3">
              <StatBar label="Speed" value={selectedCar.speed} />
              <StatBar label="Acceleration" value={selectedCar.acceleration} />
              <StatBar label="Handling" value={selectedCar.handling} />
            </div>
          </div>
        )}

        {/* Continue Button */}
        <div className="text-center">
          <Button
            variant="primary"
            size="lg"
            disabled={!selectedCar}
            onClick={() => router.push('/strategy-selection')}
            className="px-12"
          >
            CONTINUE
          </Button>
        </div>
      </div>
    </div>
  );
}
