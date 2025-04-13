import OTPInput from "./otp-input";

type Props = {
  setOTP: React.Dispatch<React.SetStateAction<string>>;
  onOTP: string;
};

const OTPForm = ({ onOTP, setOTP }: Props) => {
  return (
    <div className="flex flex-col items-center space-y-5 w-full max-w-full px-2">
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900">Verification Code</h3>
        <p className="text-sm text-gray-500 mt-1">
          We&apos;ve sent a 6-digit code to your email address
        </p>
      </div>

      <div className="w-full max-w-md">
        <OTPInput otp={onOTP} setOtp={setOTP} />
      </div>

      <div className="text-center text-sm text-gray-500">
        <p>
          Didn&apos;t receive a code?{" "}
          <button
            onClick={() => {
              alert("Not yet implemented");
            }}
            className="text-tealwave hover:text-tealwave/80 font-medium"
          >
            Resend
          </button>
        </p>
      </div>
    </div>
  );
};

export default OTPForm;
