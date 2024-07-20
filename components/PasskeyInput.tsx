"use client";

import { useRef, useState } from "react";

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
    <div className="passkey-container">
      {passkeyValues.slice(0, maxLength).map((char, index) => (
        <input
          key={index}
          type="text"
          value={char}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          maxLength={1}
          className="passkey-slot"
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
        />
      ))}
    </div>
  );
};