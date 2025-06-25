"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface GraduationFormProps {
  onSubmit: (data: FormData) => void;
  isLoading?: boolean;
}

export function GraduationForm({ onSubmit, isLoading = false }: GraduationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.name.trim() && formData.email.trim()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const isValid = formData.name.trim() && formData.email.trim();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <div className="relative">
          <motion.div
            className={cn(
              "relative bg-white dark:bg-zinc-800 rounded-2xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)] transition-all duration-200",
              formData.name && "bg-gray-50"
            )}
            whileFocus={{ scale: 1.02 }}
          >
            <input
              type="text"
              value={formData.name}
              onChange={handleChange('name')}
              placeholder="Họ và tên *"
              required
              className="w-full px-4 py-3 rounded-2xl border-none bg-transparent text-black dark:text-white placeholder-gray-500 focus:outline-none focus:ring-0"
            />
          </motion.div>
        </div>

        {/* Email Input */}
        <div className="relative">
          <motion.div
            className={cn(
              "relative bg-white dark:bg-zinc-800 rounded-2xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)] transition-all duration-200",
              formData.email && "bg-gray-50"
            )}
            whileFocus={{ scale: 1.02 }}
          >
            <Image
              src="/assets/RongTA.svg"
              alt="logo"
              width={24}
              height={24}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10"
            />
            <input
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
              placeholder="Email *"
              required
              className="w-full px-4 py-3 pl-12 rounded-2xl border-none bg-transparent text-black dark:text-white placeholder-gray-500 focus:outline-none focus:ring-0"
            />
          </motion.div>
        </div>

        {/* Message Textarea */}
        <div className="relative">
          <motion.div
            className={cn(
              "relative bg-white dark:bg-zinc-800 rounded-2xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)] transition-all duration-200",
              formData.message && "bg-gray-50"
            )}
            whileFocus={{ scale: 1.02 }}
          >
            <textarea
              value={formData.message}
              onChange={handleChange('message')}
              placeholder="Lời chúc (không bắt buộc)"
              rows={3}
              className="w-full px-4 py-3 rounded-2xl border-none bg-transparent text-black dark:text-white placeholder-gray-500 focus:outline-none focus:ring-0 resize-none"
            />
          </motion.div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={!isValid || isLoading}
          className={cn(
            "w-full py-3 px-6 rounded-2xl font-medium transition-all duration-200",
            "bg-gradient-to-r from-red-500 to-blue-500 text-white",
            "hover:from-red-600 hover:to-blue-600 hover:shadow-lg",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "flex items-center justify-center space-x-2"
          )}
          whileHover={{ scale: isValid && !isLoading ? 1.05 : 1 }}
          whileTap={{ scale: isValid && !isLoading ? 0.95 : 1 }}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Đang gửi...</span>
            </>
          ) : (
            <>
              <span>Gửi lời mời</span>
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2"
              >
                <path d="M5 12l14 0" />
                <path d="M13 18l6 -6" />
                <path d="M13 6l6 6" />
              </motion.svg>
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
} 