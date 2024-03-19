import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, setUser } from "../redux/slices/authSlice";
import AuthApi from "../services/api/AuthApi";

const RiderLayout = () => {
  const [logged, setLogged] = useState(false);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const user = useSelector(getUser);

  useEffect(() => {
    AuthApi.getUser()
      .then((res) => res.data)
      .then((res) => {
        if (res.role === "rider") {
          setLogged(true);
          dispatch(setUser(res));
        } else {
          nav("/");
        }
      })
      .catch((err) => {
        nav("/login");
      });
  }, []);
  if (!logged) return <></>;

  return (
    <>
      <AdminNavbar name={user.first_name} />
      <div className="relative h-screen overflow-hidden">
        <Outlet />
      </div>
    </>
  );
};

export default RiderLayout;
