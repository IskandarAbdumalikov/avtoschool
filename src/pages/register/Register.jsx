import React, { memo, useState, useEffect } from "react";
import "./register.scss";
import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = ({ setOpenRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [canPress, setCanPress] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!password || !rePassword) {
      setCanPress(false);
      setError("");
    } else if (password !== rePassword) {
      setCanPress(false);
      setError("Parollar mos emas");
    } else {
      setCanPress(true);
      setError("");
    }
  }, [password, rePassword]);

  const handleRegister = (e) => {
    e.preventDefault();
    if (canPress) {
      toast.success("Muvaffaqiyatli ro'yxatdan o'tildi!");
      setOpenRegister(false);
      navigate("/mainPage/profile");
    } else {
      toast.error("Parollar mos emas. Qayta urinib ko'ring.");
    }
  };

  return (
    <>
      <div onClick={() => setOpenRegister(false)} className="overlay"></div>
      <div className="register">
        <button
          onClick={() => setOpenRegister(false)}
          className="register__x__btn"
        >
          <MdCancel />
        </button>
        <div className="register__body">
          <h2>Hisob yaratish</h2>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Parol"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Parolni qayta kiriting"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              required
              className={error ? "error__input" : ""}
            />
            {error && <p className="error__text">{error}</p>}
            <button
              type="submit"
              disabled={!canPress}
              className={
                canPress ? "active__register__btn" : "disabled__register__btn"
              }
            >
              Hisob yaratish
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default memo(Register);
