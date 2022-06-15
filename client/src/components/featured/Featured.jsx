import "./featured.scss";
import "./progressBar.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Featured = () => {
  const { user } = useContext(AuthContext);
  const [durationAll, setDurationAll] = useState(0);
  const [data, setData] = useState([]);
  const [color, setColor] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        var sum = 0;
        const res = await axios.get(`/tasks/user/${user._id}`);

        for (let i = 0; i < res.data.length; i++) {
          sum += res.data[i].taskDuration;
        }
        setDurationAll(sum);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [user._id]);

  useEffect(() => {
    const fetchRow = async () => {
      try {
        let array = [];
        let colorArr = [];
        let num = 0;
        const res = await axios.get(`/projects/user/${user._id}`);
        console.log(res.data);

        for (let i = 0; i < res.data.length; i++) {
          colorArr.push(res.data[i].colorCode);

          for (let j = 0; j < res.data[i].tasks.length; j++) {
            // res.data[i].tasks[j].time += res.data[i].task[j].time;
            num += res.data[i].tasks[j].time;
          }
          array.push({
            name: res.data[i].title,
            value: num,
          });
        }
        setColor(colorArr);
        setData(array);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRow();
  }, [user._id]);

  console.log(data);

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">
          <AvTimerIcon sx={{ fontSize: "28px" }} />
          Total Time
        </h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Legend layout="vertical" verticalAlign="top" align="top" />
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={color[index % color.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">CLOCKED HOURS</div>
            <div className="itemResult">
              <div className="resultAmount">
                {`${("00" + Math.floor(durationAll / 3600)).slice(-2)}:${(
                  "00" +
                  (Math.floor(durationAll / 60) % 60)
                ).slice(-2)}:${("00" + (durationAll % 60)).slice(-2)}`}
              </div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">BILLABLE HOURS</div>
            <div className="itemResult">
              <div className="resultAmount">{`${(
                "00" + Math.floor(durationAll / 3600)
              ).slice(-2)}:${("00" + (Math.floor(durationAll / 60) % 60)).slice(
                -2
              )}:${("00" + (durationAll % 60)).slice(-2)}`}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
