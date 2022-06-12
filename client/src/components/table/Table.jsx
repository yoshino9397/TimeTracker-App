import "./table.scss";
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

const Tables = () => {
  const rows = [
    {
      title: "Play Game",
      duration: "2.3h",
      amount: "$30",
      percentage: "10%",
    },
    {
      title: "Drink coffee",
      duration: "2.3h",
      amount: "$30",
      percentage: "10%",
    },
    {
      title: "Walk",
      duration: "2.3h",
      amount: "$30",
      percentage: "10%",
    },
    {
      title: "Sleep",
      duration: "2.3h",
      amount: "$30",
      percentage: "10%",
    },
    {
      title: "Read books",
      duration: "2.3h",
      amount: "$30",
      percentage: "10%",
    },
  ];

  const Row = ({ row }) => {
    const [open, setOpen] = useState(false);
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
          <TableCell>{row.duration}</TableCell>
          <TableCell>{row.amount}</TableCell>
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
                <TableRow>
                  <TableCell>
                    <TaskAltIcon
                      fontSize="small"
                      sx={{ color: "gray", marginLeft: "20px" }}
                    />
                  </TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.duration}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>{row.percentage}</TableCell>
                </TableRow>
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
            <TableCell>AMOUNT</TableCell>
            <TableCell>PERCENTAGE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Tables;
