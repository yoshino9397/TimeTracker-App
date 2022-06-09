import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Tables = () => {
  const rows = [
    {
      id: 1143155,
      hotel: "The Paradise Hotel",
      img: "https://live.staticflickr.com/4503/24223619048_99de8cc19c_3k.jpg",
      applicant: "Azuma",
      date: "13rd March",
      country: "Japan",
      property: "hotel",
      status: "Approved",
    },
    {
      id: 2235235,
      hotel: "Seaside View Villa",
      img: "https://live.staticflickr.com/4680/38206662275_66357ba3b5_6k.jpg",
      applicant: "Mitsugi",
      date: "25 June",
      country: "Thailand",
      property: "villa",
      status: "Pending",
    },
    {
      id: 2342353,
      hotel: "Fishing House",
      img: "https://live.staticflickr.com/8715/17721323862_337594552f_k.jpg",
      applicant: "Matsuda",
      date: "12 May",
      country: "Taiwan",
      property: "cabin",
      status: "Pending",
    },
    {
      id: 2357741,
      hotel: "Resort Hourai",
      img: "https://live.staticflickr.com/2260/1846889405_912dd3fbea_k.jpg",
      applicant: "Takara",
      date: "28 January",
      country: "Mexico",
      property: "resort",
      status: "Approved",
    },
    {
      id: 2342355,
      hotel: "Cottage South Breeze",
      img: "https://live.staticflickr.com/65535/51031241107_7affec482b_6k.jpg",
      applicant: "Nanjo",
      date: "18 October",
      country: "New Zealand",
      property: "cottage",
      status: "Pending",
    },
  ];
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Application ID</TableCell>
            <TableCell className="tableCell">Hotels</TableCell>
            <TableCell className="tableCell">Applicant</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Country</TableCell>
            <TableCell className="tableCell">Property type</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.img} alt="" className="image" />
                  {row.hotel}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.applicant}</TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>
              <TableCell className="tableCell">{row.country}</TableCell>
              <TableCell className="tableCell">{row.property}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Tables;
