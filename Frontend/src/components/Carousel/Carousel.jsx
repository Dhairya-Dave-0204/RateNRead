import { useEffect, useState } from "react";

const Carousel = ({ items, renderItem, title = null, itemsToShow = 1 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const maxIndex = Math.max(0, Math.ceil(items.length / itemsToShow) - 1);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === maxIndex ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? maxIndex : prevIndex - 1
    );
  };

  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) nextSlide();
    else if (touchStart - touchEnd < -100) prevSlide();
  };

  useEffect(() => {
    const interval = setInterval(() => nextSlide(), 6000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative w-full">
      {title && <h3 className="mb-4 text-xl font-semibold">{title}</h3>}

      <div
        className="overflow-hidden rounded-xl"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {Array.from({ length: Math.ceil(items.length / itemsToShow) }).map(
            (_, index) => {
              const startIdx = index * itemsToShow;
              const itemsForSlide = items.slice(
                startIdx,
                startIdx + itemsToShow
              );
              return (
                <div
                  key={index}
                  className="flex justify-center min-w-full gap-4"
                >
                  {itemsForSlide.map((item) => renderItem(item))}
                </div>
              );
            }
          )}
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute z-10 p-2 -translate-y-1/2 rounded-full shadow-md top-1/2 left-4 bg-white/80 hover:bg-white"
      >
        <i className="w-6 h-6 ri-arrow-left-s-line text-primary"></i>
      </button>
      <button
        onClick={nextSlide}
        className="absolute z-10 p-2 -translate-y-1/2 rounded-full shadow-md top-1/2 right-4 bg-white/80 hover:bg-white"
      >
        <i className="w-6 h-6 ri-arrow-right-s-line text-primary"></i>
      </button>
    </div>
  );
};

export default Carousel;
