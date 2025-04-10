import OTPInput from "./otp-input";

type Props = {
    setOTP: React.Dispatch<React.SetStateAction<string>>;
    onOTP: string;
}

const OTPForm = ({ onOTP, setOTP }: Props) => {
    return(
        <>
            <h2>Enter OTP</h2>
            <p>Enter the one time password that sent to your email.</p>
            <div className="w-full justify-center flex py-5">
                <OTPInput
                    otp={onOTP}
                    setOtp={setOTP}
                />
            </div>
        </>
    )
}

export default OTPForm;