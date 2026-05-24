import { Rival, RaceResult, Personality, RacingStyle } from '@/types/game';
import { MOCK_RIVALS, MOCK_COMMENTARIES, MOCK_UPGRADES, PERSONALITIES, RACING_STYLES } from '@/utils/constants';

const MIMO_API_URL = process.env.NEXT_PUBLIC_MIMO_API_URL || 'https://token-plan-sgp.xiaomimomo.com/v1';
const MIMO_API_KEY = process.env.NEXT_PUBLIC_MIMO_API_KEY || '';
const GROQ_API_URL = 'https://api.groq.com/openai/v1';
const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY || '';

// Helper: Call AI API with fallback chain
async function callAI(prompt: string): Promise<string> {
  // Try MiMo API first
  if (MIMO_API_KEY) {
    try {
      const response = await fetch(`${MIMO_API_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${MIMO_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 200,
        }),
        signal: AbortSignal.timeout(5000),
      });

      if (response.ok) {
        const data = await response.json();
        return data.choices[0]?.message?.content || '';
      }
    } catch (error) {
      console.warn('MiMo API failed, trying Groq...', error);
    }
  }

  // Fallback to Groq
  if (GROQ_API_KEY) {
    try {
      const response = await fetch(`${GROQ_API_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 200,
        }),
        signal: AbortSignal.timeout(5000),
      });

      if (response.ok) {
        const data = await response.json();
        return data.choices[0]?.message?.content || '';
      }
    } catch (error) {
      console.warn('Groq API failed, using mock...', error);
    }
  }

  // Final fallback: empty string (caller handles mock)
  return '';
}

// Generate rival character
export async function generateRival(): Promise<Rival> {
  const personality = PERSONALITIES[Math.floor(Math.random() * PERSONALITIES.length)].toLowerCase() as Personality;
  const style = RACING_STYLES[Math.floor(Math.random() * RACING_STYLES.length)].toLowerCase() as RacingStyle;

  const prompt = `Generate a street racing rival character with:
- Unique racing nickname (1-2 words, cool and edgy)
- Personality: ${personality}
- Racing style: ${style}
- Short backstory (max 2 sentences)
- Trash talk line (cocky but fun, 1 sentence)

Format your response as JSON:
{
  "name": "...",
  "backstory": "...",
  "trashTalk": "..."
}`;

  try {
    const response = await callAI(prompt);
    
    if (response) {
      // Try to parse JSON response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          id: `rival-${Date.now()}`,
          name: parsed.name || 'Mystery Racer',
          personality,
          style,
          backstory: parsed.backstory || 'A mysterious challenger appears.',
          trashTalk: parsed.trashTalk || "Let's race!",
          speed: 60 + Math.floor(Math.random() * 30),
          acceleration: 60 + Math.floor(Math.random() * 30),
          handling: 60 + Math.floor(Math.random() * 30),
        };
      }
    }
  } catch (error) {
    console.warn('AI rival generation failed, using mock', error);
  }

  // Fallback to mock rival
  const mockRival = MOCK_RIVALS[Math.floor(Math.random() * MOCK_RIVALS.length)];
  return {
    ...mockRival,
    id: `rival-${Date.now()}`,
  };
}

// Generate race commentary
export async function generateCommentary(
  won: boolean,
  strategy: string,
  rivalPersonality: string
): Promise<{ summary: string; rivalReaction: string }> {
  const prompt = `Generate race commentary for a street race:
- Result: ${won ? 'Player won' : 'Player lost'}
- Player strategy: ${strategy}
- Rival personality: ${rivalPersonality}

Format as JSON:
{
  "summary": "2-3 sentences describing the race",
  "rivalReaction": "Rival's post-race comment (1 sentence)"
}`;

  try {
    const response = await callAI(prompt);
    
    if (response) {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          summary: parsed.summary || '',
          rivalReaction: parsed.rivalReaction || '',
        };
      }
    }
  } catch (error) {
    console.warn('AI commentary generation failed, using mock', error);
  }

  // Fallback to mock commentary
  const summaries = won ? MOCK_COMMENTARIES.win : MOCK_COMMENTARIES.lose;
  const summary = summaries[Math.floor(Math.random() * summaries.length)];
  const rivalReaction = won
    ? "Not bad, rookie. Next time I'll bring my A-game!"
    : "Told you I'd win! Better luck next time.";

  return { summary, rivalReaction };
}

// Generate upgrade recommendation
export async function generateUpgrade(
  won: boolean,
  carName: string,
  strategy: string
): Promise<{ name: string; improvement: string; reasoning: string }> {
  const prompt = `Recommend a car upgrade after a race:
- Result: ${won ? 'Won' : 'Lost'}
- Car: ${carName}
- Strategy: ${strategy}

Format as JSON:
{
  "name": "Upgrade name",
  "improvement": "+X% stat",
  "reasoning": "Why this upgrade (1 sentence)"
}`;

  try {
    const response = await callAI(prompt);
    
    if (response) {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          name: parsed.name || '',
          improvement: parsed.improvement || '',
          reasoning: parsed.reasoning || '',
        };
      }
    }
  } catch (error) {
    console.warn('AI upgrade generation failed, using mock', error);
  }

  // Fallback to mock upgrade
  return MOCK_UPGRADES[Math.floor(Math.random() * MOCK_UPGRADES.length)];
}
