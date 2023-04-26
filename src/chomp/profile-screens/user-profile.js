import React, { useState, useEffect } from "react";
import Chomp from "..";
import { useNavigate, useParams } from "react-router";
import { findUserByUsernameThunk } from "../../services/users/users-thunk";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import FavoritesList from "../favorites/favorites";
import ReviewsList from "../my-reviews/reviews";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState({});
  const navigate = useNavigate();

  const searchUsersClick = async () => {
    await dispatch(findUserByUsernameThunk(search.search));
    navigate(`/user-search/${search.search}`);
  };

  const loadUser = async () => {
    const action = await dispatch(findUserByUsernameThunk(username));
    setUser(action.payload);
  };

  useEffect(() => {
    loadUser();
  }, [dispatch, username]);

  return (
    <Chomp className="align-items-center" activeLink="userSearch">
      <form className="d-flex mt-3">
        <input
          className="form-control me-sm-2"
          type="search"
          placeholder="search users"
          onChange={(e) => setSearch({ search: e.target.value })}
        />
        <Link
          className="btn btn-secondary my-2 my-sm-0"
          onClick={searchUsersClick}
        >
          Search
        </Link>
      </form>
      {user && (
        <div className="container my-5">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card border-primary">
                <div className="card-header border-primary">
                  <h3 className="mb-0">
                    {`${user.firstName} ${user.lastName}`}
                    {user.isReviewer ? (
                      <h5 className="mt-1 text-muted">Chomper & Reviewer</h5>
                    ) : (
                      <h5 className="mt-1 text-muted">Chomper</h5>
                    )}
                  </h3>
                </div>
                <div className="card-body">
                  <div className="mt-1">
                    <h5 className="card-title">{`@${user.username}'s Favorites`}</h5>
                    <FavoritesList user={user} />
                    {user.isReviewer && (
                      <>
                        <h5 className="card-title mt-3">{`@${user.username}'s Reviews`}</h5>
                        <ReviewsList user={user} />{" "}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      { !user && username && (
        <>
        <div class="card text-white bg-secondary mt-3">
        <div class="card-body">
          <h4 class="card-title">No Users found</h4>
        </div>
        </div>
        </>)}
    </Chomp>
  );
};

export default UserProfile;
