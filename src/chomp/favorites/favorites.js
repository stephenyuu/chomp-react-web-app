import React, { useState } from "react";
import { useEffect } from "react";
import { findLikedRxsOfUser } from "../../services/likes/likes-service";
import { useNavigate } from "react-router";
import LoadingBar from "../reusable-components/loading-bar";
import { Link } from "react-router-dom";

const FavoritesList = ({ user }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);

  const getLikedRxs = async () => {
    setLoading(true);
    const response = await findLikedRxsOfUser(user._id);
    setResults(response);
    setLoading(false);
  };

  const seeMoreDetails = (rxid) => {
    navigate(`/search/${rxid}`);
  };

  useEffect(() => {
    if (user) {
      getLikedRxs();
    } else {
      console.log("error: must be logged in");
    }
  }, [user]);
  return (
    <div className="mt-3">
      {loading && <LoadingBar />}
      {!loading && (
        <>
          {results.length === 0 ? (
            <div className="container d-flex justify-content-center">
              <div className="card bg-light mb-3 w-50">
                <div className="card-header">No favorites found</div>
              </div>
            </div>
          ) : (
            <div className="mt-3">
              {results.map((rx) => (
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between align-items-center mb-2">
                    <h3>{rx.name}</h3>
                    <button
                      onClick={() => seeMoreDetails(rx.rxId)}
                      className="btn btn-primary rounded-pill"
                    >
                      See more
                    </button>
                  </li>
                </ul>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FavoritesList;
