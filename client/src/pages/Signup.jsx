import { useState } from "react";
import axios from "axios";
import signupImage from "../images/signup.jpg";
import styles from "../styles/styles.module.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dob: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [dateInputType, setDateInputType] = useState("text");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFocus = () => setDateInputType("date");
  const handleBlur = () => {
    if (!formData.dob) setDateInputType("text");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/register", formData);
      alert("User registered successfully!");
    } catch (err) {
      alert("Error registering user!", err);
    }
  };

  return (
    <>
      <div className="container-fluid row" id={styles.signupParent}>
        <div id={styles.signupLeft}>
          <img
            src={signupImage}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "10px",
            }}
            alt="Signup"
          />
        </div>
        <div id={styles.signupRight}>
          <form onSubmit={handleSubmit}>
            <h3
              style={{ flexBasis: "100%", fontWeight: "bold" }}
              className="mb-0"
            >
              Create an account!
            </h3>
            <p className={`mb-0 ${styles.p1}`}>
              Enter your details below to create an account and get started.
            </p>
            <div className="d-flex flex-column">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="enter..."
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            <div className="d-flex flex-column">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="d-flex flex-column">
              <label>Date Of Birth</label>
              <input
                type={dateInputType}
                name="dob"
                placeholder="MM / DD / YY"
                value={formData.dob}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            <div className="d-flex flex-column">
              <label>Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="+91 8077618539"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>

            <div className="d-flex flex-column">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="d-flex flex-column">
              <label>Confirm Password</label>{" "}
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="" id={styles.signupBtn}>
              Create account
            </button>
            <p id={styles.loginLink} className="mb-0">
              Already have an account ? <a href="/login">Login!</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
