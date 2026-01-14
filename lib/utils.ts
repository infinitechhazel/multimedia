import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Full date formatter with weekday e.g., "Nov 27, 2025 (Thu)"
export const formatFullDate = (dateString: string): string => {
  const date = new Date(dateString);

  const monthDayYear = date.toLocaleDateString("en-US", {
    month: "short", 
    day: "numeric", 
    year: "numeric", 
  });

  const weekday = date.toLocaleDateString("en-US", {
    weekday: "short", 
  });

  return `${monthDayYear} (${weekday})`; 
};


// 12-hour formatter
export const formatDisplayTime = (time: string): string => {
  const [hours, minutes] = time.split(":")
  const date = new Date()
  date.setHours(parseInt(hours, 10))
  date.setMinutes(parseInt(minutes, 10))
  date.setSeconds(0)

  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}
