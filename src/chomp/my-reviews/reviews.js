import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import LoadingBar from "../reusable-components/loading-bar";
import { findRxReviewsById } from "../../services/reviews/reviews-service";

const ReviewsList = () => {
  const { currentUser } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);

  const getReviews = async () => {
    setLoading(true);
    const response = await findRxReviewsById(currentUser._id);
    setResults(response);
    setLoading(false);
  };


  useEffect(() => {
    if (currentUser) {
        getReviews();
    } else {
      console.log("error: must be logged in");
    }
  }, [currentUser]);
  return (
    <div className="mt-3">
        {loading && <LoadingBar />}
        {!loading && (
          <>
            <div className="mt-3">
              {results.map((rx) => (
                <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center mb-2">
                  <h3>{rx.name}</h3>
                </li>
                </ul>
              ))}
            </div>
          </>
        )}
      </div>
  );
};

export default ReviewsList;