import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CarFrontIcon, CarIcon, PhoneIcon, XIcon } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";
import Map from "./Map";
const RideCard = ({
  role,
  full_name,
  from,
  to,
  number,
  img,
  endRide,
  startRide,
}) => {
  const [start, setStart] = useState(false);
  return (
    <div>
      <div className="absolute left-0 w-full h-screen md:h-full z-[1]">
        <Map />
      </div>
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[10]">
        <Avatar className="w-44 h-44 mx-auto">
          <AvatarImage
            src={
              img
                ? img
                : "https://cdn-icons-png.freepik.com/512/14663/14663198.png"
            }
            alt="@profile_pic"
          />
          <AvatarFallback>profile picture</AvatarFallback>
        </Avatar>
        <h1 className="text-4xl font-normal text-center mt-5">{full_name}</h1>

        <ul className="my-4 space-y-3">
          <li>
            <a
              href="#"
              className="flex items-center p-3 text-base font-bold rounded-lg bg-gradient-to-r from-fuchsia-500 to-pink-500 text-gray-50"
            >
              <span className="flex-1 ms-3 whitespace-nowrap">{number}</span>
              <span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">
                Phone Number
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-3 text-base font-bold rounded-lg bg-gradient-to-r from-green-500 to-lime-500 text-gray-50"
            >
              <span className="flex-1 ms-3 whitespace-nowrap">{number}</span>
              <span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">
                Whatsapp
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
            >
              <span className="flex-1 ms-3 whitespace-nowrap">From</span>
              <span className="flex-1 ms-3 whitespace-nowrap">{from}</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
            >
              <span className="flex-1 ms-3 whitespace-nowrap">To</span>
              <span className="flex-1 ms-3 whitespace-nowrap">{to}</span>
            </a>
          </li>
          <li>
            {role === "driver" &&
              (start ? (
                <div
                  onClick={() => setStart(!start)}
                  className="flex cursor-pointer items-center p-3 text-base font-bold rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-gray-50"
                >
                  <span
                    onClick={endRide}
                    className="flex-1 ms-3 whitespace-nowrap"
                  >
                    End Ride
                  </span>
                  <XIcon />
                </div>
              ) : (
                <div
                  onClick={() => setStart(!start)}
                  className="flex cursor-pointer items-center p-3 text-base font-bold rounded-lg bg-gradient-to-r from-fuchsia-500 to-pink-500 text-gray-50"
                >
                  <span
                    className="flex-1 ms-3 whitespace-nowrap"
                    onClick={startRide}
                  >
                    Start Ride
                  </span>
                  <CarFrontIcon />
                </div>
              ))}
            {role === "rider" && (
              <div
                onClick={() => setStart(!start)}
                className="flex cursor-pointer items-center p-3 text-base font-bold rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-gray-50"
              >
                <span
                  onClick={endRide}
                  className="flex-1 ms-3 whitespace-nowrap"
                >
                  End Ride
                </span>
                <XIcon />
              </div>
            )}
          </li>
        </ul>
        <div>
          <a
            href="#"
            className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400"
          >
            <svg
              className="w-3 h-3 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            When do i end a ride?
          </a>
        </div>
      </div>
    </div>
  );
};

export default RideCard;
