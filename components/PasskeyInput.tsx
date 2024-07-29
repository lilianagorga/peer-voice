"use client";

import { useRef, useState } from "react";
import Image from "next/image";

interface PasskeyInputProps {
  maxLength: number;
  minLength: number;
  value: string;
  onChange: (value: string) => void;
}

export const PasskeyInput = ({
  maxLength,
  onChange,
}: PasskeyInputProps) => {
  const [passkeyValues, setPasskeyValues] = useState<string[]>(() =>
    Array(maxLength).fill("")
  );
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, newValue: string) => {
    if (/^[a-zA-Z0-9@$!%*?&]*$/.test(newValue)) {
      const newPasskeyValues = [...passkeyValues];
      newPasskeyValues[index] = newValue;
      setPasskeyValues(newPasskeyValues);
      onChange(newPasskeyValues.join(""));

      if (newValue && index < maxLength - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !passkeyValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="relative flex items-center rounded-md">
      <Image
        src="/assets/icons/lock.svg"
        alt="lock"
        className="absolute top-4 text-dark-700"
        width={24}
        height={24}
      />
      <div className="passkey-container">
        {passkeyValues.slice(0, maxLength).map((char, index) => (
          <input
            key={index}
            type="text"
            value={char}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            maxLength={1}
            className="passkey-slot w-10 h-10 text-center border border-gray-400 rounded-md m-1 md:w-8 md:h-8 sm:w-6 sm:h-6"
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
          />
        ))}
      </div>
    </div>
  );
};