import ButtonHandler from "@/common/components/sign-up/button-handler";
import RegistrationStep from "@/common/components/sign-up/registration-step";
import SignUpFormProvider from "@/common/providers/form-provider";


const Page = () => {
    return(
        <div className="flex items-center h-screen justify-center">
            <SignUpFormProvider>
                <div className="flex flex-col gap-3">
                    <RegistrationStep />
                    <ButtonHandler />
                </div>
            </SignUpFormProvider>
        </div>
    )
}

export default Page;