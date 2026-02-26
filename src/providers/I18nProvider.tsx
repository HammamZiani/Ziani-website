import {
  createContext,
  useState,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";

type Locale = "en" | "fr";

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "fr";

  const savedLocale = localStorage.getItem("locale");
  if (savedLocale === "en" || savedLocale === "fr") {
    return savedLocale;
  }

  const nav = navigator.language ?? "";
  return nav.startsWith("fr") ? "en" : "fr";
}

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const translations: Record<Locale, Record<string, string>> = {
  en: {
    "Navigation.home": "home",
    "Navigation.baths": "our baths",
    "Navigation.specialty": "our specialty",
    "Navigation.services": "our services",
    "Navigation.formulas": "our formulas",
    "Navigation.salon": "beauty center",
    "Navigation.gallery": "gallery",
    "Navigation.booking": "booking",
    "Hero.tagline":
      "Plunge into the history of the first distinctive traditional hammam founded in Morocco in 1996. At Hammam Ziani, each visit is an invitation to an authentic and traditional journey, benefiting from personalized service and professional staff who take care of you.",
    "Hero.subtitle1": "One of the most beautiful",
    "Hero.subtitle2": "Traditional Baths in Morocco",
    "Hero.founded": "Founded in 1996",
    "Hero.h1.part1": "The Art of",
    "Hero.h1.part2": "hammam",
    "Hero.h1.part3": "Traditional",
    "Header.slogan": "the temple of well-being",
    "Services.title": "our services",
    "Formulas.title": "our formulas",
    "Formulas.titleSpan": "formulas",
    "SectionTitle.our": "Our",
    "SectionTitle.specialty": "Specialty",
    "SectionTitle.formulas": "Formulas",
    "SectionTitle.gallery": "Gallery",
    "SectionTitle.services": "Services",
    "Formulas.label": "Signature Experiences",
    "Formulas.popular": "Most Complete",
    "Gallery.title": "gallery",
    "Gallery.label": "Visual Collection",
    "Gallery.titleSpan": "Ziani",
    "Gallery.scroll": "Scroll to explore",
    "Gallery.heritage": "Hammam Heritage",
    "Booking.title": "booking",
    "Booking.name": "Name",
    "Booking.phone": "Phone",
    "Booking.email": "Email",
    "Booking.service": "Service",
    "Booking.date": "Date",
    "Booking.message": "Message",
    "Booking.submit": "Book now",
    "Baths.title": "our baths",
    "Baths.our": "our",
    "Baths.baths": "baths",
    "Baths.salam": "Salam",
    "Baths.salamDesc": "Open 7 days a week exclusively for men.",
    "Baths.istanbul": "Istanbul",
    "Baths.istanbulDesc": "Open 7 days a week for women and children.",
    "Baths.orient": "Orient",
    "Baths.orientDesc":
      "Open Thursday, Saturday and Sunday, exclusively for women.",
    "Baths.individuel": "Private",
    "Baths.individuelDesc":
      "A private space for women only, looking for a more intimate experience.",
    "Specialty.title": "our specialty",
    "Specialty.subtitle": "The art of a refined bath, a tradition of our own.",
    "Specialty.description":
      "In a peaceful oasis, our wellness hammam offers a range of exquisite treatments that combine the rituals of a traditional hammam with modern services. As you step through our doors, you're welcomed by a warm ambiance infused with the soothing scents of essential oils and the gentle sound of flowing water. The Hammam Ziani team are experts in their field, attentive, and caring. Each treatment is delivered with love and attention.",
    "Specialty.patrimoine": "Living Heritage",
    "About.label": "The Experience",
    "Services.label": "The Ziani Excellence",
    "Services.titleSpan": "Services",
    "Services.tagline":
      "A chromatic immersion between Deep Blue and Sandy Gold.",
    "Services.explore": "Explore",
    "Salon.title": "Ziani Beauty Center",
    "Salon.description":
      "Our beauty center offers exceptional services to enhance your appearance. You can choose from a variety of services including hair care, waxing, facials, and many more. Our professional team are pleased to welcome you every day from 9:30 AM to 7:00 PM.",
    "Beauty.label": "Aesthetic Expertise",
    "Beauty.title": "Beauty Center",
    "Beauty.titleSpan": "Ziani",
    "Beauty.description":
      "Beyond the hammams, our beauty center offers exceptional services to enhance your appearance — haircare, waxing, facials and more. Our professional team can meet all your needs.",
    "Beauty.tags": "Hair Straightening,Hair Care,Waxing,Hydrafacial,Aesthetic",
    "Beauty.open": "Open 7 days",
    "Beauty.hours": "09:30 — 19:00",
    "Beauty.cta": "Discover treatments",
    "Beauty.premiumLabel": "Premium Service",
  },
  fr: {
    "Navigation.home": "accueil",
    "Navigation.baths": "nos bains",
    "Navigation.specialty": "notre spécialité",
    "Navigation.services": "nos services",
    "Navigation.formulas": "nos formules",
    "Navigation.salon": "centre de beauté",
    "Navigation.gallery": "galerie",
    "Navigation.booking": "réservation",
    "Hero.tagline":
      "Plongez dans l'histoire du premier hammam traditionnel distinctif fondé au Maroc en 1996. Chez Hammam Ziani, chaque visite est une invitation à un voyage authentique et traditionnel, bénéficiant d'un service personnalisé et d'un personnel professionnel aux petits soins.",
    "Hero.subtitle1": "Un des plus beaux",
    "Hero.subtitle2": "Bains Traditionnels au Maroc",
    "Hero.founded": "Fondé en 1996",
    "Hero.h1.part1": "L'Art du",
    "Hero.h1.part2": "hammam",
    "Hero.h1.part3": "Traditionnel",
    "Header.slogan": "le temple du bien être",
    "Services.title": "nos services",
    "Formulas.title": "nos formules",
    "Formulas.titleSpan": "Formules",
    "SectionTitle.our": "Nos",
    "SectionTitle.specialty": "Spécialité",
    "SectionTitle.formulas": "Formules",
    "SectionTitle.gallery": "Galerie",
    "SectionTitle.services": "Services",
    "Formulas.label": "Expériences Signatures",
    "Formulas.popular": "Le Plus Complet",
    "Gallery.title": "galerie",
    "Gallery.label": "Collection Visuelle",
    "Gallery.titleSpan": "Ziani",
    "Gallery.scroll": "Faites défiler pour explorer",
    "Gallery.heritage": "Patrimoine du Hammam",
    "Booking.title": "réservation",
    "Booking.name": "Nom",
    "Booking.phone": "Téléphone",
    "Booking.email": "Email",
    "Booking.service": "Service",
    "Booking.date": "Date",
    "Booking.message": "Message",
    "Booking.submit": "Réserver",
    "Baths.title": "nos bains",
    "Baths.our": "nos",
    "Baths.baths": "bains",
    "Baths.salam": "Salam",
    "Baths.salamDesc": "Ouvert 7j/7 exclusivement pour hommes.",
    "Baths.istanbul": "Istanbul",
    "Baths.istanbulDesc": "Ouvert 7j/7 pour femmes et enfants.",
    "Baths.orient": "Orient",
    "Baths.orientDesc":
      "Ouvert jeudi, samedi et dimanche, exclusivement pour les femmes.",
    "Baths.individuel": "Individuel",
    "Baths.individuelDesc":
      "Un espace privé pour les femmes uniquement, à la recherche d'une expérience plus intime.",
    "Specialty.title": "notre spécialité",
    "Specialty.subtitle":
      "L'art d'un bain raffiné, une tradition de chez nous.",
    "Specialty.description":
      "Niché dans une oasis tranquille, ce temple de bien-être offre une gamme de soins exquis qui marient les rituels du hammam traditionnel aux techniques de bien-être modernes. Dès que vous franchissez ses portes ornées, vous êtes accueilli par une ambiance chaleureuse imprégnée des parfums apaisants des huiles essentielles et du doux bruit de l'eau qui s'écoule. L'équipe du Hammam Ziani sont des experts dans leur domaine, à l'écoute et aux petits soins. Chaque soin est prodigué avec amour et attention.",
    "Specialty.patrimoine": "Patrimoine Vivant",
    "About.label": "L'Expérience",
    "Services.label": "L'Excellence Ziani",
    "Services.tagline":
      "Une immersion chromatique entre Bleu Profond et Or Sable.",
    "Services.explore": "Explorer",
    "Salon.title": "Centre de beauté Ziani",
    "Salon.description":
      "Au-delà des hammams, notre centre de beauté propose des services exceptionnels pour sublimer votre apparence. Du lissage aux soins capillaires, de l'épilation à l'hydrafacial, notre équipe professionnelle saura répondre à tous vos besoins. Notre centre de beauté vous accueille tous les jours de 9h30 à 19h.",
    "Specialty.label": "Savoir-Faire",
    "Beauty.label": "Expertise Esthétique",
    "Beauty.title": "Centre de Beauté",
    "Beauty.titleSpan": "Ziani",
    "Beauty.description":
      "Au-delà des hammams, notre centre de beauté propose des services exceptionnels pour sublimer votre apparence. Du lissage aux soins capillaires, de l'épilation à l'hydrafacial, notre équipe professionnelle saura répondre à tous vos besoins.",
    "Beauty.tags": "Lissage,Soins Capillaires,Épilation,Hydrafacial,Esthétique",
    "Beauty.open": "Ouvert 7j/7",
    "Beauty.hours": "09H30 — 19H00",
    "Beauty.cta": "Découvrir les soins",
    "Beauty.premiumLabel": "Service Premium",
  },
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export { I18nContext };

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem("locale", newLocale);
  };

  const t = useMemo(
    () =>
      (key: string): string => {
        return translations[locale]?.[key] ?? key;
      },
    [locale],
  );

  const value = { locale, setLocale: handleSetLocale, t };

  if (!mounted) {
    return null;
  }

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
