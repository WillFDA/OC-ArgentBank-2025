import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { AppDispatch, RootState } from "../store/store";
import { getUser, setEditing, updateUser } from "../store/user-slice";

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const editing = useSelector((state: RootState) => state.user.editing);
  const firstName =
    useSelector((state: RootState) => state.user.firstName) || "";
  const lastName = useSelector((state: RootState) => state.user.lastName) || "";
  const token =
    useSelector((state: RootState) => state.signin.token) ||
    localStorage.getItem("token") ||
    "";

  useEffect(() => {
    if (!token) {
      navigate("/sign-in");
      return;
    }
    dispatch(getUser(token));
    dispatch(setEditing(false));
  }, [token, dispatch, navigate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    dispatch(setEditing());
    dispatch(updateUser({ token, formData }));
  };

  const isLoading = useSelector(
    (state: RootState) => state.user.getUserState.isLoading
  );
  const error = useSelector(
    (state: RootState) => state.user.getUserState.error
  );
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="header">
        {editing ? (
          <div className="user-form">
            <form onSubmit={handleSubmit}>
              <div className="input-wrapper">
                <label htmlFor="firstName">Prénom</label>
                <input type="text" name="firstName" defaultValue={firstName} />
              </div>
              <div className="input-wrapper">
                <label htmlFor="lastName">Nom</label>
                <input type="text" name="lastName" defaultValue={lastName} />
              </div>
              <button className="sign-in-button" type="submit">
                Save
              </button>
            </form>
          </div>
        ) : (
          <h1>
            Welcome back
            <br />
            {firstName} {lastName}!
          </h1>
        )}
        {!editing ? (
          <button
            className="edit-button"
            onClick={() => dispatch(setEditing())}
          >
            Edit Name
          </button>
        ) : null}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </>
  );
}
