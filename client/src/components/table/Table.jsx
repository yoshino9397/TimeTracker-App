import "./table.scss";
import { useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useContext, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { AuthContext } from "../../context/AuthContext";

const Tables = () => {
  const { user } = useContext(AuthContext);
  const [lists, setLists] = useState([]);
  const [duration, setDuration] = useState(0);

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

  const Row = ({ row }) => {
    const [open, setOpen] = useState(false);
    const [tasks, setTasks] = useState([]);

    // useEffect(() => {
    //   const fetchTask = async () => {
    //     try {
    //       const res = await axios.get(`/tasks/project/${row._id}`);
    //       setTasks(res.data);
    //       console.log(tasks);
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   };
    //   fetchTask();
    // }, [row._id]);

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
          <TableCell>{user.duration}</TableCell>
          <TableCell>{row.percentage}</TableCell>
        </TableRow>
        <TableRow>
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
                    <TableCell align="left">{tasks.title}</TableCell>
                    <TableCell>{user.duration}</TableCell>
                    <TableCell>{row.percentage}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Collapse>
          </TableCell>
        </TableRow>
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
            <TableCell>DURATION</TableCell>
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
