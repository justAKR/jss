interface ProgressBarProps {
  percent: number;
  className?: string;
  barClassName?: string;
  animate?: boolean;
}

export default function ProgressBar({ percent, className = '', barClassName = '', animate = true }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-ink-100 ${className}`}>
      <div
        className={`h-full rounded-full bg-brand-500 transition-all duration-500 ease-out ${animate ? 'animate-bar-grow' : ''} ${barClassName}`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
