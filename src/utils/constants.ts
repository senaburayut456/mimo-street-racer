import { Car, StrategyModifier } from '@/types/game';

export const CARS: Car[] = [
  {
    id: 'balanced',
    name: 'Balanced Racer',
    icon: '🚗',
    speed: 70,
    acceleration: 70,
    handling: 70,
  },
  {
    id: 'speed',
    name: 'Speed Demon',
    icon: '🏎️',
    speed: 90,
    acceleration: 50,
    handling: 60,
  },
  {
    id: 'quick',
    name: 'Quick Starter',
    icon: '⚡',
    speed: 60,
    acceleration: 90,
    handling: 50,
  },
];

export const STRATEGIES: Record<string, StrategyModifier> = {
  aggressive: {
    name: 'Aggressive',
    description: 'High risk, high reward',
    speedMod: 10,
    controlMod: -5,
  },
  balanced: {
    name: 'Balanced',
    description: 'Safe, consistent choice',
    speedMod: 0,
    controlMod: 0,
  },
  defensive: {
    name: 'Defensive',
    description: 'Steady, reliable finish',
    speedMod: -5,
    controlMod: 10,
  },
};

export const PERSONALITIES: string[] = [
  'Aggressive',
  'Tactical',
  'Reckless',
  'Calculated',
];

export const RACING_STYLES: string[] = [
  'Overtaker',
  'Blocker',
  'Speedster',
  'Drifter',
];

export const MOCK_RIVALS = [
  {
    id: 'blaze',
    name: 'Blaze',
    personality: 'aggressive' as const,
    style: 'overtaker' as const,
    backstory: 'Street legend from downtown. Never backs down.',
    trashTalk: "Let's see what you got, kid!",
    speed: 75,
    acceleration: 65,
    handling: 60,
  },
  {
    id: 'shadow',
    name: 'Shadow',
    personality: 'tactical' as const,
    style: 'blocker' as const,
    backstory: 'Master of defensive driving. Always one step ahead.',
    trashTalk: 'Try to get past me, I dare you.',
    speed: 65,
    acceleration: 70,
    handling: 80,
  },
  {
    id: 'nitro',
    name: 'Nitro',
    personality: 'reckless' as const,
    style: 'speedster' as const,
    backstory: 'All gas, no brakes. Lives for the thrill.',
    trashTalk: 'Hope you like eating my dust!',
    speed: 85,
    acceleration: 85,
    handling: 40,
  },
];

export const MOCK_COMMENTARIES = {
  win: [
    'Great start! You dominated from lap 1. Solid defensive driving!',
    'Impressive control through the corners. Your strategy paid off!',
    'Perfect execution! You left the rival in the dust.',
  ],
  lose: [
    'Close race! The rival had a better start. Try a different strategy next time.',
    'Good effort! The rival was just too aggressive in the corners.',
    'Almost had it! A bit more speed on the straight would make the difference.',
  ],
};

export const MOCK_UPGRADES = [
  {
    name: 'Engine Turbo',
    improvement: '+15% Speed',
    reasoning: 'Your speed was solid, but a turbo would give you the edge.',
  },
  {
    name: 'Performance Tires',
    improvement: '+20% Handling',
    reasoning: 'Better grip in corners would improve your lap times.',
  },
  {
    name: 'Lightweight Frame',
    improvement: '+10% Acceleration',
    reasoning: 'Quicker starts would help you get ahead early.',
  },
];
