export type Car = {
  id: string;
  name: string;
  icon: string;
  speed: number;
  acceleration: number;
  handling: number;
};

export type Strategy = 'aggressive' | 'balanced' | 'defensive';

export type StrategyModifier = {
  name: string;
  description: string;
  speedMod: number;
  controlMod: number;
};

export type Personality = 'aggressive' | 'tactical' | 'reckless' | 'calculated';
export type RacingStyle = 'overtaker' | 'blocker' | 'speedster' | 'drifter';

export type Rival = {
  id: string;
  name: string;
  personality: Personality;
  style: RacingStyle;
  backstory: string;
  trashTalk: string;
  speed: number;
  acceleration: number;
  handling: number;
};

export type RaceResult = {
  playerTime: number;
  rivalTime: number;
  won: boolean;
  playerPosition: 'first' | 'second';
  summary: string;
  rivalReaction: string;
  upgrades: UpgradeRecommendation[];
};

export type UpgradeRecommendation = {
  name: string;
  improvement: string;
  reasoning: string;
};

export type Screen =
  | 'start'
  | 'car-selection'
  | 'strategy-selection'
  | 'pre-race'
  | 'race'
  | 'result';
