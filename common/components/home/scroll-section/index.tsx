import { RecommendationItem } from "@/lib/actions/recommendations/types";
import PlaceCard from "../place-card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const ScrollSection: React.FC<{
  recommendations?: RecommendationItem[];
  title?: string;
}> = ({ recommendations, title }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);

      handleScroll();
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      const scrollAmount =
        direction === "left" ? -clientWidth / 2 : clientWidth / 2;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      {title && <h1 className="text-2xl font-bold capitalize mb-4">{title}</h1>}

      {showLeftArrow && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2.5 shadow-md transform -translate-y-1/2 transition-all duration-200 ease-in-out hover:scale-110 hidden md:flex"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-6 w-6 text-teal-600" />
        </button>
      )}

      {showRightArrow && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2.5 shadow-md transform -translate-y-1/2 transition-all duration-200 ease-in-out hover:scale-110 hidden md:flex"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-6 w-6 text-teal-600" />
        </button>
      )}

      <div className="relative">
        {/* Gradients */}
        {showLeftArrow && (
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-[1] pointer-events-none" />
        )}
        {showRightArrow && (
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-[1] pointer-events-none" />
        )}

        <div
          ref={scrollContainerRef}
          className="w-full flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scroll-smooth custom-scrollbar"
        >
          {recommendations?.map((rec, index) => (
            <div
              key={rec.business_name || index}
              className="snap-start w-[90vw] sm:w-[350px] md:min-w-[350px] flex-shrink-0"
            >
              <PlaceCard rec={rec} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollSection;
