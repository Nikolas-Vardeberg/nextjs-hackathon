"use client";

import { VACATION_FOCUS_OPTIONS } from "@/common/constants/forms";

type VacationFocusSelectionProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function VacationFocusSelection({
  value,
  onChange,
}: VacationFocusSelectionProps) {
  return (
    <div className="grid grid-cols-1 gap-4 w-full" role="radiogroup">
      {VACATION_FOCUS_OPTIONS.map(({ id, icon: Icon, title, description }) => {
        const isSelected = value === id;

        const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onChange(id);
          }
        };

        return (
          <div
            key={id}
            onClick={() => onChange(id)}
            onKeyDown={handleKeyDown}
            role="radio"
            aria-checked={isSelected}
            tabIndex={0}
            className={`flex items-center p-4 group rounded-lg cursor-pointer transition-all border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1
              ${
                isSelected
                  ? "ring-2 ring-primary ring-offset-0 bg-teal-50 shadow-sm"
                  : "hover:border-primary hover:shadow-sm"
              }`}
          >
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full mr-3 transition-colors ${
                isSelected
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-500 group-hover:bg-teal-100 group-hover:text-primary"
              }`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3
                className={`font-medium ${isSelected ? "text-primary" : "text-nightocean"}`}
              >
                {title}
              </h3>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
