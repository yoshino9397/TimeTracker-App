import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import ViewListOutlinedIcon from "@mui/icons-material/ViewListOutlined";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [lists, setLists] = useState([]);
  
  useEffect(() => {
    const fetchTable = async () => {
      try {
        const res = await axios.get(`/projects/user/${user._id}`);
        setLists(
          res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchTable();
  }, [user._id]);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="charts">
          <Featured lists={lists} />
          <Chart aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">
            <ViewListOutlinedIcon fontSize="large" />
            Your Projects
          </div>
          <Table lists={lists} />
        </div>
      </div>
    </div>
  );
};

export default Home;
