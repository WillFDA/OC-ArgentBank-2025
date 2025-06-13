import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "../store/store";
import { setEditing, setFirstName, setLastName } from "../store/user-slice";
import { getUser, updateUser } from "../utils/user";

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    getUser(token).then((data) => {
      dispatch(setFirstName(data.body.firstName));
      dispatch(setLastName(data.body.lastName));
    });
    dispatch(setEditing(false));
  }, [token, dispatch, navigate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    dispatch(setFirstName(formData.get("firstName") as string));
    dispatch(setLastName(formData.get("lastName") as string));
    dispatch(setEditing());
    updateUser(token, formData);
  };

  return (
    <>
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
