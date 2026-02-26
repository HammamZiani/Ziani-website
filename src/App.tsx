import { useEffect, useState } from "react";
import TopBar from "./components/TopBar";
import About from "./sections/About";
import BeautyCenter from "./sections/BeautyCenter";
import Formules from "./sections/Formules";
import Hero from "./sections/Hero";
import NosServices from "./sections/Services";
import Speciality from "./sections/Speciality";
import Gallery from "./sections/Galery";
import Loader from "./components/Loader";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lock scroll while loading
    if (isLoading) {
      document.body.classList.add("loading");
    } else {
      document.body.classList.remove("loading");
    }

    // Your existing resize logic
    let lastWidth = window.innerWidth;
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      if (currentWidth !== lastWidth) {
        lastWidth = currentWidth;
        window.location.reload();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.classList.remove("loading");
    };
  }, [isLoading]);

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      <main className="select-none relative">
        <TopBar />
        <Hero isLoaded={!isLoading}/>
        <About />
        <Speciality />
        <NosServices />
        <Formules />
        <BeautyCenter />
        <Gallery />
      </main>
    </>
  );
}

export default App;