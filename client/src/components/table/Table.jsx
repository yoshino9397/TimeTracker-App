import "./table.scss";
import { useContext, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { AuthContext } from "../../context/AuthContext";
import useCalculate from "../../hooks/useCalculate";
import ViewListOutlinedIcon from "@mui/icons-material/ViewListOutlined";

const Tables = () => {
  const { user } = useContext(AuthContext);
  const [lists, setLists] = useState([]);
  const [getTasks, setGetTasks] = useState([]);
  const [getProjects, setGetProjects] = useState([]);
  const taskArr = useCalculate(getTasks, getProjects);

  useEffect(() => {
    const fetchTable = async () => {
      try {
        const resTasks = await axios.get(`/tasks/user/${user._id}`);
        const resProjects = await axios.get(`/projects/user/${user._id}`);
        setGetProjects(resProjects.data);
        setGetTasks(resTasks.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTable();
  }, [user._id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let array = [];
        const resultEven = taskArr.filter((n, i) => i % 2 === 0);
        const resultOdd = taskArr.filter((n, i) => i % 2 === 1);
        for (let i = 0; i < resultEven.length; i++) {
          array.push({
            projectId: resultEven[i]._id,
            name: resultEven[i].title,
            time: resultOdd[i],
          });
        }
        setLists(array);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [getProjects, getTasks]);

  const Row = ({ row }) => {
    const [open, setOpen] = useState(false);
    const [durationAll, setDurationAll] = useState(0);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(`/tasks/project/${row.projectId}`);

          var sum = 0;
          for (let i = 0; i < getTasks.length; i++) {
            sum += getTasks[i].taskDuration;
          }
          setTasks(res.data);
          setDurationAll(sum);
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }, []);

    return (
      <>
        <TableRow key={row.id} className="table row">
          <TableCell className="tableCell">
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell className="tableCell">{row.name}</TableCell>
          <TableCell className="tableCell">{row.time}</TableCell>
          <TableCell className="tableCell">
            {Math.floor((row.time / durationAll) * 100)}%
          </TableCell>
        </TableRow>
        {tasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell
              className="tableCell"
              style={{
                paddingBottom: 0,
                paddingTop: 0,
              }}
              colSpan={6}
            >
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="tableCell">
                        <IconButton size="small">
                          <TaskAltIcon sx={{ color: "gray" }} />
                        </IconButton>
                      </TableCell>
                      <TableCell align="left" className="tableCell">
                        {task.title}
                      </TableCell>
                      <TableCell className="tableCell">
                        {task.taskDuration}
                      </TableCell>
                      <TableCell className="tableCell">
                        {Math.floor((task.taskDuration / durationAll) * 100)}%
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Collapse>
            </TableCell>
          </TableRow>
        ))}
      </>
    );
  };

  return (
    <TableContainer component={Paper} className="table">
      <div className="top">
        <ViewListOutlinedIcon fontSize="large" />
        Your Projects
      </div>
      <Table sx={{ minWidth: 650 }} aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">
              <KeyboardArrowDownIcon className="arrow" />
            </TableCell>
            <TableCell className="tableCell">TITLE</TableCell>
            <TableCell className="tableCell">DURATION (s)</TableCell>
            <TableCell className="tableCell">PERCENTAGE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lists.map((list) => (
            <Row key={list.id} row={list} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Tables;
