import "./singleuser.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const SingleUser = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [info, setInfo] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const username = useRef();
  const email = useRef();
  const phone = useRef();
  const city = useRef();
  const country = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get("/users/" + id);
        setInfo(res.data);
      } catch {}
    };
    getProduct();
  }, [id]);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const editUser = {
      username: username.current.value,
      email: email.current.value,
      phone: phone.current.value,
      city: city.current.value,
      country: country.current.value,
    };
    try {
      await axios.put(`/users/${id}`, editUser);
      navigate(`/users`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div
              className="editButton"
              onClick={() => {
                setShowEdit(true);
              }}
            >
              Edit
            </div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img src={info.img} alt="" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">{info.username}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{info.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{info.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">City:</span>
                  <span className="itemValue">{info.city}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">{info.country}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
      </div>
      {showEdit && (
        <div className="editPage">
          <div className="editContainer">
            <button
              className="cancel"
              onClick={() => {
                setShowEdit(false);
              }}
            >
              X
            </button>
            <div className="editItem">
              <span>Username</span>
              <input
                type="text"
                required
                ref={username}
                onChange={handleChange}
                placeholder={info.username}
              />
            </div>
            <div className="editItem">
              <span>Email</span>
              <input
                type="email"
                required
                ref={email}
                onChange={handleChange}
                placeholder={info.email}
              />
            </div>
            <div className="editItem">
              <span>Phone</span>
              <input
                type="number"
                required
                ref={phone}
                onChange={handleChange}
                placeholder={info.phone}
              />
            </div>
            <div className="editItem">
              <span>City</span>
              <input
                type="text"
                required
                ref={city}
                onChange={handleChange}
                placeholder={info.city}
              />
            </div>
            <div className="editItem">
              <span>Country</span>
              <input
                type="text"
                required
                ref={country}
                onChange={handleChange}
                placeholder={info.country}
              />
            </div>
            <button onClick={handleEdit} className="saveButton">
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleUser;
