import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Dashboard from "../../components/dashboard/Dashboard";
import { getAllUsers } from "../../features/redux/adminDashboardSlice";

const DashboardPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <Dashboard />
  );
};

export default DashboardPage;
