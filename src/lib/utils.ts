
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { id } from 'date-fns/locale'
import { format } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Calculate slides per view based on screen width
export const getSlidesPerView = (width: number) => {
  if (width >= 1024) return 5; // Desktop: 5 items
  if (width >= 768) return 3;  // Tablet: 3 items
  return 2;                    // Mobile: 2 items
}

// Format tanggal dengan format Indonesia
export const formatTanggal = (date: Date | string, formatStr: string = 'PPP') => {
  const tanggal = typeof date === 'string' ? new Date(date) : date;
  return format(tanggal, formatStr, { locale: id });
}

// Format mata uang ke format Rupiah
export const formatRupiah = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}
