interface StatBarProps {
  label: string;
  value: number;
  max?: number;
  color?: string;
}

export default function StatBar({
  label,
  value,
  max = 100,
  color = 'primary',
}: StatBarProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const colorClasses = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    success: 'bg-success',
  };

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="font-semibold text-gray-700">{label}</span>
        <span className="text-gray-600">{Math.round(percentage)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`${colorClasses[color as keyof typeof colorClasses] || colorClasses.primary} h-2 rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
