import { FieldValues, UseFormRegister } from "react-hook-form";
import UserTypeCard from "./user-type-card";
import { USER_TYPE_FORM } from "@/common/constants/forms";
import type { UserType } from "@/lib/schemas/auth";

type Props = {
  register: UseFormRegister<FieldValues>;
  userType: UserType;
  setUserType: React.Dispatch<React.SetStateAction<UserType>>;
};

const TypeSelectionForm = ({ register, userType, setUserType }: Props) => {
  return (
    <>
      {USER_TYPE_FORM.map((type) => (
        <UserTypeCard
          key={type.value}
          register={register}
          setUserType={setUserType}
          userType={userType}
          value={type.value}
          title={type.title}
          text={type.text}
          icon={type.icon}
        />
      ))}
    </>
  );
};

export default TypeSelectionForm;
