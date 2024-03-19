import React, { useEffect, useState } from "react";
import RideCard from "../components/RideCard";
import { useNavigate, useParams } from "react-router-dom";
import RideRequestApi from "../services/api/RideRequestApi";
import { axiosClient } from "../api/axios";

const RideRider = () => {
  const { rideId } = useParams();
  const [ride, setRide] = useState(null);
  const nav = useNavigate();

  function endRide() {
    axiosClient.patch("/rides/" + rideId + "/end", {
      finished_at: new Date().toISOString(), // You can customize this value as needed
    });
    nav("/rider/dashboard");
  }
  useEffect(() => {
    RideRequestApi.getRide(rideId)
      .then((res) => setRide(res.data.data))
      .catch(() => {
        nav("/rider/dashboard");
      });
  }, []);
  return (
    <div>
      {ride && (
        <RideCard
          role={"rider"}
          full_name={`${ride?.drivers.first_name} ${ride?.drivers.last_name}`}
          from={ride?.from}
          to={ride?.to}
          number={ride?.drivers.phone}
          endRide={endRide}
        />
      )}
    </div>
  );
};

export default RideRider;
