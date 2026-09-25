import Image from "next/image";
import localFont from "next/font/local";
import { contacts, socialLinks } from "../data/contact";

const headingFont = localFont({ src: "../public/fonts/lobster.ttf", weight: "400", display: "swap" });

function ContactIcon({ icon, className = "" }) {
  if (icon === "phone") return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}><path d="M6.6 2H3.5A1.5 1.5 0 0 0 2 3.6C2.8 13.4 10.6 21.2 20.4 22a1.5 1.5 0 0 0 1.6-1.5v-3.1a1 1 0 0 0-.8-1l-4.2-1a1 1 0 0 0-1 .3l-1.8 2a16.5 16.5 0 0 1-7.9-7.9l2-1.8a1 1 0 0 0 .3-1l-1-4.2a1 1 0 0 0-1-.8Z" /></svg>;
  if (icon === "instagram") return <svg viewBox="0 0 32 32" aria-hidden="true" className={className}><defs><linearGradient id="contact-instagram" x1="0" y1="1" x2="1" y2="0"><stop stopColor="#ffcc55"/><stop offset=".5" stopColor="#f33778"/><stop offset="1" stopColor="#8454cf"/></linearGradient></defs><rect width="32" height="32" rx="8" fill="url(#contact-instagram)"/><rect x="6" y="6" width="20" height="20" rx="6" fill="none" stroke="white" strokeWidth="2.5"/><circle cx="16" cy="16" r="5" fill="none" stroke="white" strokeWidth="2.5"/><circle cx="23" cy="9" r="1.5" fill="white"/></svg>;
  if (icon === "facebook") return <svg viewBox="0 0 32 32" aria-hidden="true" className={className}><circle cx="16" cy="16" r="16" fill="#087cfa"/><path d="M18 31V19h4l.7-5H18v-3c0-1.4.5-2 2-2h3V4.5A25 25 0 0 0 19 4c-4 0-6 2.4-6 6v4H9v5h4v12" fill="white"/></svg>;
  if (icon === "whatsapp") return <svg viewBox="0 0 32 32" aria-hidden="true" className={className}><path d="M5 25 3 30l6-2a14 14 0 1 0-4-3Z" fill="none" stroke="#36c663" strokeWidth="2.5"/><path d="M11 8c-4 1-2 7 2 11s10 5 11 1l-4-3-2 2c-3-1-5-3-6-6l2-1Z" fill="#36c663"/></svg>;
  return <svg viewBox="0 0 32 32" fill="none" stroke="#e4bbbb" strokeWidth="2" aria-hidden="true" className={className}><circle cx="16" cy="16" r="14"/><rect x="7" y="10" width="18" height="13" rx="1"/><path d="m7 11 9 7 9-7M7 23l7-7m11 7-7-7"/></svg>;
}

export default function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate overflow-hidden bg-[#9e2424] text-white">
      <Image src="/media/contact us image.webp" alt="" width={1172} height={1342} className="pointer-events-none absolute inset-y-0 left-0 hidden h-full w-auto object-contain min-[640px]:block" sizes="23vw" />
      <div className="relative mx-auto flex min-h-[560px] max-w-[1280px] flex-col items-center px-[8%] pt-10 pb-20 min-[640px]:min-h-0 min-[640px]:flex-row min-[640px]:items-center min-[640px]:gap-[5%] min-[640px]:py-[2.5%] min-[640px]:pr-[5.7%] min-[640px]:pl-[28%]">
        <div className="w-full text-center min-[640px]:w-[68%]">
          <h2 id="contact-title" className={`${headingFont.className} text-[36px] leading-[1.1] font-normal min-[640px]:text-[clamp(28px,4vw,48px)]`}>Contact Us</h2>
          <p className="mt-1 text-[13px] font-bold min-[640px]:text-[clamp(9px,1.4vw,17px)]">We’d love to hear from you.</p>
          <p className="mx-auto mt-4 max-w-[350px] text-[12px] leading-[1.35] min-[640px]:mt-[3%] min-[640px]:max-w-none min-[640px]:text-[clamp(8px,1.05vw,13px)]">For rice orders, product information, pricing, or any other inquiry, feel free to contact A Mustafa Traders. Our team is always ready to assist you.</p>
          <div className="mt-6 flex items-center justify-center gap-3 min-[640px]:mt-[6%] min-[640px]:gap-[2%]" aria-label="Social media and email">
            {socialLinks.map(({ name, icon, href, newTab }) => {
              const className = "flex h-11 w-11 items-center justify-center rounded-lg min-[640px]:h-[clamp(32px,4.3vw,48px)] min-[640px]:w-[clamp(32px,4.3vw,48px)] transition-colors duration-200 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
              const graphic = <ContactIcon icon={icon} className="h-7 w-7 min-[640px]:h-[clamp(22px,3vw,36px)] min-[640px]:w-[clamp(22px,3vw,36px)]" />;
              return href ? <a key={name} href={href} target={newTab ? "_blank" : undefined} rel={newTab ? "noopener noreferrer" : undefined} aria-label={name} className={className}>{graphic}</a> : <button key={name} type="button" aria-label={`${name} — link coming soon`} aria-disabled="true" title={`${name} link coming soon`} className={`${className} cursor-default`}>{graphic}</button>;
            })}
          </div>
        </div>
        <div className="mt-7 flex w-full max-w-[270px] flex-col gap-5 min-[640px]:mt-0 min-[640px]:w-[27%] min-[640px]:max-w-none min-[640px]:gap-[1.8vw]">
          {contacts.map((contact) => (
            <a key={contact.phone} href={contact.href} aria-label={`Call ${contact.name} on ${contact.phone}`} className="flex min-h-[64px] items-center gap-2 rounded-xl bg-white px-3 py-2 text-[#a12222] transition-colors duration-200 hover:bg-[#fff2e9] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white min-[640px]:min-h-[44px] min-[640px]:gap-[5%] min-[640px]:rounded-lg min-[640px]:px-[6%] min-[640px]:py-[3%]">
              <ContactIcon icon="phone" className="h-8 w-8 shrink-0 min-[640px]:h-auto min-[640px]:w-[20%]" />
              <span className="min-w-0 flex-1 text-center leading-[1.2]">
                <span className="block text-[12px] min-[640px]:text-[clamp(6px,.9vw,11px)]">{contact.name}</span>
                <span className="block text-[10px] text-black min-[640px]:text-[clamp(5.5px,.76vw,9px)]">{contact.role}</span>
                <span className="block text-[18px] font-bold min-[640px]:text-[clamp(11px,1.6vw,19px)]">{contact.phone}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
