import React, { memo, useEffect, useState } from "react";
import "./login.scss";
import { NavLink, useNavigate } from "react-router-dom";
// import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLoginAdminMutation } from "../../context/api/adminApi";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setToken } from "../../context/slices/authSlice";
import Register from "../register/Register";
const Login = () => {
  const [adminLogin, { isLoading, data }] = useLoginAdminMutation();
  let [showPassword, SetShowPassword] = useState(false);
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [error, setError] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  // console.log(data);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username && password) {
      try {
        const res = await adminLogin({ username, password }).unwrap();
        console.log(res?.accessToken);
        
        dispatch(setToken(res?.accessToken));
        toast.success("Login successful!");
        navigate("/mainPage/profile");
      } catch (err) {
        setError(true);
        toast.error("Login failed. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="login">
        <div className="login__right">
          <NavLink className="login__right__logo" to={"/"}>
            LOGO
          </NavLink>
          <div className="login__right__bottom">
            <h2>Tizimga kirish</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Username"
                className="login__right__bottom__input__username"
                style={error ? { border: "1px solid red" } : {}}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <div
                style={error ? { border: "1px solid red" } : {}}
                className="password__wrapper"
              >
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="login__right__bottom__password__input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => SetShowPassword(!showPassword)}
                  style={{
                    cursor: isLoading ? "not-allowed" : "pointer",
                  }}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <FaEye className="login__right__bottom__password__icon" />
                  ) : (
                    <FaEyeSlash className="login__right__bottom__password__icon" />
                  )}
                </button>
              </div>
              <button
                className="login__right__bottom__btn"
                disabled={isLoading}
                style={{
                  backgroundColor: isLoading ? "#aaa" : "",
                  cursor: isLoading ? "not-allowed" : "pointer",
                }}
              >
                {isLoading ? "Loading..." : "Login"}
              </button>
            </form>
          </div>
        </div>
        <div className="login__left">
          <h2>Profil yaratish</h2>
          <p>
            Profilingizni yaratish orqali bizning xizmatlarimizdan
            foydalanishingiz mumkin
          </p>
          <button
            onClick={() => setOpenRegister(true)}
            className="login__left__btn"
          >
            Profil yaratish
          </button>
        </div>
      </div>
      {openRegister && <Register setOpenRegister={setOpenRegister} />}
    </>
  );
};

export default memo(Login);
