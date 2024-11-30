import { useNavigate } from "react-router-dom";

const Home = () => {
  const fullName = localStorage.getItem("fullName");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("fullName");
    navigate("/login");
  };

  return (
    <div className="Home-container">
      <h1>Hi, {fullName}!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
