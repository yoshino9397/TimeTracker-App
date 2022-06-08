import "../singleuser/singleuser.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const SingleHotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [info, setInfo] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const name = useRef();
  const type = useRef();
  const title = useRef();
  const city = useRef();
  const price = useRef();
  const desc = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get("/hotels/find/" + id);
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
    const editHotel = {
      name: name.current.value,
      type: type.current.value,
      title: title.current.value,
      city: city.current.value,
      cheapestPrice: price.current.value,
      desc: desc.current.value,
    };
    try {
      await axios.put(`/hotels/${id}`, editHotel);
      navigate(`/hotels`);
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
              <img src={info.photos} alt="" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">{info.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Type:</span>
                  <span className="itemValue">{info.type}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">City:</span>
                  <span className="itemValue">{info.city}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Title:</span>
                  <span className="itemValue">{info.title}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Price:</span>
                  <span className="itemValue">{info.cheapestPrice} 〜</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Desc:</span>
                  <span className="itemValue">{info.desc}</span>
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
              <span>Name</span>
              <input
                type="text"
                required
                ref={name}
                onChange={handleChange}
                placeholder={info.name}
              />
            </div>
            <div className="editItem">
              <span>Type</span>
              <input
                type="text"
                required
                ref={type}
                onChange={handleChange}
                placeholder={info.type}
              />
            </div>
            <div className="editItem">
              <span>Title</span>
              <input
                type="text"
                required
                ref={title}
                onChange={handleChange}
                placeholder={info.title}
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
              <span>Price</span>
              <input
                type="number"
                required
                ref={price}
                onChange={handleChange}
                placeholder={info.cheapestPrice}
              />
            </div>
            <div className="editItem">
              <span>Desc</span>
              <input
                type="text"
                required
                ref={desc}
                onChange={handleChange}
                placeholder={info.desc}
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

export default SingleHotel;
