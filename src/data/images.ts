import GalleryImg1 from "../assets/gallery/img1.jpeg";
import GalleryImg2 from "../assets/gallery/img2.jpeg";
import GalleryImg3 from "../assets/gallery/img3.jpeg";
import GalleryImg4 from "../assets/gallery/img4.jpeg";
import GalleryImg5 from "../assets/gallery/img5.jpeg";
import GalleryImg6 from "../assets/gallery/img6.jpeg";
import GalleryImg7 from "../assets/gallery/img7.jpeg";
import GalleryImg8 from "../assets/gallery/img8.jpeg";
import GalleryImg9 from "../assets/gallery/img9.jpeg";
import GalleryImg10 from "../assets/gallery/img10.jpeg";
import GalleryImg11 from "../assets/gallery/img11.jpeg";
import GalleryImg12 from "../assets/gallery/img12.jpeg";

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
}

export const galleryImages: GalleryItem[] = [
  { id: 1, src: GalleryImg1, alt: "Image 1" },
  { id: 2, src: GalleryImg2, alt: "Image 2" },
  { id: 3, src: GalleryImg3, alt: "Image 3" },
  { id: 4, src: GalleryImg4, alt: "Image 4" },
  { id: 5, src: GalleryImg5, alt: "Image 5" },
  { id: 6, src: GalleryImg6, alt: "Image 6" },
  { id: 7, src: GalleryImg7, alt: "Image 7" },
  { id: 8, src: GalleryImg8, alt: "Image 8" },
  { id: 9, src: GalleryImg9, alt: "Image 9" },
  { id: 10, src: GalleryImg10, alt: "Image 10" },
  { id: 11, src: GalleryImg11, alt: "Image 11" },
  { id: 12, src: GalleryImg12, alt: "Image 12" },
];
