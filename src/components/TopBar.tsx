"use client";

import { Mail, Phone, Globe } from "lucide-react";
import FacebookIcon from "../assets/icons/Facebook.svg";
import WhatsappIcon from "../assets/icons/Whatsapp.svg";
import InstagramIcon from "../assets/icons/Instagram.svg";
import { useI18n } from "../providers/useI18n";

const locales = ["fr", "en"] as const;

function LocaleButton({
  locale,
  isActive,
  onClick,
}: {
  locale: (typeof locales)[number];
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-0.5 rounded-full transition-all cursor-pointer ${
        isActive
          ? "bg-blue-500 text-white"
          : "text-blue-300 hover:text-white"
      }`}
    >
      {locale.toUpperCase()}
    </button>
  );
}

export default function TopBar() {
  const { locale, setLocale } = useI18n();

  const isActiveLocale = (l: (typeof locales)[number]) => locale === l;

  return (
    <div className="bg-blue-900 text-white font-secondary text-[0.85rem]">
      {/* Wrapper keeps your spacing style */}
      <div className="flex items-center justify-between px-6 lg:px-20 py-3">
        {/* LEFT — Language (unchanged design) */}
        <div className="flex items-center gap-3">
          <Globe className="text-blue-300 size-5" />

          <div className="flex bg-blue-950/50 p-1 rounded-full border border-blue-700/50 transition-all">
            {locales.map((l) => (
              <LocaleButton
                key={l}
                locale={l}
                isActive={isActiveLocale(l)}
                onClick={() => setLocale(l)}
              />
            ))}
          </div>
        </div>

        {/* CENTER — Contact (same layout, just responsive-safe) */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="tel:+212522319695"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Phone size={16} /> 05 22 31 96 95
          </a>

          <a
            href="mailto:hammamziani@yahoo.com"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Mail size={16} /> Hammamziani@yahoo.com
          </a>
        </div>

        {/* RIGHT — Social Icons (unchanged visually) */}
        <div className="flex items-center gap-2">
          <a href="#" className="hover:opacity-80 transition-opacity">
            <img src={FacebookIcon} alt="Facebook" className="size-8" />
          </a>

          <a href="#" className="hover:opacity-80 transition-opacity">
            <img src={WhatsappIcon} alt="WhatsApp" className="size-8" />
          </a>

          <a href="#" className="hover:opacity-80 transition-opacity">
            <img src={InstagramIcon} alt="Instagram" className="size-8" />
          </a>
        </div>
      </div>

      {/* Mobile contact row (only shows on small screens) */}
      <div className="md:hidden flex items-center justify-center gap-6 pb-3 text-[0.75rem] text-blue-100">
        <a href="tel:+212522319695" className="flex items-center gap-2">
          <Phone size={14} /> 05 22 31 96 95
        </a>
      </div>
    </div>
  );
}
