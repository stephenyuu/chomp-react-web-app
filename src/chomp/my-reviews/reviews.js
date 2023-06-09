import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import LoadingBar from "../reusable-components/loading-bar";
import { findReviewedRxsOfUser } from "../../services/reviews/reviews-service";

const ReviewsList = ({ user }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);

  const getReviews = async () => {
    setLoading(true);
    const response = await findReviewedRxsOfUser(user._id);
    setResults(response);
    setLoading(false);
  };

  const seeMoreDetails = (rxid) => {
    navigate(`/search/${rxid}`);
  };

  useEffect(() => {
    if (user) {
      getReviews();
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
              <div className="card-header">No reviews found</div>
            </div>
          </div>
          ) : (
          <div className="mt-3">
            {results.map((review) => (
              <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center mb-2">
                  <div className="wd-nav-text" onClick={() => seeMoreDetails(review.rxId)}>
                    <h3>{review.rxName}</h3>
                    <p>{review.review}</p>
                  </div>
                </li>
              </ul>
            ))}
          </div>)}
        </>
      )}
    </div>
  );
};

export default ReviewsList;
