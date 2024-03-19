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
import AdminNavbar from "../components/AdminNavbar";
import { Outlet, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getUser, setUser } from "../redux/slices/authSlice";
import AuthApi from "../services/api/AuthApi";

const DriverLayout = () => {
  const [logged, setLogged] = useState(false);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const user = useSelector(getUser);

  useEffect(() => {
    AuthApi.getUser()
      .then((res) => res.data)
      .then((res) => {
        if (res.role === "driver") {
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
      <Outlet />
    </>
  );
};

export default DriverLayout;

// i don't get paid enough for this...
