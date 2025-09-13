"use client";
import { useEffect, useState } from "react";

type Props = {
  id: string;
  label: string;
  min?: number;
  max?: number;
  step?: number;
  value: number; // always controlled
  onChange: (val: number) => void;
  prefix?: string;
};

export default function RangeField({
  id,
  label,
  min = 0,
  max = 5000,
  step = 10,
  value,
  onChange,
  prefix = "",
}: Props) {
  // State for the number input field (as string for easier editing)
  const [inputValue, setInputValue] = useState<string>(String(value));

  // Sync inputValue with value prop
  useEffect(() => {
    setInputValue(String(value));
  }, [value]);

  // Helper to clamp and update
  function setBoth(v: number) {
    const clamped = Math.max(min, Math.min(max, v));
    onChange(clamped);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function handleInputBlurOrEnter() {
    const num = Number(inputValue);
    if (!isNaN(num)) {
      setBoth(num);
    } else {
      setInputValue(String(value)); // reset to last valid value
    }
  }

  return (
    <div className="flex flex-col items-center">
      <label htmlFor={id} className="text-sm font-medium">{label}</label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => setBoth(Number(e.target.value))}
        className="mt-2 max-w-xl accent-blue-500"
      />
      <div className="mt-2 flex items-center gap-2">
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            {prefix}
          </span>
          <input
            type="number"
            min={min}
            max={max}
            step={step}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlurOrEnter}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleInputBlurOrEnter();
            }}
            className="rounded-xl border px-3 py-2 pl-8 w-36"
            inputMode="numeric"
          />
        </div>
      </div>
    </div>
  );
}
