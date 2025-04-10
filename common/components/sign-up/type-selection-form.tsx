import { FieldValues, UseFormRegister } from "react-hook-form"
import UserTypeCard from "./user-type-card";

type Props = {
    register: UseFormRegister<FieldValues>;
    userType: "none" | "travler" | "explorer";
    setUserType: React.Dispatch<React.SetStateAction<"none" | "travler" | "explorer">>;
}

const TypeSelectionForm = ({ register, userType, setUserType }: Props) => {
    return(
        <>
            <h2>Create an account</h2>
            <p>Tell us about yourself! How often you travel ? Let&apos;s tailor your experience to your needs.</p>
            <UserTypeCard
                register={register}
                setUserType={setUserType}
                userType={userType}
                value="explorer"
                title="I Travel 5-10 times a year"
                text="I&apos;m a frequent traveler."
            />
             <UserTypeCard
                register={register}
                setUserType={setUserType}
                userType={userType}
                value="travler"
                title="I Travel 3-5 times a year"
                text="I&apos;m a frequent traveler."
            />
             <UserTypeCard
                register={register}
                setUserType={setUserType}
                userType={userType}
                value="none"
                title="I never travel"
                text="I&apos;m a frequent traveler."
            />

        </>
    )
}

export default TypeSelectionForm;