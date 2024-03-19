import React from "react";
import { axiosClient } from "../../api/axios";

const RideRequestApi = {
  create: async (values) => {
    // values should be an object, {distance: 4.5, price: 46,...}
    return axiosClient.post("/ride_requests", values);
  },
  getRideRequests: async () => {
    // as the name suggests, the function returns an array of rides requests :D
    return axiosClient.get("/ride_requests");
  },
  getAvailableDriversFor: async (id) => {
    return axiosClient.get(`/ride_requests/${id}/drivers`);
  },
  delete: async (id) => {
    return await axiosClient.delete("/ride_requests");
  },
  getRide: async (ride) => {
    // as the name suggests, the function returns an array of rides :D
    return axiosClient.get(`/rides/${ride}`);
  },
};

export default RideRequestApi;
