
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Calculate slides per view based on screen width
export const getSlidesPerView = (width: number) => {
  if (width >= 1024) return 5; // Desktop: 5 items
  if (width >= 768) return 3;  // Tablet: 3 items
  return 2;                    // Mobile: 2 items
}
