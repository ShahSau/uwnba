import Link from "next/link";
import { Reveal } from "@/components/Motion";

/* Fill in real contact details. */
const CONTACT = {
  phone: "+8809606111228",
  email: "info@uwnba.com",
  mapUrl: "#",
};

function PhoneIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
    </svg>
  );
}

export default function SiteFooter({ showCta = true }: { showCta?: boolean }) {
  const year = new Date().getFullYear();

  return (
    <>
      {/* Call to action */}
      {showCta && (
        <section className="w-full px-4 py-14 text-center sm:py-20">
          <Reveal>
            <h2 className="mx-auto max-w-3xl text-2xl font-semibold text-[#2f2f33] sm:text-3xl">
              আপনার চেনা আছে কোনো জাতি গড়ার অজানা যোদ্ধা?
            </h2>
            <Link
              href="/nominate"
              className="mt-6 inline-block rounded-md px-7 py-2.5 text-base font-semibold text-white shadow-md ring-1 ring-white/20 transition hover:brightness-110 active:scale-[0.99]"
              style={{
                background: "linear-gradient(180deg, #822669 0%, #bd1380 100%)",
              }}
            >
              এখনই আবেদন করুন
            </Link>
          </Reveal>
        </section>
      )}

      {/* Contact */}
      <section className="w-full px-4 pb-12 pt-12 text-center">
        <Reveal>
          <h2 className="text-2xl font-semibold text-[#2f2f33]">
            যোগাযোগ করুন
          </h2>
          <div className="mt-6 flex items-center justify-center gap-8 text-[#bd1380]">
            <a href={`tel:${CONTACT.phone}`} aria-label="ফোন" className="transition hover:text-[#7a1f6a]">
              <PhoneIcon />
            </a>
            <a href={`mailto:${CONTACT.email}`} aria-label="ইমেইল" className="transition hover:text-[#7a1f6a]">
              <MailIcon />
            </a>
            <a href={CONTACT.mapUrl} aria-label="ঠিকানা" className="transition hover:text-[#7a1f6a]">
              <PinIcon />
            </a>
          </div>
        </Reveal>
      </section>

      {/* Copyright bar (full width) */}
      <footer className="w-full bg-[#f4f4f5] py-4">
        <p
          className="text-center text-sm text-[#555]"
          style={{ fontFamily: "var(--font-serif-en)" }}
        >
          © IPDC Finance Limited {year}
        </p>
      </footer>
    </>
  );
}