import clsx from "clsx";
import { User } from "lucide-react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { Card, CardContent, CardDescription } from "../ui/card";

type Props = {
  value: string;
  title: string;
  text: string;
  register: UseFormRegister<FieldValues>;
  userType: "none" | "travler" | "explorer";
  setUserType: React.Dispatch<
    React.SetStateAction<"none" | "travler" | "explorer">
  >;
};

const UserTypeCard = ({
  register,
  setUserType,
  text,
  title,
  userType,
  value,
}: Props) => {
  return (
    <label htmlFor={value}>
      <Card
        className={clsx(
          "w-full cursor-pointer",
          userType == value && "border-orange-500",
        )}
      >
        <CardContent className="w-full justify-between p-2">
          <div className="flex items-center gap-3">
            <Card
              className={clsx(
                "flex justify-center p-3",
                userType == value && "border-orange-500",
              )}
            >
              <User
                size={30}
                className={clsx(
                  userType == value ? "text-orange-500" : "text-gray-400",
                )}
              />
            </Card>
            <div className="">
              <CardDescription className="text-black">{title}</CardDescription>
              <CardDescription className="text-black">{text}</CardDescription>
            </div>
          </div>
          <div>
            <div
              className={clsx(
                "w-4 h-4 rounded-full",
                userType == value ? "bg-amber-200" : "bg-transparent",
              )}
            >
              <input
                {...register("type", {
                  onChange: (event) => setUserType(event.target.value),
                })}
                value={value}
                id={value}
                type="radio"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </label>
  );
};

export default UserTypeCard;
