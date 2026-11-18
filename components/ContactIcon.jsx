export default function ContactIcon({ icon, className = "" }) {
  if (icon === "phone") return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}><path d="M6.6 2H3.5A1.5 1.5 0 0 0 2 3.6C2.8 13.4 10.6 21.2 20.4 22a1.5 1.5 0 0 0 1.6-1.5v-3.1a1 1 0 0 0-.8-1l-4.2-1a1 1 0 0 0-1 .3l-1.8 2a16.5 16.5 0 0 1-7.9-7.9l2-1.8a1 1 0 0 0 .3-1l-1-4.2a1 1 0 0 0-1-.8Z" /></svg>;
  if (icon === "instagram") {
    const id = "contact-instagram-gradient";
    return <svg viewBox="0 0 32 32" aria-hidden="true" className={className}><defs><linearGradient id={id} x1="0" y1="1" x2="1" y2="0"><stop stopColor="#ffcc55"/><stop offset=".5" stopColor="#f33778"/><stop offset="1" stopColor="#8454cf"/></linearGradient></defs><rect width="32" height="32" rx="8" fill={`url(#${id})`}/><rect x="6" y="6" width="20" height="20" rx="6" fill="none" stroke="white" strokeWidth="2.5"/><circle cx="16" cy="16" r="5" fill="none" stroke="white" strokeWidth="2.5"/><circle cx="23" cy="9" r="1.5" fill="white"/></svg>;
  }
  if (icon === "facebook") return <svg viewBox="0 0 32 32" aria-hidden="true" className={className}><circle cx="16" cy="16" r="16" fill="#087cfa"/><path d="M18 31V19h4l.7-5H18v-3c0-1.4.5-2 2-2h3V4.5A25 25 0 0 0 19 4c-4 0-6 2.4-6 6v4H9v5h4v12" fill="white"/></svg>;
  if (icon === "whatsapp") return <svg viewBox="0 0 32 32" aria-hidden="true" className={className}><path d="M5 25 3 30l6-2a14 14 0 1 0-4-3Z" fill="none" stroke="#36c663" strokeWidth="2.5"/><path d="M11 8c-4 1-2 7 2 11s10 5 11 1l-4-3-2 2c-3-1-5-3-6-6l2-1Z" fill="#36c663"/></svg>;
  return <svg viewBox="0 0 32 32" fill="none" stroke="#e4bbbb" strokeWidth="2" aria-hidden="true" className={className}><circle cx="16" cy="16" r="14"/><rect x="7" y="10" width="18" height="13" rx="1"/><path d="m7 11 9 7 9-7M7 23l7-7m11 7-7-7"/></svg>;
}
