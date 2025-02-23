"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { logo } from "@/Data/Data";
import Link from "next/link";
import {
  useValidateResetOtpHandler,
  useRegeneratePasswordOtpHandler,
} from "./useResetHandler";

export default function CodeVerification() {
  const [verificationCode, setVerificationCode] = useState(
    new Array(6).fill("")
  );
  const [resendDisabled, setResendDisabled] = useState(true);
  const [timeLeft, setTimeLeft] = useState(60);
  const regenerateOtpMutation = useRegeneratePasswordOtpHandler();
  const ValidateResetOtpMutation = useValidateResetOtpHandler();

  useEffect(() => {
    if (resendDisabled) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            setResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [resendDisabled]);

  const handleChange = useCallback(
    (element, index) => {
      const value = element.value.replace(/[^0-9]/g, "");
      let newCode = [...verificationCode];

      if (value.length === 1) {
        newCode[index] = value;
        setVerificationCode(newCode);

        if (index < 5 && element.nextSibling) {
          element.nextSibling.focus();
        }
      } else {
        newCode[index] = "";
        setVerificationCode(newCode);
      }
    },
    [verificationCode]
  );

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      let newCode = [...verificationCode];
      newCode[index - 1] = "";
      setVerificationCode(newCode);

      if (e.target.previousSibling) {
        e.target.previousSibling.focus();
      }
    }
  };

  const submitCode = async (e) => {
    e.preventDefault();
    const otpCode = verificationCode.join("");
    const email = sessionStorage.getItem("email");
    ValidateResetOtpMutation.mutate({ email, otpCode });
  };
  const RegenerateCode = async (e) => {
    e.preventDefault();
    const email = sessionStorage.getItem("email");

    regenerateOtpMutation.mutate(email);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 auth absolute top-0 bottom-0 left-0 right-0">
      <div className="absolute z-100 me-4 top-0 right-0 w-[120px] sm:w-[150px]">
        <Link href="/">
          <img src={logo} alt="El hayl Logo" className="w-full" />
        </Link>
      </div>

      <div className="w-full max-w-md mx-auto text-center bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
        <div className="text-gray-800/80 flex flex-col gap-3 text-lg sm:text-xl border-b-2 pb-4 sm:pb-6 border-gray-100">
          <p>Enter the OTP sent to</p>
          <p className="text-sm sm:text-base font-medium">
            {sessionStorage.getItem("email")}
          </p>
        </div>

        <form
          className="grid grid-cols-6 gap-2 justify-center my-8 sm:my-10"
          onSubmit={submitCode}
        >
          {verificationCode.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              className="w-10 h-10 sm:w-12 sm:h-12 text-custom-yellow-4 font-extrabold text-center text-xl sm:text-2xl border rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-yellow-4"
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onFocus={(e) => e.target.select()}
            />
          ))}
        </form>

        <div className="flex flex-col gap-3">
          <button
            type="submit"
            className="px-4 py-2 sm:py-3 rounded-lg bg-custom-yellow-4 text-white font-semibold w-full hover:bg-custom-yellow-4/80 transition-all"
            onClick={submitCode}
          >
            Verify Code
          </button>

          <button
            className={`px-4 py-2 sm:py-3 rounded-lg text-white font-semibold w-full transition-all ${
              resendDisabled
                ? "opacity-50 cursor-not-allowed bg-gray-400"
                : "bg-custom-yellow-4/80 hover:bg-custom-yellow-4/100"
            }`}
            onClick={RegenerateCode}
            disabled={resendDisabled}
          >
            {resendDisabled ? `Resend OTP in ${timeLeft}s` : "Resend New OTP"}
          </button>
        </div>
      </div>
    </div>
  );
}
