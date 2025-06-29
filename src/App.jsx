import React, { Fragment, lazy, memo } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let Login = lazy(() => import("./pages/login/Login.jsx"));
let Auth = lazy(() => import("./auth/Auth.jsx"));
let Admin = lazy(() => import("./pages/admin/Admin.jsx"));
let Register = lazy(() => import("./pages/register/Register.jsx"));
let Profile = lazy(() => import("./pages/profile/Profile.jsx"));
let Topics = lazy(() => import("./pages/topics/Topics.jsx"));
let Bilets = lazy(() => import("./pages/bilets/Bilets.jsx"));
let Random = lazy(() => import("./pages/random/RandomBilets.jsx"));
let Solving = lazy(() => import("./pages/solvingProblems/SolvingProblems.jsx"));
const App = () => {
  return (
    <Fragment>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Auth />}>
          <Route path="mainPage" element={<Admin />}>
            <Route path="profile" element={<Profile />} />
            <Route path="choosingTopic" element={<Topics />} />
            <Route path="choosingBilet" element={<Bilets />} />
            <Route path="randomBilet" element={<Random />} />
          </Route>
          <Route path="/solving/:id" element={<Solving />} />
        </Route>
      </Routes>
      <ToastContainer />
    </Fragment>
  );
};

export default memo(App);
