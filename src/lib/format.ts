
/**
 * Format utilitas untuk konversi ke format Indonesia
 */

// Format mata uang ke Rupiah
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

// Format tanggal ke format Indonesia
export function formatTanggalIndonesia(date: Date | string): string {
  const tanggal = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(tanggal);
}

// Daftar nama bulan dalam Bahasa Indonesia
export const namaBulan = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

// Daftar nama hari dalam Bahasa Indonesia
export const namaHari = [
  'Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'
];

// Format harga dengan ukuran yang lebih kecil untuk decimal
export function formatRupiahCompact(amount: number): string {
  if (amount >= 1000000) {
    return `Rp${(amount / 1000000).toFixed(1)} jt`;
  } else if (amount >= 1000) {
    return `Rp${(amount / 1000).toFixed(0)}rb`;
  } else {
    return formatRupiah(amount);
  }
}

// Format diskon persentase
export function formatDiskonPersen(originalPrice: number, discountPrice: number): string {
  if (!discountPrice || discountPrice >= originalPrice) return "";
  const percentage = Math.round(((originalPrice - discountPrice) / originalPrice) * 100);
  return `-${percentage}%`;
}
