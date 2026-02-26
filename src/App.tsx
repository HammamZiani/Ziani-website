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
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
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
    };
  }, []);

  return (
    <>
      <Loader onComplete={() => setShowContent(true)} />
      {showContent && (
        <main className="select-none">
          <TopBar />
          <Hero />
          <About />
          <Speciality />
          <NosServices />
          <Formules />
          <BeautyCenter />
          <Gallery />
        </main>
      )}
    </>
  );
}

export default App;
