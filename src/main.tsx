
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { id } from 'date-fns/locale'; // Import locale Indonesia

// Set locale global untuk date-fns
// Ini memastikan tanggal ditampilkan dalam format Indonesia di seluruh aplikasi

createRoot(document.getElementById("root")!).render(<App />);
