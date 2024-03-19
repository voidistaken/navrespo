import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function CardsCarousel({ children, className }) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      orientation="vertical"
      className={`w-full  ${className}`}
    >
      <CarouselContent className="-mt-1 h-[250px]">
        {children.map((child, index) => (
          <CarouselItem key={index} className="pt-1 md:basis-1/2">
            <div className="md:p-1">{child}</div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="md:-top-8" />
      <CarouselNext className=" bottom-16 md:bottom-20" />
    </Carousel>
  );
}

export default CardsCarousel;
