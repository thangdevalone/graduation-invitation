"use client";
import { useScrollReveal } from "@/lib/hooks";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface CountdownProps {
  targetDate: Date;
}

interface TimeUnit {
  label: string;
  value: number;
  prevValue?: number;
}

export function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeUnit[]>([]);
  const [isExpired, setIsExpired] = useState(false);

  // Scroll reveal for countdown
  const { ref: countdownRef, isInView: isCountdownInView } = useScrollReveal({
    threshold: 0.3,
    rootMargin: "0px 0px -50px 0px",
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference <= 0) {
        setIsExpired(true);
        setTimeLeft([
          { label: "Ngày", value: 0 },
          { label: "Giờ", value: 0 },
          { label: "Phút", value: 0 },
          { label: "Giây", value: 0 },
        ]);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft((prevTimeLeft) => {
        const newTimeLeft = [
          { label: "Ngày", value: days, prevValue: prevTimeLeft[0]?.value },
          { label: "Giờ", value: hours, prevValue: prevTimeLeft[1]?.value },
          { label: "Phút", value: minutes, prevValue: prevTimeLeft[2]?.value },
          { label: "Giây", value: seconds, prevValue: prevTimeLeft[3]?.value },
        ];
        return newTimeLeft;
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (isExpired) {
    return (
      <motion.div
        ref={countdownRef}
        className="py-16 bg-gradient-to-r from-gray-50 to-gray-100"
      >
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={
              isCountdownInView
                ? {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: "easeOut" },
                  }
                : {}
            }
          >
            🎓 Lễ tốt nghiệp đã diễn ra
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={
              isCountdownInView
                ? {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, delay: 0.2, ease: "easeOut" },
                  }
                : {}
            }
          >
            Cảm ơn tất cả những ai đã quan tâm và ủng hộ!
          </motion.p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={countdownRef}
      className="py-16 bg-gradient-to-r from-blue-50 to-red-50"
    >
      <div className="max-w-4xl mx-auto text-center px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {timeLeft.map((unit, index) => (
            <motion.div
              key={unit.label}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200"
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={
                isCountdownInView
                  ? {
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      transition: {
                        delay: 0.1 + index * 0.1,
                        duration: 0.5,
                        ease: "easeOut",
                      },
                    }
                  : {}
              }
            >
              <div className="relative h-16 flex items-center justify-center overflow-hidden">
                <AnimatePresence>
                  {unit.prevValue !== undefined &&
                    unit.prevValue !== unit.value && (
                      <motion.span
                        key={`prev-${unit.prevValue}`}
                        className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-blue-500 absolute"
                        initial={{ y: 0 }}
                        animate={{ y: -64 }}
                        exit={{ y: -64 }}
                        transition={{
                          type: "tween",
                          duration: 0.5,
                          ease: "easeInOut",
                        }}
                      >
                        {unit.prevValue.toString().padStart(2, "0")}
                      </motion.span>
                    )}
                  <motion.span
                    key={`current-${unit.value}`}
                    className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-blue-500 absolute"
                    initial={{
                      y:
                        unit.prevValue !== undefined &&
                        unit.prevValue !== unit.value
                          ? 64
                          : 0,
                    }}
                    animate={{ y: 0 }}
                    transition={{
                      type: "tween",
                      duration: 0.5,
                      ease: "easeInOut",
                    }}
                  >
                    {unit.value.toString().padStart(2, "0")}
                  </motion.span>
                </AnimatePresence>
              </div>
              <p className="text-sm md:text-base font-medium text-gray-600 mt-2">
                {unit.label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={
            isCountdownInView
              ? {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.6,
                    duration: 0.6,
                    ease: "easeOut",
                  },
                }
              : {}
          }
        >
          <p className="text-lg text-gray-600">
            📅 Lễ tốt nghiệp:{" "}
            <span className="font-semibold text-gray-800">5 tháng 7, 2025</span>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
