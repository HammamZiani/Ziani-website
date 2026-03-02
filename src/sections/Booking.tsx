import { useState, useRef, useMemo, useCallback, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Bglines from "../components/Bglines";
import { useI18n } from "../providers/useI18n";
import formules from "../data/formules.json";
import SplitText from "../components/SplitText";
import { Images } from "../lib/constants";

interface BookingProps {
  isLoaded: boolean;
}

interface FormulaData {
  id: number;
  name: { fr: string; en: string };
  price: number;
}

const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 7; hour <= 21; hour++) {
    slots.push(`${hour.toString().padStart(2, "0")}:00`);
    if (hour < 21) slots.push(`${hour.toString().padStart(2, "0")}:30`);
  }
  slots.push("21:30");
  return slots;
};

export default function Booking({ isLoaded }: BookingProps) {
  const { locale, t } = useI18n();
  const currentLocale = (locale as "fr" | "en") || "fr";
  const sectionRef = useRef<HTMLDivElement>(null);
  const wizardRef = useRef<HTMLDivElement>(null);
  const leftSideRef = useRef<HTMLDivElement>(null);
  const rightSideRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  const [step, setStep] = useState(1);
  const [selectedFormula, setSelectedFormula] = useState<FormulaData | null>(
    null,
  );
  const [selectedTime, setSelectedTime] = useState("");
  const [hasChildren, setHasChildren] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "+212",
    date: "",
    persons: "2",
    childrenCount: "1",
    message: "",
  });

  const TIME_SLOTS = useMemo(() => generateTimeSlots(), []);

  // --- ANIMATION LOGIC (MEMOIZED) ---
  const animateBooking = useCallback(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Side reveal
      tl.fromTo(
        [leftSideRef.current, rightSideRef.current],
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.4,
          ease: "expo.inOut",
          stagger: 0.1,
        },
      ).to(
        ".booking-reveal-word",
        {
          y: "0%",
          opacity: 1,
          stagger: 0.02,
          duration: 0.8,
          ease: "expo.out",
        },
        "-=0.6",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // --- TRIGGER ON LOAD & LOCALE CHANGE ---
  useEffect(() => {
    if (!isLoaded) return;

    if (!hasAnimatedRef.current || locale) {
      hasAnimatedRef.current = true;
      const cleanup = animateBooking();
      return cleanup;
    }
  }, [isLoaded, locale, animateBooking]);

  // --- INTERNAL STEP TRANSITION ---
  useGSAP(() => {
    if (!isLoaded) return;
    gsap.fromTo(
      wizardRef.current,
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
    );
  }, [step, isLoaded]);

  const handleWhatsApp = () => {
    const childInfo = hasChildren
      ? `\n👶 *${t("Booking.children")}:* ${form.childrenCount}`
      : "";
    const text = `✨ *${t("Booking.title").toUpperCase()}* ✨\n\n🌿 *Rituel:* ${selectedFormula?.name[currentLocale]}\n👤 *${t("Booking.name")}:* ${form.name}\n📞 *${t("Booking.phone")}:* ${form.phone}\n📅 *${t("Booking.date")}:* ${form.date}\n⏰ *Heure:* ${selectedTime}\n👥 *${t("Booking.adults")}:* ${form.persons}${childInfo}\n📝 *Note:* ${form.message || "---"}`;
    window.open(
      `https://wa.me/212661325840?text=${encodeURIComponent(text)}`,
      "_blank",
    );
  };

  return (
    <section
      ref={sectionRef}
      id="booking"
      className="relative z-30 min-h-screen bg-[#E5E5DD] overflow-hidden flex flex-col lg:block font-sans text-black"
    >
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <Bglines />
      </div>

      <div className="relative z-10 grid lg:grid-cols-[0.7fr_1.3fr] min-h-screen">
        {/* --- LEFT SIDE: Visual --- */}
        <div
          ref={leftSideRef}
          className="relative h-[25vh] lg:h-full overflow-hidden"
          style={{ clipPath: "inset(100% 0% 0% 0%)" }}
        >
          <img
            src={Images.Booking_Left}
            alt="Hammam"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-4 left-6 lg:bottom-16 lg:left-12 z-10 text-white">
            <span className="mb-1 block">
              <SplitText
                text={t("Booking.concierge")}
                className="text-brand-yellow uppercase tracking-[0.4em] text-[8px] lg:text-[10px]"
                wordClass="booking-reveal-word"
              />
            </span>
            <h2 className="text-2xl lg:text-6xl font-primary uppercase leading-tight">
              <SplitText
                text={t("Booking.reserve")}
                wordClass="booking-reveal-word"
              />{" "}
              <br className="hidden lg:block" />
              <SplitText
                text={t("Booking.moment")}
                className="italic font-light text-brand-yellow/90 lg:normal-case"
                wordClass="booking-reveal-word"
              />
            </h2>
          </div>
        </div>

        {/* --- RIGHT SIDE: UI --- */}
        <div
          ref={rightSideRef}
          className="flex flex-col bg-transparent px-6 py-8 lg:px-20 lg:justify-center"
          style={{ clipPath: "inset(100% 0% 0% 0%)" }}
        >
          <div className="max-w-2xl w-full mx-auto">
            {/* Step Indicators */}
            <div className="flex items-center gap-4 mb-8 lg:mb-12">
              <span className="text-[10px] font-bold tracking-widest">
                {t("Booking.step")} 0{step} / 03
              </span>
              <div className="h-[1px] flex-1 bg-black/10 relative">
                <div
                  className="absolute left-0 h-full bg-black transition-all duration-500"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>

            <div ref={wizardRef} className="min-h-[480px]">
              {step === 1 && (
                <div className="space-y-6 lg:space-y-8">
                  <h4 className="text-2xl lg:text-4xl font-primary uppercase">
                    {t("Booking.ritual")}
                  </h4>
                  <div className="grid gap-3 max-h-[40vh] lg:max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                    {formules.map((pkg: any) => (
                      <button
                        key={pkg.id}
                        onClick={() => setSelectedFormula(pkg)}
                        className={`flex items-center justify-between p-5 border transition-all duration-300 
                          ${selectedFormula?.id === pkg.id ? "border-black bg-black text-white" : "border-black/10 bg-transparent hover:border-black"}`}
                      >
                        <span className="text-[10px] uppercase tracking-widest font-bold text-left">
                          {pkg.name[currentLocale]}
                        </span>
                        <span className="font-primary text-md lg:text-lg">
                          {pkg.price} MAD
                        </span>
                      </button>
                    ))}
                  </div>
                  <ActionButton
                    disabled={!selectedFormula}
                    onClick={() => setStep(2)}
                    label={t("Booking.continue")}
                  />
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8">
                  <h4 className="text-2xl lg:text-4xl font-primary uppercase">
                    {t("Booking.dateTime")}
                  </h4>
                  <div className="flex flex-col gap-10">
                    <div className="border-b border-black/10 py-2 w-full max-w-sm">
                      <label className="text-[9px] uppercase tracking-widest text-black/40 block mb-2">
                        {t("Booking.selectDate")}
                      </label>
                      <input
                        type="date"
                        value={form.date}
                        onChange={(e) =>
                          setForm({ ...form, date: e.target.value })
                        }
                        className="w-full bg-transparent outline-none text-md cursor-pointer h-8 appearance-none date-input-field"
                      />
                    </div>
                    <div className="w-full">
                      <label className="text-[9px] uppercase tracking-widest text-black/40 block mb-4">
                        {t("Booking.slots")}
                      </label>
                      <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2 max-h-[220px] overflow-y-auto p-1 custom-scrollbar">
                        {TIME_SLOTS.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`py-3 text-[10px] border transition-all ${selectedTime === time ? "bg-black text-white border-black" : "border-black/10 text-black/40 hover:border-black"}`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-10 pt-6 border-t border-black/5">
                    <button
                      onClick={() => setStep(1)}
                      className="text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition"
                    >
                      {t("Booking.back")}
                    </button>
                    <ActionButton
                      disabled={!form.date || !selectedTime}
                      onClick={() => setStep(3)}
                      label={t("Booking.next")}
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-8">
                  <h4 className="text-2xl lg:text-4xl font-primary uppercase">
                    {t("Booking.contact")}
                  </h4>
                  <div className="grid lg:grid-cols-2 gap-x-10 gap-y-6">
                    <FloatingInput
                      label={t("Booking.fullName")}
                      value={form.name}
                      onChange={(e: any) =>
                        setForm({ ...form, name: e.target.value })
                      }
                    />
                    <FloatingInput
                      label={t("Booking.phone")}
                      value={form.phone}
                      onChange={(e: any) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                    />
                    <div className="border-b border-black/10">
                      <label className="text-[9px] uppercase tracking-widest text-black/40 block mb-1">
                        {t("Booking.adults")}
                      </label>
                      <select
                        value={form.persons}
                        onChange={(e) =>
                          setForm({ ...form, persons: e.target.value })
                        }
                        className="w-full py-2 bg-transparent outline-none text-xs"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                          <option key={n} value={n}>
                            {n} {t("Booking.adults")}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col justify-center">
                      <button
                        onClick={() => setHasChildren(!hasChildren)}
                        className="flex items-center gap-3 group w-fit"
                      >
                        <div
                          className={`w-8 h-4 rounded-full relative transition-colors ${hasChildren ? "bg-black" : "bg-black/10"}`}
                        >
                          <div
                            className={`absolute top-1 w-2 h-2 rounded-full bg-[#E5E5DD] transition-all ${hasChildren ? "left-5" : "left-1"}`}
                          />
                        </div>
                        <span className="text-[10px] uppercase tracking-widest text-black/60 group-hover:text-black">
                          {t("Booking.withChildren")}
                        </span>
                      </button>
                      {hasChildren && (
                        <select
                          value={form.childrenCount}
                          onChange={(e) =>
                            setForm({ ...form, childrenCount: e.target.value })
                          }
                          className="mt-3 bg-transparent border-b border-black/10 py-1 text-xs outline-none"
                        >
                          {[1, 2, 3, 4, 5].map((n) => (
                            <option key={n} value={n}>
                              {n} {t("Booking.children")}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>
                  <FloatingInput
                    label={t("Booking.messageNote")}
                    value={form.message}
                    onChange={(e: any) =>
                      setForm({ ...form, message: e.target.value })
                    }
                  />
                  <div className="flex items-center justify-between gap-10 pt-8">
                    <button
                      onClick={() => setStep(2)}
                      className="text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100"
                    >
                      {t("Booking.back")}
                    </button>
                    <ActionButton
                      label={t("Booking.confirm")}
                      disabled={!form.name}
                      onClick={handleWhatsApp}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .date-input-field::-webkit-calendar-picker-indicator { cursor: pointer; opacity: 0.6; }
        .custom-scrollbar::-webkit-scrollbar { width: 2px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #000; }
      `}</style>
    </section>
  );
}

function ActionButton({
  disabled,
  onClick,
  label,
}: {
  disabled: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full lg:w-auto group relative overflow-hidden border border-[#1a1a1a] px-10 py-5 transition-all duration-500 ${disabled ? "opacity-20 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span className="relative z-10 text-[#1a1a1a] text-[0.6rem] tracking-[0.5em] uppercase font-bold group-hover:text-white transition-colors duration-500">
        {label}
      </span>
      {!disabled && (
        <div className="absolute inset-0 bg-[#1a1a1a] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
      )}
    </button>
  );
}

function FloatingInput({ label, value, onChange }: any) {
  return (
    <div className="group relative border-b border-black/10 focus-within:border-black transition-colors">
      <label className="text-[9px] uppercase tracking-widest text-black/40 block mb-1 group-focus-within:text-black transition-colors">
        {label}
      </label>
      <input
        value={value}
        onChange={onChange}
        className="w-full bg-transparent outline-none text-xs py-2"
      />
    </div>
  );
}
