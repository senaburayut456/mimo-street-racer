interface LoadingSpinnerProps {
  message?: string;
  progress?: number;
}

export default function LoadingSpinner({
  message = 'Loading...',
  progress,
}: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-200 rounded-full" />
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-primary rounded-full animate-spin border-t-transparent" />
      </div>

      <div className="text-center space-y-2">
        <p className="text-lg font-semibold text-gray-800">{message}</p>
        {progress !== undefined && (
          <div className="w-64">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-1">{progress}%</p>
          </div>
        )}
      </div>
    </div>
  );
}
