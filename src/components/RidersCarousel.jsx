import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function RidersCarousel({ children, className }) {
  return (
    <Carousel className="w-[100%] lg:w-[1140px]">
      <CarouselContent className="w-96">
        {children.map((child, index) => (
          <CarouselItem
            key={index}
            className="flex aspect-square items-center justify-center p-6"
          >
            {child}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="-left-4 md:-left-8" />
      <CarouselNext className="-right-4 md:-right-4" />
    </Carousel>
  );
}

export default RidersCarousel;
