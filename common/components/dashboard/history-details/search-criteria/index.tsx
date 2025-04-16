import { MapPin, Home, DollarSign, Clock, Activity } from "lucide-react";
import CriterionCard from "../criterion-card";

interface SearchCriteriaProps {
  answers: string[];
}

export default function SearchCriteria({ answers }: SearchCriteriaProps) {
  if (!answers || answers.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Your Search Criteria</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          {
            icon: MapPin,
            label: "Destination",
            value: answers[3],
            index: 3,
          },
          {
            icon: Home,
            label: "Accommodation",
            value: answers[1],
            index: 1,
          },
          {
            icon: DollarSign,
            label: "Budget",
            value: answers[2],
            index: 2,
          },
          {
            icon: Clock,
            label: "Duration",
            value: answers[5],
            index: 5,
          },
          {
            icon: Activity,
            label: "Activities",
            value: answers[4],
            index: 4,
          },
        ].map((criterion, idx) => (
          <CriterionCard
            key={`criterion-${idx}`}
            icon={criterion.icon}
            label={criterion.label}
            value={criterion.value}
          />
        ))}
      </div>
    </div>
  );
}
