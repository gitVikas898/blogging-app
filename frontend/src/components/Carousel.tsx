import { ReactNode, useRef } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  itemClassName?: string;
  containerClassName?: string;
}

function Carousel<T>({
  items,
  renderItem,
  itemClassName = "",
  containerClassName = "",
}: CarouselProps<T>) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-[900px] mt-4">
      <button
        className="absolute  -left-10 top-1/2 w-8 h-8  flex items-center justify-center transform -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 "
        onClick={() => scroll("left")}
      >
        <IoIosArrowBack fill="gray"/>
      </button>
      <div
        
        ref={scrollRef}
        className={` flex overflow-x-auto gap-6 scrollbar-hide px-10 py-4 ${containerClassName}`}
      >
        {items.map((item, index) => (
          <div key={index} className={itemClassName}>
            {renderItem(item, index)}
          </div>
        ))}
      </div>
      <button
        className="absolute -right-10 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 w-8 h-8  flex items-center justify-center  cursor-pointer"
        onClick={() => scroll("right")}
      >
        <IoIosArrowForward fill="gray"/>
      </button>
    </div>
  );
}

export default Carousel;
