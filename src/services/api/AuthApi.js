import React from "react";
import { axiosClient } from "../../api/axios";
import axios from "axios";

const AuthApi = {
  login: async (email, password) => {
    return axios.post("https://api.shedrive.ma/login", { email, password },{
      withCredentials: true
  });
  },  
  logout: async () => {
    return await axios.post("https://api.shedrive.ma/logout",{
      headers: {
        Authorization:` Bearer ${window.localStorage.getItem("token")}`,
      },
      withCredentials: true,
    });
  },
  registerRider: async (values) => {
    return await axiosClient.post("/riders", values);
  },
  getUser: async () => {
    return await axiosClient.get("/user");
  },
};

export default AuthApi;
