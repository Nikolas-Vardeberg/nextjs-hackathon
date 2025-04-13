import { InputOTP, InputOTPSlot } from "../../ui/input-otp";

type Props = {
  otp: string;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
};

const OTPInput = ({ otp, setOtp }: Props) => {
  const handleChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    setOtp(numericValue);
  };

  return (
    <InputOTP
      maxLength={6}
      value={otp}
      onChange={handleChange}
      containerClassName="justify-center"
      pattern="[0-9]*"
      inputMode="numeric"
    >
      <div className="flex gap-0.5 xs:gap-1 sm:gap-2 md:gap-3">
        <div>
          <InputOTPSlot
            index={0}
            className="h-8 w-8 xs:h-10 xs:w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 text-xs xs:text-sm sm:text-base md:text-lg rounded-md bg-gray-50 border-gray-300 focus:border-teal-500"
          />
        </div>
        <div>
          <InputOTPSlot
            index={1}
            className="h-8 w-8 xs:h-10 xs:w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 text-xs xs:text-sm sm:text-base md:text-lg rounded-md bg-gray-50 border-gray-300 focus:border-teal-500"
          />
        </div>
        <div>
          <InputOTPSlot
            index={2}
            className="h-8 w-8 xs:h-10 xs:w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 text-xs xs:text-sm sm:text-base md:text-lg rounded-md bg-gray-50 border-gray-300 focus:border-teal-500"
          />
        </div>
        <div>
          <InputOTPSlot
            index={3}
            className="h-8 w-8 xs:h-10 xs:w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 text-xs xs:text-sm sm:text-base md:text-lg rounded-md bg-gray-50 border-gray-300 focus:border-teal-500"
          />
        </div>
        <div>
          <InputOTPSlot
            index={4}
            className="h-8 w-8 xs:h-10 xs:w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 text-xs xs:text-sm sm:text-base md:text-lg rounded-md bg-gray-50 border-gray-300 focus:border-teal-500"
          />
        </div>
        <div>
          <InputOTPSlot
            index={5}
            className="h-8 w-8 xs:h-10 xs:w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 text-xs xs:text-sm sm:text-base md:text-lg rounded-md bg-gray-50 border-gray-300 focus:border-teal-500"
          />
        </div>
      </div>
    </InputOTP>
  );
};

export default OTPInput;
