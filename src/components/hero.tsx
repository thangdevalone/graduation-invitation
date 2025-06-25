"use client";
import { useScrollReveal } from "@/lib/hooks";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Countdown } from "./ui/countdown";
import { CustomeInput } from "./ui/custome-input";

export function Hero() {
  const [email, setEmail] = useState("");
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Scroll reveal for hero content
  const { ref: heroRef, isInView: isHeroInView } = useScrollReveal({
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px",
  });

  // Graduation date: July 5, 2025
  const graduationDate = new Date("2025-07-05T23:59:59.999Z");
  const isExpired = new Date() > graduationDate;

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isExpired) {
      setNotification({
        type: "error",
        message:
          "Thời gian đăng ký đã hết hạn. Lễ tốt nghiệp đã diễn ra vào ngày 5/7/2025.",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setNotification({
        type: "error",
        message: "Email không hợp lệ",
      });
      return;
    }
    setShowDetailsModal(true);
  };

  const handleFinalSubmit = async (name: string, message: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/attendees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setNotification({
          type: "success",
          message: result.message,
        });
        setEmail("");
        setShowDetailsModal(false);
      } else {
        setNotification({
          type: "error",
          message: result.error || "Có lỗi xảy ra",
        });
      }
    } catch (error) {
      setNotification({
        type: "error",
        message: "Không thể kết nối đến server",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.div
        ref={heroRef}
        className="h-[80vh] md:h-[90vh] w-full bg-white flex flex-col items-center justify-center antialiased relative overflow-hidden"
      >
        <div className="max-w-2xl mx-auto p-4 relative z-10">
          <div className="relative overflow-visible">
            <motion.h1
              className="relative z-10 text-3xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-red-500 to-blue-500 text-center font-sans font-bold"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={
                isHeroInView
                  ? {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        duration: 0.8,
                        ease: "easeOut",
                      },
                    }
                  : {}
              }
            >
              Join graduation ceremony of me
            </motion.h1>
          </div>

          <p></p>
          <motion.p
            className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={
              isHeroInView
                ? {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      delay: 0.2,
                      ease: "easeOut",
                    },
                  }
                : {}
            }
          >
            Đây không chỉ là một buổi lễ – mà là cột mốc quan trọng đánh dấu
            chặng đường học tập đầy nỗ lực và đam mê. Dù bạn là người thân, bạn
            bè hay thầy cô, sự hiện diện của bạn sẽ là niềm vinh dự lớn lao.
            Điền địa chỉ email của bạn để nhận lời mời.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={
              isHeroInView
                ? {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      delay: 0.4,
                      ease: "easeOut",
                    },
                  }
                : {}
            }
          >
            <CustomeInput
              placeholder={isExpired ? "Đăng ký đã đóng" : "example@gmail.com"}
              onChange={handleEmailChange}
              onSubmit={handleEmailSubmit}
              value={email}
              disabled={isExpired}
            />
          </motion.div>
        </div>

        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-6 right-6 max-w-md p-4 rounded-2xl shadow-2xl z-500 ${
              notification.type === "success"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            <div className="flex items-center space-x-3">
              <div>
                <p className="font-medium text-sm">{notification.message}</p>
              </div>
              <button
                onClick={() => setNotification(null)}
                className="ml-auto text-white hover:text-gray-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Countdown Section */}
      <Countdown targetDate={graduationDate} />

      {/* Details Modal */}
      <DetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        email={email}
        onSubmit={handleFinalSubmit}
        isLoading={isLoading}
        isExpired={isExpired}
      />
    </>
  );
}

// Details Modal Component
interface DetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onSubmit: (name: string, message: string) => Promise<void>;
  isLoading: boolean;
  isExpired: boolean;
}

function DetailsModal({
  isOpen,
  onClose,
  email,
  onSubmit,
  isLoading,
  isExpired,
}: DetailsModalProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      await onSubmit(name.trim(), message.trim());
      setName("");
      setMessage("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-200 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Điền thông tin của bạn
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Email:{" "}
                <span className="font-medium text-blue-600">{email}</span>
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Alert about deadline */}
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-2xl">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-yellow-600 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-yellow-800">
                    Thời hạn đăng ký
                  </h3>
                  <p className="text-sm text-yellow-700 mt-1">
                    Tính năng này chỉ hoạt động trước ngày{" "}
                    <strong>5/7/2025</strong> (ngày tốt nghiệp). Hãy đăng ký sớm
                    để không bỏ lỡ!
                  </p>
                </div>
              </div>
            </div>

            <div>
              <input
                type="text"
                value={name}
                autoFocus={true}
                onChange={(e) => setName(e.target.value)}
                placeholder="Họ và tên *"
                required
                disabled={isExpired}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed text-base"
              />
            </div>

            <div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Lời chúc (không bắt buộc)"
                rows={3}
                disabled={isExpired}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:opacity-50 disabled:cursor-not-allowed text-base"
              />
            </div>

            <button
              type="submit"
              disabled={!name.trim() || isLoading || isExpired}
              className="w-full py-3 px-6 rounded-2xl font-medium transition-all duration-200 bg-gradient-to-r from-red-500 to-blue-500 text-white hover:from-red-600 hover:to-blue-600 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center space-x-2"
            >
              {isExpired ? (
                <>
                  <span>⛔ Đăng ký đã đóng</span>
                </>
              ) : isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Đang đăng ký...</span>
                </>
              ) : (
                <>
                  <span>Tôi sẽ tham dự</span>
                  <svg
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
                  </svg>
                </>
              )}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
