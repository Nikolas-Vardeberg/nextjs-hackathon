import clsx from "clsx";
import { LucideIcon, User } from "lucide-react";
import { FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  value: string;
  title: string;
  text: string;
  register: UseFormRegister<FieldValues>;
  userType: "none" | "traveler" | "explorer";
  setUserType: React.Dispatch<
    React.SetStateAction<"none" | "traveler" | "explorer">
  >;
  icon?: LucideIcon;
};

const UserTypeCard = ({
  register,
  setUserType,
  text,
  title,
  userType,
  value,
  icon: Icon = User,
}: Props) => {
  const getCardStyles = () => {
    const isSelected = userType === value;

    switch (value) {
      case "explorer":
        return isSelected
          ? "border-orange-500 bg-orange-100"
          : "border-orange-200 bg-orange-50 hover:border-gray-300";
      case "traveler":
        return isSelected
          ? "border-sky-600 bg-sky-100"
          : "border-sky-200 bg-sky-50 hover:border-gray-300";
      default:
        return isSelected
          ? "border-slate-700 bg-slate-100"
          : "border-slate-200 bg-slate-50 hover:border-gray-300";
    }
  };

  const getIconContainerStyles = () => {
    const isSelected = userType === value;

    switch (value) {
      case "explorer":
        return isSelected
          ? "bg-orange-500 text-white"
          : "bg-orange-200 text-orange-500";
      case "traveler":
        return isSelected ? "bg-sky-600 text-white" : "bg-sky-200 text-sky-600";
      default:
        return isSelected
          ? "bg-slate-700 text-white"
          : "bg-slate-200 text-slate-700";
    }
  };

  const getTextStyles = () => {
    switch (value) {
      case "explorer":
        return {
          title: "text-orange-800",
          description: "text-orange-700",
        };
      case "traveler":
        return {
          title: "text-sky-800",
          description: "text-sky-700",
        };
      default:
        return {
          title: "text-slate-800",
          description: "text-slate-600",
        };
    }
  };

  const textStyles = getTextStyles();

  return (
    <div className="flex items-start space-x-2">
      <input
        {...register("type", {
          onChange: (event) => setUserType(event.target.value),
        })}
        type="radio"
        id={value}
        value={value}
        className="sr-only"
      />
      <label
        htmlFor={value}
        className={clsx(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          "group flex flex-1 cursor-pointer items-start space-x-4 rounded-lg border p-4 transition-all",
          getCardStyles(),
        )}
      >
        <div
          className={clsx(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-colors",
            getIconContainerStyles(),
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div className="space-y-1">
          <p className={`text-base font-medium ${textStyles.title}`}>{title}</p>
          <p className={`text-sm ${textStyles.description}`}>{text}</p>
        </div>
      </label>
    </div>
  );
};

export default UserTypeCard;
