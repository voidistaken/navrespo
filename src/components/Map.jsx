import React, { useEffect } from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useDispatch } from "react-redux";
import {
  setDestination,
  setDistance,
  setPrice,
  setStartLocation,
} from "../redux/slices/mapSlice";
import { Icon } from "leaflet";

const some_position = [33.6021, -7.6198]; //casa port
const customicon=new Icon({
  iconUrl:"https://cdn4.iconfinder.com/data/icons/basic-ui-pack-flat-s94-1/64/Basic_UI_Icon_Pack_-_Flat_map_pointer-512.png",
  iconSize:[38,38]
})
function ResetCenterView(props) {
  const { selectPosition, destination } = props;
  const map = useMap();

  function setView(position) {
    if (position) {
      map.setView(L.latLng(position.lat, position.lon), map.getZoom(), {
        animate: true,
      });
    }
  }

  useEffect(() => {
    setView(selectPosition);
    /*console.log({
      destination: destination,
      addres: selectPosition,
    });*/
  }, [selectPosition]);

  useEffect(() => {
    setView(destination);
  }, [destination]);

  return null;
}

export default function Map({ selectPosition, destination }) {
  const originPosition = [selectPosition?.lat, selectPosition?.lon];
  const destPosition = [destination?.lat, destination?.lon];

  const polyline = [originPosition, destPosition];
  const dispatch = useDispatch();

  function haversineDistance(point1, point2) {
    const R = 6371; // Radius of the Earth in kilometers
    const toRadians = (angle) => (angle * Math.PI) / 180;

    const dLat = toRadians(point2?.lat - point1?.lat);
    const dLon = toRadians(point2?.lon - point1?.lon);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(point1?.lat)) *
        Math.cos(toRadians(point2?.lat)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers

    return distance;
  }

  // Function to calculate the price for a ride in Morocco
  const calculateRidePriceMorocco = (distanceInKm) => {
    // Base fare per kilometer (in Moroccan Dirham)
    const baseFarePerKm = 6.5; // Example base fare per kilometer

    // Additional factors (such as surge pricing, time of day, etc.) can be included here
    // For simplicity, we're not considering additional factors in this example

    // Calculate the total price based on the distance and base fare
    const totalPrice = distanceInKm * baseFarePerKm;

    // Return the total price rounded to two decimal places
    return totalPrice.toFixed(2); // Add "MAD" to denote Moroccan Dirham
  };

  // Example usage

  useEffect(() => {
    if (selectPosition && destination) {
      let distance = haversineDistance(selectPosition, destination);
      distance = distance.toFixed(2);
      dispatch(setDistance(distance));

      const totalPriceMorocco = calculateRidePriceMorocco(distance);
      dispatch(setPrice(totalPriceMorocco));
      dispatch(setPrice(totalPriceMorocco));
      dispatch(setStartLocation(selectPosition.name));
      dispatch(setDestination(destination.name));
    }
  }, [selectPosition, destination]);

  return (
    <MapContainer
      center={some_position}
      zoom={16}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/basic-v2-dark/256/{z}/{x}/{y}.png?key=NAlmOmGuKbNTKdxGdzUy"
      />
      {selectPosition && (
        <>
          <Marker   position={originPosition} icon={customicon}>
            <Popup>
              Origin: {selectPosition.lat}, {selectPosition.lon}
            </Popup>
          </Marker>

          <ResetCenterView selectPosition={selectPosition} />
        </>
      )}
      {destination && (
        <>
          <Marker   position={destPosition} icon={customicon}>
            <Popup>
              Destination: {destination.lat}, {destination.lon}
            </Popup>
          </Marker>
          <ResetCenterView destination={destination} />
        </>
      )}
      {destination && selectPosition && (
        <Polyline pathOptions={{ color: "pink" }} positions={polyline} />
      )}
    </MapContainer>
  );
}
