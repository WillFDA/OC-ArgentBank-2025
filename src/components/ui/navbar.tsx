import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import argentBankLogo from "../../assets/argentBankLogo.png";
import { setToken } from "../../store/signin-slice";
import { AppDispatch, RootState } from "../../store/store";
import { getUser } from "../../store/user-slice";

export default function Navbar() {
  const dispatch = useDispatch<AppDispatch>();
  let isLoggedIn =
    useSelector((state: RootState) => state.signin.token) ||
    localStorage.getItem("token");

  const handleSignOut = () => {
    dispatch(setToken(""));
    localStorage.removeItem("token");
    isLoggedIn = "";
  };

  const isLoading = useSelector(
    (state: RootState) => state.user.getUserState.isLoading
  );

  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getUser(token));
    }
  }, [dispatch]);

  const firstName = useSelector((state: RootState) => state.user.firstName);

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div className="main-nav-item-container">
        {isLoading ? (
          <p>Loading...</p>
        ) : isLoggedIn ? (
          <>
            <Link className="main-nav-item" to="/profile">
              <i className="fa fa-user-circle"></i>
              {firstName}
            </Link>
            <Link onClick={handleSignOut} className="main-nav-item" to="/">
              <i className="fa fa-sign-out"></i>
              Sign Out
            </Link>
          </>
        ) : (
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
