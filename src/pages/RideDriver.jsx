import React, { useEffect, useState } from "react";
import RideCard from "../components/RideCard";
import { Link, useNavigate, useParams } from "react-router-dom";
import RideRequestApi from "../services/api/RideRequestApi";
import { FaSpinner } from "react-icons/fa6";
import { axiosClient } from "../api/axios";

const RideDriver = () => {
  const { rideId } = useParams();
  const [ride, setRide] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    const fetchRide = () => {
      RideRequestApi.getRide(rideId).then((res) => setRide(res.data.data));
    };

    if (rideId) {
      // Fetch ride requests initially
      fetchRide();

      // Poll for new ride requests every 10 seconds
      const interval = setInterval(() => {
        fetchRide();
        if (ride) clearInterval(interval);
      }, 5000);

      // Clean up interval on component unmount
      return () => clearInterval(interval);
    }
  }, [rideId]);

  function startRide() {
    axiosClient.patch("/rides/" + rideId + "/start", {
      started_at: new Date().toISOString(), // You can customize this value as needed
    });
  }
  function endRide() {
    axiosClient.patch("/rides/" + rideId + "/end", {
      finished_at: new Date().toISOString(), // You can customize this value as needed
    });
    nav("/driver/dashboard");
  }
  return (
    <div>
      {ride ? (
        <RideCard
          role={"driver"}
          full_name={`${ride?.rider.first_name} ${ride?.rider.last_name}`}
          from={ride?.from}
          to={ride?.to}
          number={ride?.rider.phone}
          endRide={endRide}
          startRide={startRide}
        />
      ) : (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 p-6 flex flex-col items-center justify-center gap-4">
          <FaSpinner size={30} className=" animate-spin" />
          Waiting for Rider's Response...
          <Link
            to={"/driver/dashboard"}
            className="text-sm text-gray-400 underline"
          >
            Go back
          </Link>
        </div>
      )}
    </div>
  );
};

export default RideDriver;
