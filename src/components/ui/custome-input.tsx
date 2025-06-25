"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

export function CustomeInput({
  placeholder,
  onChange,
  onSubmit,
  value: externalValue,
  disabled = false,
}: {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  value?: string;
  disabled?: boolean;
}) {
  const [internalValue, setInternalValue] = useState("");
  const value = externalValue !== undefined ? externalValue : internalValue;

  return (
    <form
      className={cn(
        "w-full relative max-w-xl mx-auto bg-white dark:bg-zinc-800 h-12 rounded-full overflow-hidden shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-200",
        value && "bg-gray-50",
        disabled && "opacity-50 cursor-not-allowed"
      )}
      onSubmit={disabled ? (e) => e.preventDefault() : onSubmit}
    >
      <Image
        src="/assets/RongTA.svg"
        alt="logo"
        width={35}
        height={35}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-60"
      />
      <input
        onChange={(e) => {
          if (disabled) return;
          if (externalValue !== undefined) {
            onChange && onChange(e);
          } else {
            setInternalValue(e.target.value);
            onChange && onChange(e);
          }
        }}
        value={value}
        type="email"
        disabled={disabled}
        className={cn(
          "w-full relative text-base z-50 border-none bg-white dark:text-white text-black h-full rounded-full focus:outline-none focus:ring-0 pl-12 sm:pl-13 pr-20",
          disabled && "cursor-not-allowed"
        )}
        placeholder={placeholder}
      />

      <button
        disabled={!value || disabled}
        type="submit"
        className="absolute cursor-pointer right-2 top-1/2 z-50 -translate-y-1/2 h-8 w-8 rounded-full disabled:bg-gray-100 bg-black dark:bg-zinc-900 dark:disabled:bg-zinc-800 transition duration-200 flex items-center justify-center"
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-300 h-4 w-4"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <motion.path
            d="M5 12l14 0"
            initial={{
              strokeDasharray: "50%",
              strokeDashoffset: "50%",
            }}
            animate={{
              strokeDashoffset: value ? 0 : "50%",
            }}
            transition={{
              duration: 0.3,
              ease: "linear",
            }}
          />
          <path d="M13 18l6 -6" />
          <path d="M13 6l6 6" />
        </motion.svg>
      </button>
    </form>
  );
}
