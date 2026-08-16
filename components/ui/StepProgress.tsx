import { ProgressBar } from "./ProgressBar";
import { BackButton } from "./BackButton";

interface StepProgressProps {
  step: number;
  totalSteps: number;
  onBack?: () => void;
}

export function StepProgress({ step, totalSteps, onBack }: StepProgressProps) {
  return (
    <div className="flex items-center gap-4">
      <BackButton onClick={onBack} />
      <ProgressBar value={(step / totalSteps) * 100} className="flex-1" />
    </div>
  );
}
