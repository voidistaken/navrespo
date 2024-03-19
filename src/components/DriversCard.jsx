import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaRegStar } from "react-icons/fa6";
import { FaStarHalfStroke } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { StarsIcon } from "lucide-react";
import { FaGrinStars, FaStar, FaStarHalf } from "react-icons/fa";
const DriversCard = ({ img, name, price, reviews, className = "", click }) => {
  return (
    <div
      className={`flex flex-row gap-4 justify-between items-center bg-zinc-50 w-[80%] mx-auto px-6 py-8 rounded-md shadow-md ${className}`}
    >
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage
            src={
              img
                ? img
                : "https://cdn-icons-png.freepik.com/512/14663/14663198.png"
            }
            alt="@shadcn"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="w-fit flex flex-col lg:block">
          <span>{name}</span>
          <span className="flex items-center">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalfStroke />
            <FaRegStar size={14} />
            (1.3k)
          </span>
        </div>
      </div>
      <div className="flex flex-row gap-4 items-center">
        {/* <span className="font-bold text-2xl">{price} MAD</span> */}
        <Button
          onClick={click}
          variant=""
          className="px-6 md:px-8 bg-gradient-to-r from-fuchsia-500 to-pink-500 font-bold"
        >
          Accept
        </Button>
      </div>
    </div>
  );
};

export default DriversCard;
