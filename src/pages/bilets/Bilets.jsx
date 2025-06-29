import React, { useState } from "react";
import "./bilets.scss";
import { Bilets as Data } from "../../data/Data";
import { Navigate, useNavigate } from "react-router-dom";

const Bilets = () => {
  let navigate = useNavigate();
  let [openBilet, setOpenBilet] = useState(false);

  return (
    <>
      <div className="Bilets">
        {Data.map((bilet) => (
          <div
            onClick={() => navigate(`/solving/${bilet.id}`)}
            key={bilet.id}
            className="bilet"
          >
            <h2>Bilet-{bilet.id}</h2>
          </div>
        ))}
      </div>
      {openBilet ? <div className="overlay"></div> : <></>}
    </>
  );
};

export default Bilets;
