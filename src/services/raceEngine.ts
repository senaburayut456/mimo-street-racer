import { Car, Strategy, RaceResult, Rival } from '@/types/game';
import { STRATEGIES } from '@/utils/constants';

export function simulateRace(
  playerCar: Car,
  rivalCar: Rival,
  strategy: Strategy
): RaceResult {
  // Apply strategy modifiers
  const strategyMod = STRATEGIES[strategy];
  const playerSpeed = playerCar.speed + strategyMod.speedMod;
  const playerControl = playerCar.handling + strategyMod.controlMod;

  // Calculate base times (lower is better)
  const playerBaseTime = 30 - (playerSpeed / 100) * 5 - (playerControl / 100) * 2;
  const rivalBaseTime = 30 - (rivalCar.speed / 100) * 5 - (rivalCar.handling / 100) * 2;

  // Add random variance (±5%)
  const playerVariance = (Math.random() - 0.5) * 0.1 * playerBaseTime;
  const rivalVariance = (Math.random() - 0.5) * 0.1 * rivalBaseTime;

  const playerTime = Math.max(15, playerBaseTime + playerVariance);
  const rivalTime = Math.max(15, rivalBaseTime + rivalVariance);

  const won = playerTime < rivalTime;

  return {
    playerTime: parseFloat(playerTime.toFixed(2)),
    rivalTime: parseFloat(rivalTime.toFixed(2)),
    won,
    playerPosition: won ? 'first' : 'second',
    summary: '', // Will be filled by AI
    rivalReaction: '', // Will be filled by AI
    upgrades: [], // Will be filled by AI
  };
}
