import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";

// const data = [
//   { name: "", Total: 0 },
//   { name: "Mon", Total: 4.2 },
//   { name: "Tues", Total: 2.4 },
//   { name: "Wed", Total: 4.8 },
//   { name: "Thu", Total: 6.6 },
//   { name: "Fri", Total: 7.0 },
//   { name: "Sat", Total: 2.3 },
//   { name: "Sun", Total: 4.5 },
// ];

const Chart = ({ aspect, title }) => {
  const { user } = useContext(AuthContext);
  const [weekData, setWeekData] = useState([{}]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/tasks/user/${user._id}`);
        setWeekData(
          res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
        
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [user._id]);

  return (
    <div className="chart">
      <div className="title">
        <DateRangeIcon />
        This week
      </div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={weekData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#9DBEB9" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#9DBEB9" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="title" stroke="gray" />
          <YAxis unit="h" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="taskDuration"
            stroke="#194350"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
