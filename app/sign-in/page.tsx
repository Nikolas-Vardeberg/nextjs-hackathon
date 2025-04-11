import LoginForm from "@/common/components/sign-in/login-form"
import Button from "@/common/components/ui/Button"
import { SignInFormProvider } from "@/common/providers/form-provider"
import Link from "next/link"


const Page = () => {
    return(
        <div className="flex items-center h-screen justify-center">
            <SignInFormProvider>
                <div className="flex flex-col gap-3">
                    <LoginForm />
                    <div className="w-full flex flex-col gap-3 items-center">
                        <Button
                            type="submit"
                            className="w-full"
                        >
                            Submit
                        </Button>
                        <p>
                            Dont have an account?{" "}
                            <Link href="/sign-up" className="font-bold">
                                Create one
                            </Link>
                        </p>
                    </div>
                </div>
            </SignInFormProvider>
        </div>
    )
}

export default Page