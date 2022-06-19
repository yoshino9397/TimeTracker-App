import "./navbar.scss";
import { Link } from "react-router-dom";
import DownloadIcon from "@mui/icons-material/Download";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = (e) => {
    if (e.target === e.currentTarget) {
      setOpen(false);
    } else {
      setOpen(!open);
    }
  };

  return (
    <>
      <div className="whole" onClick={handleOpen}></div>
      <div className="navbar">
        <div className="wrapper">
          <div className="top">
            <h3>Reports</h3>
            <Link to="/" style={{ textDecoration: "none" }}>
              <h4>Summary</h4>
            </Link>
          </div>
          <div className="download" onClick={() => setOpen(!open)}>
            <DownloadIcon />
            {open && (
              <div className="downloadList">
                <p>Download PDF</p>
                <p>Download CSV</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
