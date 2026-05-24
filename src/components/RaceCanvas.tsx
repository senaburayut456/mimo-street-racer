import { useEffect, useRef, useState } from 'react';

interface RaceCanvasProps {
  playerSpeed: number;
  rivalSpeed: number;
  duration: number;
  onRaceEnd: () => void;
}

export default function RaceCanvas({
  playerSpeed,
  rivalSpeed,
  duration,
  onRaceEnd,
}: RaceCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [playerPos, setPlayerPos] = useState(0);
  const [rivalPos, setRivalPos] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const trackLength = 400;
    let animationId: number;
    let startTime = Date.now();

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);

      // Calculate positions
      const playerProgress = progress * (playerSpeed / 100);
      const rivalProgress = progress * (rivalSpeed / 100);

      setPlayerPos(Math.min(playerProgress * 100, 100));
      setRivalPos(Math.min(rivalProgress * 100, 100));
      setTimeLeft(Math.max(duration - elapsed, 0));

      // Clear canvas
      ctx.fillStyle = '#1A1A1A';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw track
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 2;
      ctx.strokeRect(50, 50, trackLength, 200);

      // Draw finish line
      ctx.strokeStyle = '#F7B801';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(50 + trackLength, 50);
      ctx.lineTo(50 + trackLength, 250);
      ctx.stroke();

      // Draw player car (blue)
      const playerX = 50 + (playerProgress * trackLength);
      ctx.fillStyle = '#004E89';
      ctx.fillRect(playerX, 100, 30, 20);
      ctx.fillStyle = '#fff';
      ctx.font = '16px monospace';
      ctx.fillText('🚗', playerX, 115);

      // Draw rival car (orange)
      const rivalX = 50 + (rivalProgress * trackLength);
      ctx.fillStyle = '#FF6B35';
      ctx.fillRect(rivalX, 180, 30, 20);
      ctx.fillStyle = '#fff';
      ctx.fillText('🏎️', rivalX, 195);

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      } else {
        onRaceEnd();
      }
    };

    animate();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [playerSpeed, rivalSpeed, duration, onRaceEnd]);

  return (
    <div className="space-y-4">
      <canvas
        ref={canvasRef}
        width={500}
        height={300}
        className="border-2 border-gray-300 rounded-lg mx-auto"
      />
      <div className="flex justify-between text-sm font-mono">
        <div>
          <span className="text-secondary">YOU:</span> {playerPos.toFixed(0)}%
        </div>
        <div className="text-lg font-bold">{timeLeft.toFixed(1)}s</div>
        <div>
          <span className="text-primary">RIVAL:</span> {rivalPos.toFixed(0)}%
        </div>
      </div>
    </div>
  );
}
