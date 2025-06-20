import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  setEmail,
  setPassword,
  setRememberMe,
  signInUser,
} from "../store/signin-slice";
import { AppDispatch, RootState } from "../store/store";

export default function SignIn() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const email = useSelector((state: RootState) => state.signin.email);
  const password = useSelector((state: RootState) => state.signin.password);
  const rememberMe = useSelector((state: RootState) => state.signin.rememberMe);
  const token =
    useSelector((state: RootState) => state.signin.token) ||
    localStorage.getItem("token");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signInUser({ email, password }));
  };

  useEffect(() => {
    if (token) {
      navigate("/profile");
    }
  }, [token, navigate]);

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
            type="text"
            id="username"
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
            type="password"
            id="password"
          />
        </div>
        <div className="input-remember">
          <input
            checked={rememberMe}
            onChange={(e) => dispatch(setRememberMe(e.target.checked))}
            type="checkbox"
            id="remember-me"
          />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <button type="submit" className="sign-in-button">
          Sign In
        </button>
      </form>
    </section>
  );
}
