import "./navbar.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="top">
          <h3>Reports</h3>
          <Link to="/" style={{ textDecoration: "none" }}>
            <h4>Summary</h4>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
