import { Progress } from "@/components/ui/progress";

interface StatProgressProps {
  value: number;
  max?: number;
  color: string;
}

export function StatProgress({
  value,
  max = 100,
  color,
}: StatProgressProps) {
  return (
    <Progress
      value={value}
      max={max}
      indicatorClassName={color}
      className="w-full"
    />
  );
}