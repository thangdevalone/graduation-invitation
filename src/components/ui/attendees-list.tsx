"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface Attendee {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

interface AttendeesListProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AttendeesList({ isOpen, onClose }: AttendeesListProps) {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchAttendees();
    }
  }, [isOpen]);

  const fetchAttendees = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/attendees");
      const data = await response.json();

      if (response.ok) {
        setAttendees(data.attendees);
      } else {
        setError(data.error || "Có lỗi xảy ra");
      }
    } catch (err) {
      setError("Không thể tải danh sách");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Danh sách người tham dự
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {attendees.length} người đã đăng ký
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <svg
                className="w-6 h-6 text-gray-500"
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

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <span className="ml-3 text-gray-600">Đang tải...</span>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="text-red-500 mb-2">❌</div>
                <p className="text-red-600">{error}</p>
                <button
                  onClick={fetchAttendees}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Thử lại
                </button>
              </div>
            ) : attendees.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎓</div>
                <p className="text-gray-500">Chưa có ai đăng ký</p>
              </div>
            ) : (
              <div className="space-y-4">
                {attendees.map((attendee, index) => (
                  <motion.div
                    key={attendee._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                          {attendee.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                          {attendee.email}
                        </p>
                        {attendee.message && (
                          <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                            <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                              "{attendee.message}"
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 ml-4">
                        {formatDate(attendee.createdAt)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
