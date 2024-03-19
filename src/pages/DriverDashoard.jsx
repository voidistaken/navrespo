import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { PiSteeringWheelBold } from "react-icons/pi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaDotCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../api/axios";
import { Button } from "@/components/ui/button";

import "leaflet/dist/leaflet.css";
import Map from "../components/Map";
import { Car } from "lucide-react";

import RidersCarousel from "../components/RidersCarousel";
import RidersCard from "../components/RidersCard";

import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/slices/authSlice";
import RideRequestApi from "../services/api/RideRequestApi";

const DriverDashboard = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [ridesRequests, setRidesRequests] = useState(null);
  const user = useSelector(getUser);

  const nav = useNavigate();

  useEffect(() => {
    const fetchRideRequests = () => {
      RideRequestApi.getRideRequests()
        .then((res) => res.data)
        .then((res) => setRidesRequests(res.data));
    };

    if (isOnline) {
      // Fetch ride requests initially
      fetchRideRequests();

      // Poll for new ride requests every 10 seconds
      const interval = setInterval(fetchRideRequests, 10000);

      // Clean up interval on component unmount
      return () => clearInterval(interval);
    }
  }, [isOnline]);

  const readyForWork = () => {
    setIsOnline(!isOnline);
  };

  function accept(rideId) {
    axiosClient.patch(`/ride_requests/${rideId}/${user?.id}/accept`);
    nav(`/driver/ride/${rideId}`);
  }

  return (
    <div className="absolute top-0 left-0 w-full h-screen">
      <div className="absolute left-0 w-full h-screen md:h-full z-[1]">
        <Map />
      </div>
      <div className="flex flex-col py-14 gap-8">
        <div className="flex flex-row justify-around">
          <div className="bg-white rounded-md p-4 hidden md:flex flex-row gap-x-3 items-center z-[5]">
            <Avatar>
              <AvatarImage
                src="https://cdn-icons-png.freepik.com/512/14663/14663198.png"
                alt="pfp"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="font-bold text-black text-xl">{user?.first_name}</p>
              <a href="#" className="text-sm text-gray-700 underline ">
                Edit profile
              </a>
            </div>
          </div>
          <Button className="rounded-full bg-white z-[100] text-black font-bold text-lg px-6 self-center hover:bg-gray-100 inline-flex gap-3 items-center w-[140px]">
            {isOnline ? (
              <>
                Online <FaDotCircle color="green" />
              </>
            ) : (
              <>
                Offline <FaDotCircle color="grey" />
              </>
            )}
          </Button>
          <div className="bg-white rounded-md p-4 hidden md:flex flex-row gap-x-3 items-center z-[5] ">
            <Car />
            <div>
              <p className="font-bold text-black text-xl">BMW</p>
              <a href="#" className="text-sm text-gray-700 underline ">
                Full details
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 max-h-[69%] w-full overflow-scroll flex flex-col  md:grid md:grid-rows-2 rounded-md z-[5] col-span-3 md:justify-center bg-gradient-to-r from-gray-100 to-gray-300 px-4 py-6 rounded-t-2xl">
          <div className="w-fit mx-auto">
            <Button
              onClick={readyForWork}
              className="bg-gradient-to-r from-fuchsia-500 to-violet-500 rounded-2xl text-lg inline-flex gap-x-2 px-8"
            >
              {isOnline ? (
                <>
                  <PiSteeringWheelBold /> Go Offline
                </>
              ) : (
                <>
                  <PiSteeringWheelBold /> Go Online
                </>
              )}
            </Button>
          </div>
          {isOnline && ridesRequests && (
            <div className="flex justify-center items-center">
              <RidersCarousel className={""}>
                {ridesRequests.map((ride) => (
                  <RidersCard
                    key={ride.id}
                    className="z-[5] w-full bg-gradient-to-r from-gray-100 to-gray-300 border-none"
                    name={ride.rider.first_name + " " + ride.rider.last_name}
                    price={ride.price}
                    distance={ride.distance}
                    startLocation={ride.from}
                    DesiredDestination={ride.to}
                    id={ride.id}
                    accept={accept}
                  />
                ))}
              </RidersCarousel>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;

// i don't get paid enough for this...
