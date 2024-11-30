import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import loginImage from "../images/login.jpg";
import styles from "../styles/styles.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      const { token, fullName } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("fullName", fullName);

      navigate("/home");
    } catch (err) {
      alert("Invalid email or password!", err);
    }
  };

  return (
    <>
      <div className="container-fluid row" id={styles.loginParent}>
        <div id={styles.loginLeft}>
          <img
            src={loginImage}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "10px",
            }}
            alt="Login"
          />
        </div>
        <div id={styles.loginRight}>
          <form onSubmit={handleSubmit}>
            <h3
              style={{ flexBasis: "100%", fontWeight: "bold" }}
              className="mb-0"
            >
              Login
            </h3>
            <div className="d-flex flex-column">
              <label>Email</label>
              <input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="d-flex flex-column">
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="" id={styles.loginBtn}>
              Login
            </button>
            <p id={styles.signupLink} className="mb-0">
              Don&apos;t have an account?{" "}
              <a href="/signup">Sign up for free.</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
