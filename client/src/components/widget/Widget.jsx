import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Widget = ({ type }) => {
  const [users, setUsers] = useState();
  const [hotels, setHotels] = useState();
  let data;

  useEffect(() => {
    const getHotels = async () => {
      try {
        const resHotel = await axios.get("/hotels");
        setHotels(resHotel.data.length);
        console.log(hotels);
      } catch {}
    };
    getHotels();
  }, [hotels]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const resUser = await axios.get("/users");
        setUsers(resUser.data.length);
        console.log(users);
      } catch {}
    };
    getUser();
  }, [users]);

  switch (type) {
    case "user":
      data = {
        path: "/users",
        title: "USERS",
        isMoney: false,
        amount: users,
        diff: 15,
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "hotel":
      data = {
        path: "/hotels",
        title: "TASKS",
        isMoney: false,
        amount: hotels,
        diff: 20,
        link: "View all hotels",
        icon: (
          <AssignmentIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        path: "/",
        title: "EARNINGS",
        isMoney: true,
        amount: 200,
        diff: 43,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        path: "/",
        title: "BALANCE",
        isMoney: true,
        amount: 200,
        diff: 23,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {data.amount}
        </span>
        <Link
          to={data.path}
          style={{ textDecoration: "none", color: "#405570" }}
        >
          <span className="link">{data.link}</span>
        </Link>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {data.diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
