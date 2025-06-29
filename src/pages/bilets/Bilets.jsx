import React from "react";
import "./bilets.scss";
import { Bilets as Data } from "../../data/Data";
import { Navigate, useNavigate } from "react-router-dom";

const Bilets = () => {
  let navigate = useNavigate();

  return (
    <div className="Bilets">
      {Data.map((bilet) => (
        <div
          onClick={() => navigate(`solving/${bilet.id}`)}
          key={bilet.id}
          className="bilet"
        >
          <h2>Bilet-{bilet.id}</h2>
        </div>
      ))}
    </div>
  );
};

export default Bilets;
