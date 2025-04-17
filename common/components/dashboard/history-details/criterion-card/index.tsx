import { LucideIcon } from "lucide-react";

interface CriterionCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export default function CriterionCard({
  icon: Icon,
  label,
  value,
}: CriterionCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center flex-wrap mb-2">
        <Icon className="h-5 w-5 shrink-0 text-primary mr-2" />
        <span className="font-medium text-sm text-gray-800">{label}</span>
      </div>
      <p className="text-gray-700">{value || "Not specified"}</p>
    </div>
  );
}
