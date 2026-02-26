import { useEffect } from "react";
import TopBar from "./components/TopBar";
import About from "./sections/About";
import BeautyCenter from "./sections/BeautyCenter";
import Formules from "./sections/Formules";
import Hero from "./sections/Hero";
import NosServices from "./sections/Services";
import Speciality from "./sections/Speciality";
import Gallery from "./sections/Galery";

function App() {
  useEffect(() => {
    // Store the initial width
    let lastWidth = window.innerWidth;

    const handleResize = () => {
      const currentWidth = window.innerWidth;

      // Only reload if the WIDTH has changed
      // This ignores the mobile address bar height changes
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
  );
}

export default App;
