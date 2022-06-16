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
import { format } from "date-fns";

const Chart = ({ aspect, title }) => {
  const { user } = useContext(AuthContext);
  const [weekData, setWeekData] = useState([{}]);
  const [weekDays, setWeekDays] = useState([]);
  const [weekTasks, setWeekTasks] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        let today = new Date();
        let todayMonth = today.getMonth() + 1;
        let date = today.getDate();
        let dayNum = today.getDay();
        let thisMonday = date - dayNum + 1;
        let arr = [];
        let num = 0;
        let dataArr = [];

        const res = await axios.get(`/tasks/user/${user._id}/week`);
        res.data.sort((p1, p2) => {
          return new Date(p1.createdAt) - new Date(p2.createdAt);
        });
        setWeekData(res.data);
        console.log(format(new Date(weekData[2].createdAt), "dd"));

        // for (let i = 0; i < weekData.length; i++) {
        //   dataArr.push(new Date(res.data[i].createdAt).getDay());
        // }

        for (let i = 0; i < 7; i++) {
          num = thisMonday + i;
          arr.push({
            date: `${todayMonth}/` + num,
            time: weekData[i].taskDuration,
          });
        }

        setWeekDays(arr);
        setWeekTasks(dataArr);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [user._id, weekData.length]);
  console.log();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await axios.get(`/tasks/user/${user._id}`);
  //       console.log(new Date(res.data[2].createdAt).getMonth() + 1);

  //       setWeekData(
  //         res.data.filter((p1) => {})
  //         // res.data.sort((p1, p2) => {
  //         //   return new Date(p2.createdAt) - new Date(p1.createdAt);
  //         // })
  //       );
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchData();
  // }, [user._id]);

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
          data={weekDays}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#9DBEB9" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#9DBEB9" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" stroke="gray" />
          <YAxis unit="s" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="time"
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
