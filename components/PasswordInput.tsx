"use client";

import { useState } from "react";
import Image from "next/image";

interface PasswordInputProps {
  maxLength: number;
  minLength: number;
  value: string;
  onChange: (value: string) => void;
  iconSrc?: string;
  iconAlt?: string;
}

const PasswordInput = ({
  maxLength,
  minLength,
  value,
  onChange,
  iconSrc,
  iconAlt,
}: PasswordInputProps) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (/^[a-zA-Z0-9@$!%*?&]*$/.test(newValue) && newValue.length <= maxLength) {
      setInputValue(newValue);
      onChange(newValue);
    }
  };

  return (
    <div className="relative flex items-center rounded-md">
      {iconSrc && (
        <Image
          src={iconSrc}
          alt={iconAlt || "icon"}
          className="absolute left-2 text-dark-700"
          width={24}
          height={24}
        />
      )}
      <input
        type="password"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter your password"
        className="shad-input border border-dark-500 bg-dark-400 rounded-md w-full pl-10 pr-4 py-2 text-sm"
        maxLength={maxLength}
        minLength={minLength}
      />
    </div>
  );
};

export default PasswordInput;