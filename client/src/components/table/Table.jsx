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

const Tables = ({ lists }) => {
  const Row = ({ row }) => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([{}]);
    const [open, setOpen] = useState(false);
    const [duration, setDuration] = useState(0);
    const [durationAll, setDurationAll] = useState(0);

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
          const res = await axios.get(`/tasks/project/${row._id}`);
          setTasks(res.data);

          var sum = 0;
          for (let i = 0; i < res.data.length; i++) {
            sum += res.data[i].taskDuration;
          }
          setDuration(sum);
        } catch (err) {
          console.log(err);
        }
      };
      fetchRow();
    }, [row._id]);

    return (
      <>
        <TableRow key={row.id} className="row">
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell>{row.title}</TableCell>
          <TableCell>{duration}</TableCell>
          <TableCell>{Math.floor((duration / durationAll) * 100)}%</TableCell>
        </TableRow>
        {tasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell
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
                      <TableCell>
                        <IconButton size="small">
                          <TaskAltIcon sx={{ color: "gray" }} />
                        </IconButton>
                      </TableCell>
                      <TableCell align="left">{task.title}</TableCell>
                      <TableCell>{task.taskDuration}</TableCell>
                      <TableCell>
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
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>
              <KeyboardArrowDownIcon />
            </TableCell>
            <TableCell>TITLE</TableCell>
            <TableCell>DURATION (s)</TableCell>
            <TableCell>PERCENTAGE</TableCell>
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
