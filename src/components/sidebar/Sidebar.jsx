import React, { memo } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { IoCreateOutline } from "react-icons/io5";
import { AiOutlineProduct } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./sidebar.scss";
import { useDispatch, useSelector } from "react-redux";
import { RiLogoutBoxLine } from "react-icons/ri";
import { logout } from "../../context/slices/authSlice";
import { useGetProfileQuery } from "../../context/api/adminApi";
import { Avatar } from "@mui/material";
import { CgProfile } from "react-icons/cg";

const Sidebar = () => {
  console.log("profileData");

  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  let dispatch = useDispatch();
  let { data: profileData } = useGetProfileQuery();
  console.log(profileData);

  let navigate = useNavigate();

  return (
    <div className="sidebar">
      <h2 className="sidebar__logo">
        <Link to={"/mainPage"}>
          <Avatar
            style={{
              backgroundColor: "white",
              verticalAlign: "middle",
              color: "black",
            }}
            size="large"
            gap={10}
          >
            {profileData?.firstName?.slice(0, 1)?.toUpperCase()}
          </Avatar>
        </Link>
        <span>{profileData?.firstName}</span>
      </h2>
      <ul className="sidebar__collection">
        <li className="sidebar__item">
          <Link
            className={`sidebar__link ${
              isActive("/mainPage/choosingTopic") ? "active" : ""
            }`}
            to={"/mainPage/choosingTopic"}
          >
            <IoCreateOutline />
            <span>Mavzuni tanlaymiz</span>
          </Link>
        </li>
        <li className="sidebar__item">
          <Link
            className={`sidebar__link ${
              isActive("/mainPage/choosingBilet") ? "active" : ""
            }`}
            to={"/mainPage/choosingBilet"}
          >
            <AiOutlineProduct />
            <span>Biletni tanlaymiz</span>
          </Link>
        </li>
        <li className="sidebar__item">
          <Link
            className={`sidebar__link ${
              isActive("/mainPage/randomBilet") ? "active" : ""
            }`}
            to={"/mainPage/randomBilet"}
          >
            <IoCreateOutline />
            <span>Tasodifiy biletni tanlaymiz</span>
          </Link>
        </li>

        <li className="sidebar__item">
          <Link
            className={`sidebar__link ${
              isActive("/mainPage/profile") ? "active" : ""
            }`}
            to={"/mainPage/profile"}
          >
            <CgProfile />
            <span>Kabinetim</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default memo(Sidebar);
