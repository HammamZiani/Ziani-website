import { Star, StarHalf } from "lucide-react";
import googleLogo from "../assets/icons/Google.svg";
import tripadvisorLogo from "../assets/icons/Tripadvisor.svg";
import { cn } from "../lib/utils";

interface CertificateProps {
  topTitle?: string;
  bottomTitle: string;
  label: "google" | "tripadvisor";
  rating?: number;
}

const styles = {
  google: {
    wrapper: "bg-white text-black border-black",
    inner: "border-black",
    logo: googleLogo,
  },
  tripadvisor: {
    wrapper: "bg-green-600 text-white",
    inner: "border-white",
    logo: tripadvisorLogo,
  },
};

function Certificate({
  topTitle,
  bottomTitle,
  label,
  rating = 4.5,
}: CertificateProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const s = styles[label];

  return (
    <section className="flex flex-col items-center">
      <div
        className={cn(
          "w-36 h-48 border rounded-t-full flex items-center justify-center p-1.5",
          s.wrapper,
        )}
      >
        <div
          className={cn(
            "flex flex-col items-center justify-center w-full h-full rounded-t-full border",
            s.inner,
          )}
        >
          {topTitle && (
            <span className="text-center font-secondary leading-none font-semibold">
              {topTitle}
            </span>
          )}

          <div className="rounded-full p-2">
            <img src={s.logo} alt={label} className="size-13 object-contain" />
          </div>

          <span className="font-semibold">{bottomTitle}</span>
        </div>
      </div>

      <div className="flex items-center justify-center mt-2 text-yellow-400">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={i} fill="currentColor" />
        ))}
        {hasHalfStar && <StarHalf fill="currentColor" />}
      </div>
    </section>
  );
}

export default Certificate;
