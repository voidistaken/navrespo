import React, { useEffect, useState } from "react";
import { FaSearchLocation } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import "leaflet/dist/leaflet.css";
import axios from "axios";
import Map from "../components/Map";

import DriversCard from "../components/DriversCard";
import CardsCarousel from "../components/CardsCarousel";
import InputAutoComplete from "../components/InputAutoComplete";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/slices/authSlice";
import RideRequestApi from "../services/api/RideRequestApi";
import { axiosClient } from "../api/axios";

const RiderDashboard = () => {
  const [rideId, setRideId] = useState(0);
  const [rideReq, setRideReq] = useState(null);
  const [availableDrivers, setAvailableDrivers] = useState([]);
  const nav = useNavigate();
  const user = useSelector(getUser);

  const [show, setShow] = useState(false);
  const [showDest, setShowDest] = useState(false);
  const [addres, setAddress] = useState(null);
  const [destinationSearch, setDestinationSearch] = useState();
  const [destination, setDestination] = useState(null);

  const distance = useSelector((state) => state.map.distance);
  const price = useSelector((state) => state.map.price);
  const from = useSelector((state) => state.map.startLocation);
  const to = useSelector((state) => state.map.destination);
  //const dataMapa = useSelector((state) => state.map);
  //console.log("The Redux data :", dataMapa);

  const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

  const [searchText, setSearchText] = useState();
  const [locations, setLocations] = useState(null);
  const [destinationLocations, setDestinationLocations] = useState(null);

  function handleSearch() {
    setShow(true);
    setShowDest(false);
    setDestinationLocations(null);
    const params = {
      q: searchText,
      format: "json",
      addressdetails: 1,
      polygon_geojson: 0,
      countrycodes: "MA",
    };
    const queryString = new URLSearchParams(params).toString();
    axios.get(`${NOMINATIM_BASE_URL}${queryString}`).then(({ data }) => {
      setLocations(data);
    });
  }

  function handleSearchDestination() {
    setShow(false);

    setShowDest(true);
    setLocations(null);
    const params = {
      q: destinationSearch,
      format: "json",
      addressdetails: 1,
      polygon_geojson: 0,
      countrycodes: "MA",
    };
    const queryString = new URLSearchParams(params).toString();
    axios.get(`${NOMINATIM_BASE_URL}${queryString}`).then(({ data }) => {
      setDestinationLocations(data);
      //console.log(data);
    });
  }
  const [startLocation, setStartLocation] = useState(null);
  const [desiredDestination, setDesiredDestination] = useState(null);
  useEffect(() => {
    //console.log("Start Location :", startLocation);
    //console.log("Desired Destination :", desiredDestination);
    addres && setStartLocation(addres);
    destination && setDesiredDestination(destination);
  }, [addres, destination]);

  const [showUp, setShowUp] = useState("");

  useEffect(() => {
    const fetchAvailableDrivers = () => {
      RideRequestApi.getAvailableDriversFor(rideId)
        .then((res) => res.data)
        .then((res) => setAvailableDrivers(res))
        .catch((err) => {});
    };

    if (rideId) {
      // Fetch ride requests initially
      fetchAvailableDrivers();

      // Poll for new ride requests every 10 seconds
      const interval = setInterval(() => {
        fetchAvailableDrivers();
      }, 10000);

      // Clean up interval on component unmount
      return () => clearInterval(interval);
    }
  }, [rideId]);

  function createRide() {
    const values = {
      rider_id: user.id,
      from: from,
      to: to,
      price: price,
      distance: distance,
    };
    RideRequestApi.create(values).then((res) => setRideId(res.data.id));
  }

  function acceptDriver(values) {
    axiosClient.post(`/ride_requests/accept`, values);
    nav(`/rider/ride/${rideId}`);
  }

  return (
    <>
      <div className="flex flex-col">
        <div className=" flex flex-col md:grid md:grid-cols-4 px-8">
          <div className=" col-span-1 my-20 z-[11] w-fit">
            <div className="flex flex-col gap-10 items-start w-fit bg-[rgba(244,244,244,0.7)] md:bg-gray-50 p-6 rounded-lg ">
              <div className="grid w-56 max-w-sm items-center gap-1.5">
                <Label htmlFor="from_location">Location</Label>
                <InputAutoComplete
                  show={show}
                  setShow={setShow}
                  data={locations}
                  setSearchText={setSearchText}
                  setSomething={setAddress}
                />
                <Button onClick={handleSearch} className="">
                  <FaSearchLocation size={20} color="" />
                </Button>
              </div>
              <div className="grid w-56  max-w-sm items-center gap-1.5">
                <Label htmlFor="destination">Destination</Label>
                <InputAutoComplete
                  show={showDest}
                  setShow={setShowDest}
                  data={destinationLocations}
                  setSearchText={setDestinationSearch}
                  setSomething={setDestination}
                />
                <Button onClick={handleSearchDestination} className="">
                  <FaSearchLocation size={20} />
                </Button>
              </div>
              {/* <DrawerDemo
                  buttonStyle={"px-8 bg-black text-white"}
                  price={price}
                  onClick={alert}
                /> */}
              {price !== 0 && (
                <Button
                  onClick={() => {
                    createRide();
                    setShowUp("animate-trans-up");
                  }}
                >
                  Create Ride
                </Button>
              )}
            </div>
          </div>
        </div>
        <div
          className={`flex flex-col gap-y-14  md:grid md:grid-cols-6 rounded-md z-[5] col-span-3 md:justify-center bg-gray-100 px-4 py-6 rounded-t-2xl md:absolute md:-bottom-0 w-full translate-y-full max-h-[400px] overflow-scroll ${showUp}`}
        >
          <div className=" col-span-3 md:w-[480px] h-[280px] flex justify-center items-center">
            <div className=" w-full bg-gradient-to-r from-violet-200 to-pink-200 h-32 rounded-lg mx-auto flex flex-col justify-between p-5">
              {(desiredDestination || addres) && (
                <>
                  <h1>
                    {startLocation?.name} {"->"} {desiredDestination?.name}
                  </h1>
                  <div className="flex flex-row-reverse justify-between items-end ">
                    <p>{distance} km</p>
                    <p className="text-3xl font-medium font-serif text-gray-800">
                      {price} MAD
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="col-span-3 flex flex-col md:gap-y-8 py-4 w-full ">
            {availableDrivers && (
              <CardsCarousel className={""}>
                {availableDrivers.map((driver) => (
                  <DriversCard
                    key={driver.id}
                    className="z-[5] w-full bg-gradient-to-r from-fuchsia-50 to-pink-300"
                    name={driver.first_name}
                    price={61}
                    click={() =>
                      acceptDriver({
                        id: rideId,
                        driver_id: driver.id,
                        rider_id: user.id,
                        from: startLocation.name,
                        to: desiredDestination.name,
                        distance: distance,
                        price: price,
                      })
                    }
                  />
                ))}
              </CardsCarousel>
            )}
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full md:h-screen z-[1]">
        <Map selectPosition={addres} destination={destination} />
      </div>
    </>
  );
};

export default RiderDashboard;
